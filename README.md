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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-24T16:39:45.073Z` · Scanned **49** issues, blocked **1** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 97 | **1 USDC** | `VAN-Network/van-community` | [#2 Paid buyer-agent test: 1 USDC order advance + 1 USDC tester fee — Base mainnet](https://github.com/VAN-Network/van-community/issues/2) | 2 |
| 93 | Unpriced | `freedom-winds/BountyScout` | [#1451 🎯 Bounty Alert: 15 New Opportunityies found](https://github.com/freedom-winds/BountyScout/issues/1451) | 0 |
| 87 | Unpriced | `Fishers-Founders-United/Swapatron5000` | [#98 Bounty (2): Research how other swap boxes handle loss and junk, and write up w](https://github.com/Fishers-Founders-United/Swapatron5000/issues/98) | 2 |
| 87 | Unpriced | `neilkpatel/whatagentsbuy` | [#18 Seller submission: Ops Control HQ — existing Base USDC API catalog](https://github.com/neilkpatel/whatagentsbuy/issues/18) | 0 |
| 87 | Unpriced | `bad-antics/lateralus-lang` | [#971 [bounty] Vector arithmetic silently truncates unequal dimensions instead of re](https://github.com/bad-antics/lateralus-lang/issues/971) | 0 |
| 82 | Unpriced | `hanzoai/cloud` | [#32 Verifiable agent-produced artifacts (SLSA provenance, Sigstore)](https://github.com/hanzoai/cloud/issues/32) | 1 |
| 82 | Unpriced | `hanzoai/vfs` | [#44 Audit redundant requests across host, gofer and S3 (CETOFS)](https://github.com/hanzoai/vfs/issues/44) | 1 |
| 82 | Unpriced | `hanzoai/agents` | [#80 Computer-workflow benchmark on Visor (OSWorld)](https://github.com/hanzoai/agents/issues/80) | 1 |
| 82 | Unpriced | `hanzoai/agents` | [#78 Durable event-driven agent workflow replay (durable-execution patterns)](https://github.com/hanzoai/agents/issues/78) | 1 |
| 82 | Unpriced | `odiseo159-beep/mergit-demo` | [#25 Add parseIssueUrl: owner, repo and number from an issue link](https://github.com/odiseo159-beep/mergit-demo/issues/25) | 1 |
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
