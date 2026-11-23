import { rankBounties } from './engine.mjs';

const els = {
	preset: document.getElementById('preset'),
	lang: document.getElementById('lang'),
	maxComments: document.getElementById('maxComments'),
	minUsd: document.getElementById('minUsd'),
	token: document.getElementById('token'),
	hideHoneypots: document.getElementById('hideHoneypots'),
	scanBtn: document.getElementById('scanBtn'),
	exportBtn: document.getElementById('exportBtn'),
	statusBar: document.getElementById('statusBar'),
	results: document.getElementById('results'),
	statScanned: document.getElementById('statScanned'),
	statBlocked: document.getElementById('statBlocked'),
	statClean: document.getElementById('statClean'),
	statPool: document.getElementById('statPool'),
};

let lastRanked = null;

// Restore saved token (strictly localStorage)
const savedToken = localStorage.getItem('bounty_radar_gh_token');
if (savedToken) {
	els.token.value = savedToken;
}
els.token.addEventListener('change', () => {
	const val = els.token.value.trim();
	if (val) localStorage.setItem('bounty_radar_gh_token', val);
	else localStorage.removeItem('bounty_radar_gh_token');
});

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderResults(ranked) {
	lastRanked = ranked;
	els.statScanned.textContent = String(ranked.totalScanned);
	els.statBlocked.textContent = String(ranked.honeypotsBlocked);
	els.statClean.textContent = String(ranked.results.length);

	const totalUsd = ranked.results.reduce((sum, item) => sum + (item.reward?.estimatedUsd ?? 0), 0);
	els.statPool.textContent =
		totalUsd > 0 ? `$${Math.round(totalUsd).toLocaleString('en-US')}+` : 'Unpriced';

	if (!ranked.results.length) {
		els.results.innerHTML =
			'<div class="status-bar">No clean bounties matched those filters. Try raising Max Comments or changing the Source Preset.</div>';
		return;
	}

	els.results.innerHTML = ranked.results
		.map((item) => {
			const scoreClass =
				item.winnabilityScore >= 75 ? '' : item.winnabilityScore >= 50 ? 'mid' : 'low';
			const rewardChip = item.reward
				? `<span class="chip chip-reward">${escapeHtml(item.reward.raw)}</span>`
				: '<span class="chip">Reward in thread</span>';
			const labelChips = item.labels
				.slice(0, 4)
				.map((l) => `<span class="chip">${escapeHtml(l)}</span>`)
				.join('');
			const ghCmd = `gh issue view ${item.number} --repo ${item.repoFullName}`;

			return `
				<article class="bounty-card">
					<div class="score-box ${scoreClass}">
						<span class="score-num">${item.winnabilityScore}</span>
						<span class="score-cap">Score</span>
					</div>
					<div>
						<div class="bounty-meta">
							<span>${escapeHtml(item.repoFullName)}#${item.number}</span>
							<span>💬 ${item.comments} comments</span>
							<span>⏱ ${item.ageDays}d old</span>
						</div>
						<h3 class="bounty-title">
							<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>
						</h3>
						<div class="chips">${rewardChip}${labelChips}</div>
					</div>
					<div class="card-actions">
						<a class="btn-primary" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open ↗</a>
						<button class="btn-secondary copy-cmd" data-cmd="${escapeHtml(ghCmd)}">Copy gh</button>
					</div>
				</article>
			`;
		})
		.join('');

	els.results.querySelectorAll('.copy-cmd').forEach((btn) => {
		btn.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(btn.dataset.cmd);
				btn.textContent = 'Copied!';
				setTimeout(() => {
					btn.textContent = 'Copy gh';
				}, 1200);
			} catch {
				btn.textContent = 'Failed';
			}
		});
	});
}

async function runScan() {
	els.scanBtn.disabled = true;
	els.statusBar.textContent = 'Scanning live GitHub issues...';

	const parts = [els.preset.value, 'is:issue', 'is:open', 'no:assignee'];
	if (els.lang.value) parts.push(`language:${els.lang.value}`);

	const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
		parts.join(' '),
	)}&sort=updated&order=desc&per_page=35`;

	const headers = { Accept: 'application/vnd.github+json' };
	const token = els.token.value.trim();
	if (token) headers.Authorization = `Bearer ${token}`;

	try {
		const res = await fetch(url, { headers });
		if (!res.ok) {
			const msg =
				res.status === 403
					? 'GitHub unauthenticated rate limit hit. Add a free GitHub token above for 5,000 req/hr.'
					: `GitHub API returned HTTP ${res.status}.`;
			els.statusBar.textContent = msg;
			return;
		}
		const data = await res.json();
		const ranked = rankBounties(data.items || [], {
			hideHoneypots: els.hideHoneypots.checked,
			onlyUnassigned: true,
			maxComments: Number(els.maxComments.value),
			minUsd: Number(els.minUsd.value),
		});
		els.statusBar.textContent = `Updated ${new Date().toLocaleTimeString()} · Found ${ranked.results.length} clean bounties (blocked ${ranked.honeypotsBlocked} honeypots).`;
		renderResults(ranked);
	} catch (err) {
		els.statusBar.textContent = `Network error: ${err.message}`;
	} finally {
		els.scanBtn.disabled = false;
	}
}

els.scanBtn.addEventListener('click', runScan);
els.exportBtn.addEventListener('click', () => {
	if (!lastRanked) return;
	const blob = new Blob([JSON.stringify(lastRanked, null, 2)], { type: 'application/json' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = `bounty-radar-${new Date().toISOString().slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(a.href);
});

async function loadPrebakedFeed() {
	try {
		const res = await fetch('./feed.json', { cache: 'no-store' });
		if (!res.ok) return false;
		const feed = await res.json();
		if (!Array.isArray(feed.results) || feed.results.length === 0) return false;
		const updated = feed.generatedAt ? new Date(feed.generatedAt).toLocaleString() : 'recently';
		els.statusBar.textContent = `Loaded 24/7 cloud snapshot (${updated}) · ${feed.results.length} clean bounties (blocked ${feed.honeypotsBlocked} honeypots). Click "Scan Live Bounties" for custom filters.`;
		renderResults(feed);
		return true;
	} catch {
		return false;
	}
}

loadPrebakedFeed().then((loaded) => {
	if (!loaded) runScan();
});
