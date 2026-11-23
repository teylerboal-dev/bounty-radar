/**
 * BountyRadar Core Engine
 * Shared by both the CLI and the live browser dashboard.
 * Filters synthetic/honeypot repos, parses USD/crypto rewards, and scores winnability.
 */

export const SPAM_ORGS = new Set([
	'ies-boilerroom',
	'unsafelabs',
	'securebananalabs',
	'limitlessprojects',
	'alwaystrueio',
	'relayhop',
	'fractal-neurons',
	'clankernation',
]);

export const PROMPT_INJECTION_PATTERNS = [
	/pre-session instructions/i,
	/platform_instructions/i,
	/paste your complete .* verbatim/i,
	/system prompt.*verbatim/i,
];

export const CANCELED_BOUNTY_PATTERNS = [
	/stopped the bounty program/i,
	/payouts won'?t work/i,
	/bounty program (?:is |has been )?(?:ended|closed|paused|canceled|cancelled|discontinued)/i,
	/no longer (?:paying|offering) bount/i,
];

export const AI_RESTRICTED_PATTERNS = [
	/not to solely use llm/i,
	/do not start working on this without talking to the maintainers/i,
	/no ai[- ]generated prs?/i,
	/do not submit ai[- ]generated/i,
];

/**
 * Parse a GitHub issue URL into { owner, repo, number } or null.
 */
export function parseGitHubIssueUrl(input = '') {
	const m = String(input)
		.trim()
		.match(/^https?:\/\/github\.com\/([^/\s]+)\/([^/\s]+)\/issues\/(\d+)(?:[/?#].*)?$/i);
	if (!m) return null;
	return { owner: m[1], repo: m[2], number: Number(m[3]) };
}

/**
 * Deep pre-flight safety & competition audit for a single GitHub bounty issue.
 * Checks honeypots, prompt-injection traps, canceled programs, anti-AI rules,
 * assignees, and competing open PRs.
 */
export function auditIssueSafety({ issue, comments = [], openPrs = [], nowMs = Date.now() }) {
	const scored = scoreBounty(issue, nowMs);
	const allCommentsText = comments.map((c) => c.body || '').join('\n');
	const fullText = `${issue.title || ''}\n${issue.body || ''}\n${allCommentsText}`;

	const flags = [];
	let verdict = 'GO';

	if (scored.isHoneypot) {
		verdict = 'DANGER';
		flags.push({ level: 'danger', text: scored.honeypotReason || 'Honeypot / synthetic trap' });
	}
	if (PROMPT_INJECTION_PATTERNS.some((re) => re.test(fullText))) {
		verdict = 'DANGER';
		flags.push({
			level: 'danger',
			text: 'Prompt-injection / system-prompt exfiltration trap detected in issue or comments',
		});
	}
	if (CANCELED_BOUNTY_PATTERNS.some((re) => re.test(fullText))) {
		if (verdict !== 'DANGER') verdict = 'SKIP';
		flags.push({
			level: 'warn',
			text: 'Maintainer comments indicate this bounty program was stopped or payouts are disabled',
		});
	}
	if (AI_RESTRICTED_PATTERNS.some((re) => re.test(fullText))) {
		if (verdict === 'GO') verdict = 'RESTRICTED';
		flags.push({
			level: 'warn',
			text: 'Maintainer requires pre-approval or restricts LLM/AI-generated submissions',
		});
	}
	if (scored.hasAssignee) {
		if (verdict === 'GO') verdict = 'CROWDED';
		flags.push({ level: 'warn', text: 'Issue is already assigned to another contributor' });
	}
	if (openPrs.length > 0) {
		if (verdict === 'GO') verdict = 'CROWDED';
		flags.push({
			level: 'warn',
			text: `${openPrs.length} competing open PR(s) already reference this issue`,
		});
	}
	if (flags.length === 0) {
		flags.push({
			level: 'ok',
			text: 'Clean: unassigned, 0 competing open PRs, no honeypot or policy blockers detected',
		});
	}

	return {
		verdict,
		winnabilityScore: verdict === 'GO' ? scored.winnabilityScore : Math.min(scored.winnabilityScore, 25),
		reward: scored.reward,
		repoFullName: scored.repoFullName,
		number: scored.number,
		title: scored.title,
		url: scored.url,
		openPrCount: openPrs.length,
		commentsCount: comments.length || scored.comments,
		flags,
	};
}

export const SPAM_REPO_PATTERNS = [
	/bounty-plaza/i,
	/devx-bounties/i,
	/sn-monetization-runtime/i,
	/\btest-?bounty\b/i,
];

// Conservative spot estimates for sorting/ranking only
const CRYPTO_USD_RATES = {
	USDC: 1,
	USDT: 1,
	DAI: 1,
	USD: 1,
	ZEC: 45,
	XMR: 180,
	ETH: 3200,
	SOL: 180,
	BTC: 90000,
	XTR: 0.05,
};

/**
 * Parse reward amount and currency from issue title/body/labels.
 * Returns { raw, amount, currency, estimatedUsd } or null.
 */
export function parseReward(text = '') {
	if (!text) return null;

	// 1. Dollar formats: $500, $1,200, $4k, $2.5k, USD 300
	const dollarMatch =
		text.match(/\$\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*([kK])?\b/) ||
		text.match(/\b([0-9][0-9,]*(?:\.[0-9]+)?)\s*([kK])?\s*(?:USD)\b/i);
	if (dollarMatch) {
		const base = Number(dollarMatch[1].replace(/,/g, ''));
		const mult = dollarMatch[2] ? 1000 : 1;
		const amount = base * mult;
		if (Number.isFinite(amount) && amount > 0 && amount <= 1_000_000) {
			return {
				raw: `$${amount >= 1000 ? amount.toLocaleString('en-US') : amount}`,
				amount,
				currency: 'USD',
				estimatedUsd: amount,
			};
		}
	}

	// 2. Crypto formats: 250 USDC, 0.063 ZEC, 0.5 ETH, 15 XTR, 0.75 XMR
	const cryptoMatch = text.match(
		/\b([0-9][0-9,]*(?:\.[0-9]+)?)\s*(USDC|USDT|DAI|ZEC|XMR|ETH|SOL|BTC|XTR)\b/i,
	);
	if (cryptoMatch) {
		const amount = Number(cryptoMatch[1].replace(/,/g, ''));
		const currency = cryptoMatch[2].toUpperCase();
		if (Number.isFinite(amount) && amount > 0) {
			const rate = CRYPTO_USD_RATES[currency] ?? 0;
			return {
				raw: `${amount} ${currency}`,
				amount,
				currency,
				estimatedUsd: Math.round(amount * rate * 100) / 100,
			};
		}
	}

	return null;
}

/**
 * Detect whether a GitHub issue comes from a known synthetic/honeypot/spam repo.
 */
export function detectHoneypot(issue) {
	const repoFull =
		issue.repoFullName ||
		(issue.repository_url ? issue.repository_url.replace('https://api.github.com/repos/', '') : '');
	const [owner = '', repoName = ''] = repoFull.split('/');

	if (SPAM_ORGS.has(owner.toLowerCase())) {
		return { isHoneypot: true, reason: `Known synthetic/spam org (${owner})` };
	}
	if (SPAM_REPO_PATTERNS.some((re) => re.test(repoName) || re.test(repoFull))) {
		return { isHoneypot: true, reason: `Matches spam repo pattern (${repoFull})` };
	}

	const title = issue.title || '';
	const body = issue.body || '';
	if (/^\[wildcard\]/i.test(title) || /not a real bounty/i.test(title)) {
		return { isHoneypot: true, reason: 'Synthetic or test issue title' };
	}
	if (/每日信息流|weekly review/i.test(title)) {
		return { isHoneypot: true, reason: 'Automated digest/newsletter issue, not a code bounty' };
	}
	if (PROMPT_INJECTION_PATTERNS.some((re) => re.test(title) || re.test(body))) {
		return { isHoneypot: true, reason: 'Prompt-injection / system-prompt exfiltration trap' };
	}

	return { isHoneypot: false, reason: null };
}

/**
 * Score an open bounty issue from 0 to 100 based on winnability & ROI.
 */
export function scoreBounty(issue, nowMs = Date.now()) {
	const repoFullName =
		issue.repoFullName ||
		(issue.repository_url ? issue.repository_url.replace('https://api.github.com/repos/', '') : '');
	const labels = (issue.labels || []).map((l) => (typeof l === 'string' ? l : l.name));
	const combinedText = `${issue.title || ''} ${labels.join(' ')} ${(issue.body || '').slice(0, 800)}`;

	const honeypot = detectHoneypot({ ...issue, repoFullName });
	const reward = parseReward(combinedText);
	const comments = Number(issue.comments ?? 0);
	const hasAssignee = Boolean(issue.assignee || (issue.assignees && issue.assignees.length > 0));
	const createdMs = issue.created_at ? Date.parse(issue.created_at) : nowMs;
	const ageDays = Math.max(0, (nowMs - createdMs) / (1000 * 60 * 60 * 24));

	let score = 50;

	// Competition factor
	if (hasAssignee) score -= 35;
	else score += 12;

	if (comments === 0) score += 18;
	else if (comments <= 2) score += 12;
	else if (comments <= 5) score += 4;
	else if (comments <= 15) score -= 12;
	else score -= 28;

	// Freshness factor
	if (ageDays <= 3) score += 15;
	else if (ageDays <= 14) score += 10;
	else if (ageDays <= 45) score += 2;
	else if (ageDays > 180) score -= 15;

	// Reward clarity & value factor
	if (reward) {
		score += 8;
		if (reward.estimatedUsd >= 500) score += 10;
		else if (reward.estimatedUsd >= 100) score += 7;
		else if (reward.estimatedUsd >= 25) score += 3;
	} else {
		score -= 8;
	}

	// Verified bounty platform signal
	const hasPlatformSignal =
		/algora|opire|polar\.sh|zechub|gitcoin/i.test(combinedText) ||
		labels.some((l) => /bounty|algora|opire/i.test(l));
	if (hasPlatformSignal) score += 6;

	if (honeypot.isHoneypot) {
		score = 0;
	}

	score = Math.max(0, Math.min(100, Math.round(score)));

	return {
		id: issue.id,
		number: issue.number,
		repoFullName,
		title: issue.title || '',
		url: issue.html_url || issue.url || '',
		labels,
		comments,
		hasAssignee,
		ageDays: Math.round(ageDays * 10) / 10,
		createdAt: issue.created_at || null,
		reward,
		isHoneypot: honeypot.isHoneypot,
		honeypotReason: honeypot.reason,
		winnabilityScore: score,
	};
}

/**
 * Filter and rank a list of GitHub issues.
 */
export function rankBounties(issues, options = {}) {
	const {
		hideHoneypots = true,
		onlyUnassigned = true,
		maxComments = 10,
		minUsd = 0,
		currency = '',
		nowMs = Date.now(),
	} = options;

	const scored = issues.map((issue) => scoreBounty(issue, nowMs));
	const honeypotsBlocked = scored.filter((item) => item.isHoneypot).length;

	const filtered = scored.filter((item) => {
		if (hideHoneypots && item.isHoneypot) return false;
		if (onlyUnassigned && item.hasAssignee) return false;
		if (item.comments > maxComments) return false;
		if (minUsd > 0 && (!item.reward || item.reward.estimatedUsd < minUsd)) return false;
		if (currency && (!item.reward || item.reward.currency !== currency.toUpperCase())) return false;
		return true;
	});

	filtered.sort((a, b) => {
		if (b.winnabilityScore !== a.winnabilityScore) return b.winnabilityScore - a.winnabilityScore;
		return (b.reward?.estimatedUsd ?? 0) - (a.reward?.estimatedUsd ?? 0);
	});

	return {
		totalScanned: issues.length,
		honeypotsBlocked,
		results: filtered,
	};
}
