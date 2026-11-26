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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-26T01:16:10.468Z` · Scanned **45** issues, blocked **8** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 98 | **$0.03** | `PhanKhoa95/oss-bot-trap-benchmark` | [#100 [Arena 30pts / $0.03] fix(x402): preserve explicitRetryable override and bound](https://github.com/PhanKhoa95/oss-bot-trap-benchmark/issues/100) | 1 |
| 95 | **0.12 SOL** | `incidere/vloop-free-openai-mcp` | [#1 🪙 [Bounty] [0.12 SOL Zero-Gas] Build a <=8KB Real-Time Solana SPL Mint Anomal](https://github.com/incidere/vloop-free-openai-mcp/issues/1) | 3 |
| 87 | Unpriced | `SoroWork/sorowork-contracts` | [#101 Add test: approve_work correctly transfers exact bounty amount](https://github.com/SoroWork/sorowork-contracts/issues/101) | 0 |
| 87 | Unpriced | `SoroWork/sorowork-contracts` | [#1 BountyEscrow: create_bounty does not validate zero-amount deposits](https://github.com/SoroWork/sorowork-contracts/issues/1) | 0 |
| 87 | Unpriced | `paraloom-labs/paraloom-core` | [#1724 [BOUNTY] Low: Swap fresh-address secret keys and note blindings stored in plai](https://github.com/paraloom-labs/paraloom-core/issues/1724) | 0 |
| 87 | Unpriced | `paraloom-labs/paraloom-core` | [#1723 [BOUNTY] Low: Wallet silently discards the user's `slippageBps` — swaps execut](https://github.com/paraloom-labs/paraloom-core/issues/1723) | 0 |
| 82 | Unpriced | `ilhamraduanbis-source/toyol-digital` | [#8 Toyol Mission Engine — persistent mission queue and heartbeat](https://github.com/ilhamraduanbis-source/toyol-digital/issues/8) | 0 |
| 81 | Unpriced | `SoroWork/sorowork-backend` | [#140 Stellar: add wallet balance check on task creation](https://github.com/SoroWork/sorowork-backend/issues/140) | 1 |
| 81 | Unpriced | `paraloom-labs/paraloom-core` | [#1722 [BOUNTY] Medium: Co-sign `transact_spl` settlement hardcodes the classic SPL T](https://github.com/paraloom-labs/paraloom-core/issues/1722) | 1 |
| 79 | **0.1 SOL** | `incidere/solana-agent-bounties` | [#13 🎮 [Bounty + Game Arena] [0.10 SOL + 800 VLOOP] TMA-01: 9:16 One-Thumb Physics](https://github.com/incidere/solana-agent-bounties/issues/13) | 9 |
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
