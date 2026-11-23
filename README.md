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

## Run Tests
```bash
npm test
```

## License
MIT
