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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-23T12:42:56.322Z` · Scanned **46** issues, blocked **16** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 100 | **$30,000** | `Ayush441-python/AUREN` | [#241 [Bug Bounty] Wallet import rounds a positive holding to zero and /risk rejects](https://github.com/Ayush441-python/AUREN/issues/241) | 1 |
| 87 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#9 Split AVAX locked stake out of the total](https://github.com/tradermarketcap/tradermarketcap-open/issues/9) | 2 |
| 87 | Unpriced | `Omar0Gamal/SettleCore` | [#1 M-01: Cold-Path Withdrawals Bypass the Rolling 24-Hour Rate Cap (RateLimited._](https://github.com/Omar0Gamal/SettleCore/issues/1) | 0 |
| 82 | Unpriced | `ilhamraduanbis-source/toyol-digital` | [#8 Toyol Mission Engine — persistent mission queue and heartbeat](https://github.com/ilhamraduanbis-source/toyol-digital/issues/8) | 0 |
| 81 | Unpriced | `Ayush441-python/AUREN` | [#225 [Bug Bounty] Overview ranks a 15-point risk driver above a 20-point driver](https://github.com/Ayush441-python/AUREN/issues/225) | 1 |
| 81 | Unpriced | `Swordfish90/Lemuroid` | [#1213 Bounty: RTC not syncing (NDS)](https://github.com/Swordfish90/Lemuroid/issues/1213) | 2 |
| 79 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#3 Read SEI circulating supply from the chain](https://github.com/tradermarketcap/tradermarketcap-open/issues/3) | 3 |
| 79 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#4 Read TIA (Celestia) circulating supply](https://github.com/tradermarketcap/tradermarketcap-open/issues/4) | 4 |
| 68 | Unpriced | `monkey-trading/engine` | [#72 Bug bounty programme](https://github.com/monkey-trading/engine/issues/72) | 2 |
| 52 | Unpriced | `ilhamraduanbis-source/toyol-digital` | [#5 🔐 Toyol Pocket — Tindakan pemilik sebelum bayaran sebenar](https://github.com/ilhamraduanbis-source/toyol-digital/issues/5) | 6 |
<!-- BOUNTY_FEED_END -->

## Run Tests
```bash
npm test
```

## License
MIT
