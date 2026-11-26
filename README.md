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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-26T15:56:14.971Z` · Scanned **44** issues, blocked **3** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 100 | **$69.1** | `dev-kp-eloper/BountyScout` | [#1807 🎯 Bounty Alert: 5 New Opportunityies found](https://github.com/dev-kp-eloper/BountyScout/issues/1807) | 0 |
| 100 | **$69.1** | `aeyakovenko/percolator-cli` | [#103 # Round 2: Multi-Step Self-Liquidation Drains 98.71% of Insurance Pool ($69.10](https://github.com/aeyakovenko/percolator-cli/issues/103) | 1 |
| 100 | **$25** | `Ayush441-python/AUREN` | [#325 [API Integration Bounty] Vercel AI SDK Core Tool for AUREN /risk](https://github.com/Ayush441-python/AUREN/issues/325) | 0 |
| 95 | **0.08 SOL** | `incidere/solana-agent-bounties` | [#12 [Bounty + Arena] [0.08 SOL + 600 VLOOP] MCB-01: 4-Shot Anime Character Consist](https://github.com/incidere/solana-agent-bounties/issues/12) | 5 |
| 93 | Unpriced | `Rohank143/BountyScout` | [#149 🎯 Bounty Alert: 8 New Opportunityies found](https://github.com/Rohank143/BountyScout/issues/149) | 0 |
| 87 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#108 Supply rule for Official Trump (TRUMP)](https://github.com/tradermarketcap/tradermarketcap-open/issues/108) | 1 |
| 87 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#107 Supply rule for LayerZero (ZRO)](https://github.com/tradermarketcap/tradermarketcap-open/issues/107) | 1 |
| 87 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#112 Supply rule for MANTRA (MANTRA)](https://github.com/tradermarketcap/tradermarketcap-open/issues/112) | 2 |
| 82 | Unpriced | `ilhamraduanbis-source/toyol-digital` | [#8 Toyol Mission Engine — persistent mission queue and heartbeat](https://github.com/ilhamraduanbis-source/toyol-digital/issues/8) | 0 |
| 79 | **0.12 SOL** | `incidere/solana-agent-bounties` | [#7 🪙 [Bounty] [0.12 SOL Zero-Gas] Offline Protocol Snapshot Derivative Stripper ](https://github.com/incidere/solana-agent-bounties/issues/7) | 8 |
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
