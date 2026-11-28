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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-28T00:48:09.008Z` · Scanned **39** issues, blocked **13** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 94 | **$10,000** | `Ayush441-python/AUREN` | [#274 [Bug Bounty] Editing portfolio size during analysis leaves preset and custom s](https://github.com/Ayush441-python/AUREN/issues/274) | 5 |
| 87 | Unpriced | `hanzoai/mobile` | [#2 [Intern] Android APK/ADB & iOS Xcode USB end-to-end install and UX QA](https://github.com/hanzoai/mobile/issues/2) | 1 |
| 87 | Unpriced | `hanzoai/post` | [#21 [Intern] Social publishing scheduler timezone & media validation unit tests](https://github.com/hanzoai/post/issues/21) | 2 |
| 87 | Unpriced | `hanzoai/docs` | [#26 [Intern] Copy-paste audit of Getting Started, Self-Hosting, Mobile, Desktop & ](https://github.com/hanzoai/docs/issues/26) | 2 |
| 87 | Unpriced | `hanzoai/billing` | [#1 [Intern] Plans, invoices & usage dashboard mock-API test suite](https://github.com/hanzoai/billing/issues/1) | 2 |
| 87 | Unpriced | `hanzoai/gui` | [#21 [Intern] Keyboard navigation, focus-ring & WCAG AA accessibility audit on core](https://github.com/hanzoai/gui/issues/21) | 1 |
| 79 | Unpriced | `hanzoai/ui` | [#337 [Intern] Verify `@hanzo/ui` tree-shaking, React 19 / Next.js static export & S](https://github.com/hanzoai/ui/issues/337) | 4 |
| 79 | Unpriced | `hanzoai/python-sdk` | [#55 [Intern] Quickstart, async streaming & MCP/IAM example verification on Python ](https://github.com/hanzoai/python-sdk/issues/55) | 3 |
| 78 | **$30,000** | `Ayush441-python/AUREN` | [#241 [Bug Bounty] Wallet import rounds a positive holding to zero and /risk rejects](https://github.com/Ayush441-python/AUREN/issues/241) | 6 |
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
