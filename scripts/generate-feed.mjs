#!/usr/bin/env node
/**
 * 24/7 Automated Bounty Feed Generator
 * Runs on GitHub Actions every 6 hours to:
 * 1. Scan multiple GitHub bounty pools with anti-honeypot filtering
 * 2. Deduplicate & rank top winnable bounties
 * 3. Write docs/feed.json (instant zero-rate-limit load for the web app)
 * 4. Update the live Top 10 table in README.md for organic GitHub discovery
 */
import fs from 'node:fs';
import path from 'node:path';
import { rankBounties } from '../src/engine.mjs';

const QUERIES = [
	'label:bounty is:issue is:open no:assignee',
	'bounty USDC is:issue is:open no:assignee',
	'"algora.io" bounty is:issue is:open no:assignee',
	'ZecHub bounty is:issue is:open no:assignee',
];

const token = process.env.GITHUB_TOKEN || '';

async function fetchQuery(q) {
	const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
		q,
	)}&sort=updated&order=desc&per_page=25`;
	const headers = {
		'User-Agent': 'bounty-radar-bot/1.0',
		Accept: 'application/vnd.github+json',
	};
	if (token) headers.Authorization = `Bearer ${token}`;

	const res = await fetch(url, { headers });
	if (!res.ok) {
		console.warn(`Query failed (${res.status}): ${q}`);
		return [];
	}
	const data = await res.json();
	return data.items || [];
}

function escapeMd(text) {
	return String(text || '')
		.replace(/\|/g, '\\|')
		.replace(/\r?\n/g, ' ')
		.slice(0, 78);
}

function renderReadmeTable(feed) {
	const top = feed.results.slice(0, 10);
	const lines = [
		`> Auto-updated every 6 hours via GitHub Actions · Last scan: \`${feed.generatedAt}\` · Scanned **${feed.totalScanned}** issues, blocked **${feed.honeypotsBlocked}** honeypots.`,
		'',
		'| Score | Reward | Repository | Issue | Comments |',
		'| ---: | :--- | :--- | :--- | ---: |',
	];
	for (const item of top) {
		const reward = item.reward ? `**${item.reward.raw}**` : 'Unpriced';
		lines.push(
			`| ${item.winnabilityScore} | ${reward} | \`${item.repoFullName}\` | [#${item.number} ${escapeMd(
				item.title,
			)}](${item.url}) | ${item.comments} |`,
		);
	}
	return lines.join('\n');
}

async function main() {
	const seen = new Map();
	for (const q of QUERIES) {
		const items = await fetchQuery(q);
		for (const item of items) {
			if (!seen.has(item.id)) {
				seen.set(item.id, item);
			}
		}
	}

	const uniqueIssues = [...seen.values()];
	const ranked = rankBounties(uniqueIssues, {
		hideHoneypots: true,
		onlyUnassigned: true,
		maxComments: 10,
	});

	const feed = {
		generatedAt: new Date().toISOString(),
		totalScanned: ranked.totalScanned,
		honeypotsBlocked: ranked.honeypotsBlocked,
		results: ranked.results.slice(0, 40),
	};

	const docsFeedPath = path.resolve('docs/feed.json');
	fs.writeFileSync(docsFeedPath, JSON.stringify(feed, null, 2) + '\n', 'utf8');

	const readmePath = path.resolve('README.md');
	const readme = fs.readFileSync(readmePath, 'utf8');
	const startTag = '<!-- BOUNTY_FEED_START -->';
	const endTag = '<!-- BOUNTY_FEED_END -->';
	if (readme.includes(startTag) && readme.includes(endTag)) {
		const table = renderReadmeTable(feed);
		const updated = readme.replace(
			new RegExp(`${startTag}[\\s\\S]*?${endTag}`),
			`${startTag}\n${table}\n${endTag}`,
		);
		fs.writeFileSync(readmePath, updated, 'utf8');
	}

	console.log(
		`Generated docs/feed.json: ${feed.results.length} clean bounties (scanned ${feed.totalScanned}, blocked ${feed.honeypotsBlocked} honeypots).`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
