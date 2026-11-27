# BountyRadar

**Filter Honeypots. Find Winnable GitHub Bounties.**

Live Web App: **https://teylerboal-dev.github.io/bounty-radar/**

Most `label:bounty` results on GitHub are synthetic benchmark spam, already-assigned issues, or 200-comment dogpiles. **BountyRadar** scans live GitHub issues, filters out known synthetic/honeypot orgs, parses USD/USDC/ZEC/XTR payouts, and scores every open bounty from **0–100** by real winnability.

## Features
- **Anti-Honeypot Filter**: Automatically blocks known synthetic/test bounty orgs and automated digest spam.
- **Reward Parser**: Normalizes `$500`, `$4k`, `250 USDC`, `0.05 ZEC`, `15 XTR`, etc. into estimated USD values.
- **Winnability Score (0–100)**: Combines freshness, competition (comment count & assignee status), reward clarity, and verified platform signals (Algora, Opire, ZecHub).
- **Zero-Backend Web Dashboard**: Runs 100% client-side on GitHub Pages. Optional GitHub PAT stays strictly in `localStorage`.
- **Agent-Ready CLI**: Outputs structured `--json` for autonomous coding agents and scripts.

## Quick Start (CLI)
```bash
git clone https://github.com/teylerboal-dev/bounty-radar.git
cd bounty-radar
node bin/bounty-radar.mjs --lang typescript --min-usd 100 --max-comments 3
```

For autonomous agents (JSON output):
```bash
GITHUB_TOKEN=your_token node bin/bounty-radar.mjs --query "bounty USDC" --json
```

## Live Top 10 Winnable Bounties (Auto-Updated 24/7)
<!-- BOUNTY_FEED_START -->
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-27T15:45:00.843Z` · Scanned **46** issues, blocked **11** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 100 | **$100** | `Tgentic/TGENTIC` | [#1 Call for security review — contracts, gate, SDKs](https://github.com/Tgentic/TGENTIC/issues/1) | 2 |
| 93 | Unpriced | `hanzoai/gui` | [#21 [Intern] Keyboard navigation, focus-ring & WCAG AA accessibility audit on core](https://github.com/hanzoai/gui/issues/21) | 0 |
| 93 | Unpriced | `hanzoai/chat` | [#3 [Intern] Static SPA build against local `hanzoai/engine` + Playwright streamin](https://github.com/hanzoai/chat/issues/3) | 0 |
| 91 | **$125** | `Ayush441-python/AUREN` | [#192 [Bug Bounty] Wallet import returns 502 for a valid Base address](https://github.com/Ayush441-python/AUREN/issues/192) | 5 |
| 88 | **1 USDC** | `immanueltella-web/quantum-media-os.` | [#1 💷 XOOL Penniless Agent — first £1 target](https://github.com/immanueltella-web/quantum-media-os./issues/1) | 0 |
| 87 | Unpriced | `hanzoai/post` | [#21 [Intern] Social publishing scheduler timezone & media validation unit tests](https://github.com/hanzoai/post/issues/21) | 1 |
| 87 | Unpriced | `hanzoai/extension` | [#30 [Intern] Browser extension (Chrome/Firefox/Edge) + VS Code `.vsix` build & ZAP](https://github.com/hanzoai/extension/issues/30) | 1 |
| 87 | Unpriced | `hanzoai/docs` | [#26 [Intern] Copy-paste audit of Getting Started, Self-Hosting, Mobile, Desktop & ](https://github.com/hanzoai/docs/issues/26) | 1 |
| 87 | Unpriced | `hanzoai/kv` | [#15 [Intern] Clean source build, Redis-CLI smoke matrix & baseline throughput benc](https://github.com/hanzoai/kv/issues/15) | 2 |
| 87 | Unpriced | `paraspell/xcm-tools` | [#2699 [Bug bounty] findAssetInfo silently picks a different asset when symbol case d](https://github.com/paraspell/xcm-tools/issues/2699) | 0 |
<!-- BOUNTY_FEED_END -->

## Run Tests
```bash
npm test
```

## Pro Access & Direct USDC Support
- **Monthly Pro**: `$19 USDC` · **Lifetime Pro**: `$49 USDC`
- **EVM Address (Base / Ethereum / Arbitrum / Optimism)**: `0x1Dc13865aAD54C5ae7faD363595bC7ed087c69B9`

## License
MIT
