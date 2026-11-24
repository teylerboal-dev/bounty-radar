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
> Auto-updated every 6 hours via GitHub Actions · Last scan: `2026-11-24T03:34:05.862Z` · Scanned **43** issues, blocked **0** honeypots.

| Score | Reward | Repository | Issue | Comments |
| ---: | :--- | :--- | :--- | ---: |
| 100 | **$1** | `Ayush441-python/AUREN` | [#283 [Maths Bounty] Zero-variance assets like USDC get 0.0 self-correlation on the ](https://github.com/Ayush441-python/AUREN/issues/283) | 0 |
| 98 | **$0.04** | `PhanKhoa95/oss-bot-trap-benchmark` | [#113 [Wave 11] fix(rpc): enforce BigInt stroops fee floor and SEP-10 challenge wind](https://github.com/PhanKhoa95/oss-bot-trap-benchmark/issues/113) | 1 |
| 98 | **$0.035** | `PhanKhoa95/oss-bot-trap-benchmark` | [#115 [Wave 11] fix(xdr): reject boolean ledger sequence inputs and align 64-frame c](https://github.com/PhanKhoa95/oss-bot-trap-benchmark/issues/115) | 2 |
| 87 | Unpriced | `odiseo159-beep/mergit-demo` | [#25 Add parseIssueUrl: owner, repo and number from an issue link](https://github.com/odiseo159-beep/mergit-demo/issues/25) | 1 |
| 87 | Unpriced | `odiseo159-beep/mergit-demo` | [#27 Add timeLeft: how long a bounty stays open](https://github.com/odiseo159-beep/mergit-demo/issues/27) | 1 |
| 87 | Unpriced | `odiseo159-beep/mergit-demo` | [#28 Add feeTable: a Markdown table of fees and payouts](https://github.com/odiseo159-beep/mergit-demo/issues/28) | 1 |
| 87 | Unpriced | `odiseo159-beep/mergit-demo` | [#30 Add validateMergitJson: check mergit.json before committing it](https://github.com/odiseo159-beep/mergit-demo/issues/30) | 1 |
| 87 | Unpriced | `Ikalus1988/MisakaNet` | [#5645 [Bounty] Answer the 2 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/5645) | 2 |
| 87 | Unpriced | `Ikalus1988/MisakaNet` | [#5643 [Bounty] Answer the 3 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/5643) | 1 |
| 87 | Unpriced | `Ikalus1988/MisakaNet` | [#5641 [Bounty] Answer the 4 linked question(s)](https://github.com/Ikalus1988/MisakaNet/issues/5641) | 1 |
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
