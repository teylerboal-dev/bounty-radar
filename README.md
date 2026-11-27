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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-27T01:14:11.921Z` · Scanned **48** issues, blocked **4** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 93 | Unpriced | `Ikalus1988/MisakaNet` | [#5849 [Bounty] Answer the 2 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/5849) | 0 |
| 88 | **2 USDC** | `immanueltella-web/quantum-media-os.` | [#1 💷 XOOL Penniless Agent — first £1 target](https://github.com/immanueltella-web/quantum-media-os./issues/1) | 0 |
| 87 | Unpriced | `Ikalus1988/MisakaNet` | [#5811 [Bounty] Answer the 2 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/5811) | 2 |
| 82 | Unpriced | `hanzoai/hips` | [#17 [HIP-1347] Umbrella Research Bounties: Event-Driven Agent Reliability](https://github.com/hanzoai/hips/issues/17) | 2 |
| 82 | Unpriced | `zoo-apps/papers` | [#10 Decentralized experience ledger](https://github.com/zoo-apps/papers/issues/10) | 1 |
| 82 | Unpriced | `Ikalus1988/MisakaNet` | [#4998 [Bounty] Answer the 4 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/4998) | 1 |
| 82 | Unpriced | `ilhamraduanbis-source/toyol-digital` | [#8 Toyol Mission Engine — persistent mission queue and heartbeat](https://github.com/ilhamraduanbis-source/toyol-digital/issues/8) | 0 |
| 79 | **0.09 SOL** | `incidere/solana-agent-bounties` | [#9 🪙 [Bounty] [0.09 SOL Zero-Gas] Rust Non-Blocking Goodput Probe & Hysteresis T](https://github.com/incidere/solana-agent-bounties/issues/9) | 7 |
| 79 | **0.09 SOL** | `incidere/solana-agent-bounties` | [#8 🪙 [Bounty] [0.09 SOL Zero-Gas] Multi-Channel 2D Kinematics & Burst-Rhythm Ano](https://github.com/incidere/solana-agent-bounties/issues/8) | 10 |
| 79 | Unpriced | `tradermarketcap/tradermarketcap-open` | [#108 Supply rule for Official Trump (TRUMP)](https://github.com/tradermarketcap/tradermarketcap-open/issues/108) | 3 |
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
