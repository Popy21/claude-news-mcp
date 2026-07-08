# Security Policy & Bug Bounty Program

**Claude News** ([claudenews.online](https://claudenews.online)) and the
`claude-news-mcp` server are published by **Héra SASU**. We take the security of
our users and their MCP clients seriously and welcome reports from the security
community.

This document is our **vulnerability disclosure policy** and **bug bounty
program**. By participating you agree to the rules below.

---

## Supported scope

Security research is welcome against the following assets:

| Asset | Details |
|---|---|
| **MCP server (stdio bridge)** | This repository — `src/index.js`, `package.json`, `Dockerfile` |
| **Hosted MCP endpoint** | `https://claudenews.online/api/mcp` |
| **Public JSON API** | `https://claudenews.online/api/search` |
| **Website & feeds** | `https://claudenews.online`, `/feed.xml`, `/widget` |

### Out of scope

- Denial-of-service (DoS/DDoS), volumetric or resource-exhaustion attacks
- Social engineering, phishing, or physical attacks against Héra SASU or its staff
- Automated scanner output without a demonstrated, exploitable impact
- Missing security headers / best-practice suggestions with no concrete exploit
- Reports about third-party services we link to or aggregate news from
- Rate-limiting, CAPTCHA, or "no MFA" findings without further impact
- Vulnerabilities in dependencies already publicly disclosed and unpatched
  upstream (report those upstream; tell us if we ship a fixed version late)

---

## What we are especially interested in

- **Command / code injection** or RCE in the stdio bridge or the hosted API
- **SSRF** or request-smuggling via the `q` / `limit` parameters
- **Injection** flaws (SQL, template, header, log) in the search backend
- **Prompt-injection paths** that let attacker-controlled news content drive an
  MCP client into unsafe tool use (report the mechanism, not just the concept)
- **Supply-chain** issues in how the npm package or Docker image is built or published
- **Authentication / authorization** bypass on any non-public endpoint
- **Data exposure** (leaking secrets, internal endpoints, or other users' data)

---

## Rules of engagement

1. **Do no harm.** Only test against your own requests and data. Do not access,
   modify, or destroy data that isn't yours.
2. **No DoS.** Do not degrade service availability for others. Keep automated
   traffic to a reasonable rate (a few requests per second at most).
3. **Stop and report** as soon as you confirm a vulnerability — do not pivot
   deeper or exfiltrate more than a minimal proof of concept.
4. **Keep it private** until we have shipped a fix and agreed on disclosure.
5. **One issue per report**, with clear reproduction steps.
6. Give us a **reasonable time to remediate** before any public disclosure
   (see timelines below).

Acting in good faith under these rules, we will **not pursue legal action** and
will treat your research as authorized.

---

## How to report

Email **security@claudenews.online** (preferred). If you cannot reach that
address, open a **private [GitHub Security Advisory](https://github.com/Popy21/claude-news-mcp/security/advisories/new)**
on this repository.

**Please do not open a public issue or pull request for a security bug.**

Include:

- A clear description and the affected asset/endpoint
- Step-by-step reproduction (requests, payloads, or a minimal script)
- Impact assessment — what an attacker gains
- Your name/handle for credit (or tell us you want to stay anonymous)

Encrypt sensitive details if you wish; ask us for a PGP key in your first email.

---

## Our commitment (SLA)

| Stage | Target |
|---|---|
| Acknowledge your report | within **3 business days** |
| Initial triage & severity | within **7 business days** |
| Fix for critical issues | as fast as possible, typically **≤ 30 days** |
| Coordinated public disclosure | by mutual agreement after the fix ships |

---

## Rewards

Claude News is a small independent project, so rewards are **discretionary** and
based on impact, quality, and novelty of the report. We recognize valid,
in-scope, previously-unknown findings with:

| Severity | Recognition |
|---|---|
| **Critical** (RCE, auth bypass, mass data exposure) | Swag + public credit + a monetary bounty where our budget allows |
| **High** (SSRF, injection with real impact) | Public credit + possible monetary bounty |
| **Medium** | Public credit in our Hall of Fame |
| **Low / informational** | Public credit at our discretion |

The **first** reporter of a unique, reproducible issue is eligible. Duplicate or
already-known issues are not, though we still thank you.

### Hall of Fame

Researchers who help keep Claude News safe are listed in
[`SECURITY-HALL-OF-FAME.md`](./SECURITY-HALL-OF-FAME.md) (with permission).

---

## Safe harbor

We consider security research and vulnerability disclosure conducted under this
policy to be **authorized** and conducted in **good faith**. We will not pursue
or support legal action against you for accidental, good-faith violations of
this policy. If in doubt about whether a specific action is allowed, ask us
first at security@claudenews.online.

---

*Claude News is an independent media outlet published by Héra SASU and is not
affiliated with Anthropic. "Claude" and "Anthropic" belong to their respective
owners.*
