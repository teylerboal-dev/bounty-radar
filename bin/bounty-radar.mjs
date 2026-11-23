#!/usr/bin/env node
import { auditIssueSafety, parseGitHubIssueUrl, rankBounties } from '../src/engine.mjs';

function parseArgs(argv) {
	const opts = {
		auditUrl: '',
		lang: '',
		query: 'label:bounty',
		minUsd: 0,
		maxComments: 6,
		limit: 25,
		json: false,
		includeHoneypots: false,
		token: process.env.GITHUB_TOKEN || '',
	};

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--audit' && argv[i + 1]) opts.auditUrl = argv[++i];
		else if (arg === '--lang' && argv[i + 1]) opts.lang = argv[++i];
		else if (arg === '--query' && argv[i + 1]) opts.query = argv[++i];
		else if (arg === '--min-usd' && argv[i + 1]) opts.minUsd = Number(argv[++i]) || 0;
		else if (arg === '--max-comments' && argv[i + 1]) opts.maxComments = Number(argv[++i]) || 6;
		else if (arg === '--limit' && argv[i + 1]) opts.limit = Math.min(100, Number(argv[++i]) || 25);
		else if (arg === '--json') opts.json = true;
		else if (arg === '--include-honeypots') opts.includeHoneypots = true;
		else if (arg === '--help' || arg === '-h') {
			console.log(`BountyRadar CLI - High-signal GitHub bounty scanner & pre-flight auditor

Usage:
  bounty-radar [options]
  bounty-radar --audit <github-issue-url> [--json]

Options:
  --audit <url>          Pre-flight safety & competition audit of one GitHub issue URL
  --lang <language>      Filter by repository language (e.g. typescript, python, rust)
  --query <q>            Base GitHub issue query (default: "label:bounty")
  --min-usd <amount>     Minimum estimated USD reward (default: 0)
  --max-comments <n>     Max comment count for low competition (default: 6)
  --limit <n>            Max issues to fetch from GitHub (default: 25)
  --include-honeypots    Do not filter synthetic/spam repos
  --json                 Output structured JSON (great for AI agents)
`);
			process.exit(0);
		}
	}
	return opts;
}

async function runAudit(urlStr, headers, asJson) {
	const parsed = parseGitHubIssueUrl(urlStr);
	if (!parsed) {
		console.error('Invalid GitHub issue URL. Expected https://github.com/owner/repo/issues/123');
		process.exit(1);
	}
	const base = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
	const [issueRes, commentsRes, prsRes] = await Promise.all([
		fetch(`${base}/issues/${parsed.number}`, { headers }),
		fetch(`${base}/issues/${parsed.number}/comments?per_page=30`, { headers }),
		fetch(`${base}/pulls?state=open&per_page=50`, { headers }),
	]);
	if (!issueRes.ok) {
		console.error(`Failed to fetch issue (${issueRes.status})`);
		process.exit(1);
	}
	const issue = await issueRes.json();
	const comments = commentsRes.ok ? await commentsRes.json() : [];
	const allPrs = prsRes.ok ? await prsRes.json() : [];
	const re = new RegExp(`#${parsed.number}\\b`);
	const openPrs = allPrs.filter((pr) => re.test(pr.title || '') || re.test(pr.body || ''));
	const report = auditIssueSafety({
		issue: { ...issue, repoFullName: `${parsed.owner}/${parsed.repo}` },
		comments,
		openPrs,
	});
	if (asJson) {
		console.log(JSON.stringify(report, null, 2));
		return;
	}
	console.log(`\n[${report.verdict}] ${report.repoFullName}#${report.number} — ${report.title}`);
	console.log(`Reward: ${report.reward ? report.reward.raw : 'Unpriced'} | Open PRs: ${report.openPrCount} | Comments: ${report.commentsCount}`);
	for (const f of report.flags) {
		console.log(`  - [${f.level.toUpperCase()}] ${f.text}`);
	}
}

async function main() {
	const opts = parseArgs(process.argv.slice(2));
	const parts = [opts.query, 'is:issue', 'is:open', 'no:assignee'];
	if (opts.lang) parts.push(`language:${opts.lang}`);
	const q = encodeURIComponent(parts.join(' '));
	const url = `https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=${opts.limit}`;

	const headers = {
		'User-Agent': 'bounty-radar-cli/1.0',
		Accept: 'application/vnd.github+json',
	};
	if (opts.token) {
		headers.Authorization = `Bearer ${opts.token}`;
	}

	if (opts.auditUrl) {
		await runAudit(opts.auditUrl, headers, opts.json);
		return;
	}

	const res = await fetch(url, { headers });
	if (!res.ok) {
		const msg = await res.text();
		console.error(`GitHub API error (${res.status}): ${msg.slice(0, 200)}`);
		process.exit(1);
	}

	const payload = await res.json();
	const ranked = rankBounties(payload.items || [], {
		hideHoneypots: !opts.includeHoneypots,
		onlyUnassigned: true,
		maxComments: opts.maxComments,
		minUsd: opts.minUsd,
	});

	if (opts.json) {
		console.log(JSON.stringify(ranked, null, 2));
		return;
	}

	console.log(
		`\nBountyRadar: scanned ${ranked.totalScanned} issues | blocked ${ranked.honeypotsBlocked} honeypots | ${ranked.results.length} clean matches\n`,
	);
	for (const item of ranked.results.slice(0, 15)) {
		const rewardTag = item.reward ? `[${item.reward.raw}]` : '[unpriced]';
		console.log(
			`Score ${String(item.winnabilityScore).padStart(2, ' ')} | ${rewardTag.padEnd(12, ' ')} | ${item.repoFullName}#${item.number} (${item.comments}c, ${item.ageDays}d)`,
		);
		console.log(`   ${item.title}`);
		console.log(`   ${item.url}\n`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
