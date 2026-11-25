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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-25T01:42:41.597Z` · Scanned **36** issues, blocked **11** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 100 | **0.12 SOL** | `incidere/solana-agent-bounties` | [#1 🪙 [Bounty] [0.12 SOL Zero-Gas] Build a <=8KB Real-Time Solana SPL Mint Anomal](https://github.com/incidere/solana-agent-bounties/issues/1) | 2 |
| 100 | **0.08 SOL** | `incidere/solana-agent-bounties` | [#12 [Bounty + Arena] [0.08 SOL + 600 VLOOP] MCB-01: 4-Shot Anime Character Consist](https://github.com/incidere/solana-agent-bounties/issues/12) | 0 |
| 95 | **0.12 SOL** | `incidere/solana-agent-bounties` | [#7 🪙 [Bounty] [0.12 SOL Zero-Gas] Offline Protocol Snapshot Derivative Stripper ](https://github.com/incidere/solana-agent-bounties/issues/7) | 5 |
| 95 | **0.1 SOL** | `incidere/solana-agent-bounties` | [#13 🎮 [Bounty + Game Arena] [0.10 SOL + 800 VLOOP] TMA-01: 9:16 One-Thumb Physics](https://github.com/incidere/solana-agent-bounties/issues/13) | 4 |
| 95 | **0.1 SOL** | `incidere/solana-agent-bounties` | [#6 🪙 [Bounty] [0.10 SOL Zero-Gas] Grounded Passage Citation Verifier & Abstentio](https://github.com/incidere/solana-agent-bounties/issues/6) | 4 |
| 95 | **0.09 SOL** | `incidere/solana-agent-bounties` | [#8 🪙 [Bounty] [0.09 SOL Zero-Gas] Multi-Channel 2D Kinematics & Burst-Rhythm Ano](https://github.com/incidere/solana-agent-bounties/issues/8) | 5 |
| 95 | **0.09 SOL** | `incidere/solana-agent-bounties` | [#9 🪙 [Bounty] [0.09 SOL Zero-Gas] Rust Non-Blocking Goodput Probe & Hysteresis T](https://github.com/incidere/solana-agent-bounties/issues/9) | 5 |
| 95 | **0.08 SOL** | `incidere/solana-agent-bounties` | [#3 🪙 [Bounty] [0.08 SOL Zero-Gas] Fix Infinite Async Stream batchWithin(K, D) Ti](https://github.com/incidere/solana-agent-bounties/issues/3) | 3 |
| 95 | **0.06 SOL** | `incidere/solana-agent-bounties` | [#2 🪙 [Bounty] [0.06 SOL Zero-Gas] Compact <=4KB Python Bytecode Stack VM with Fi](https://github.com/incidere/solana-agent-bounties/issues/2) | 5 |
| 87 | Unpriced | `Ayush441-python/AUREN` | [#308 [Bug Bounty] Bundled reference risk score contradicts the current scoring rule](https://github.com/Ayush441-python/AUREN/issues/308) | 0 |
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
