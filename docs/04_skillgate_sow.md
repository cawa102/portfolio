# Statement of Work: SkillGate

**Project Name:** SkillGate
**Version:** 1.0.0 (Release)
**Repository:** https://github.com/cawa102/SkillsGate
**License:** MIT

---

## 1. Executive Summary

SkillGate is a pre-installation security scanner for Claude Code Skills, MCP servers, and agent extensions. It provides a 6-layer defense-in-depth approach with policy-based enforcement (ALLOW/BLOCK/QUARANTINE) to prevent malicious extensions from compromising your development environment.

---

## 2. Project Objectives

| Objective | Description |
|-----------|-------------|
| **Prevention** | Block malicious Skills before installation |
| **Detection** | Identify AI Skill-specific attack patterns |
| **Enforcement** | Policy-based automated decisions |
| **Auditability** | Reproducible results with audit trails |

---

## 3. Problem Statement

AI agent extensions are not just configuration files—they're **executable code** running in your local environment with access to:
- API keys (OpenAI, AWS, GitHub)
- SSH keys
- Browser credentials
- `.env` files

### Why Traditional Tools Fall Short

| Tool | Category | Limitation |
|------|----------|------------|
| **Trivy** | Container scanning | Doesn't detect AI Skill-specific patterns |
| **Snyk** | Dependency scanning | No policy-based enforcement |
| **Gitleaks** | Secret detection | Secrets only, no command scanning |
| **Semgrep** | Static analysis | No Skill-specific attack rules |
| **npm audit** | Package vulnerabilities | No postinstall detection |

### SkillGate's Approach

```
Traditional: "Detect and report" → Human decides → Risk of oversight
SkillGate:   "Detect + Policy + Enforce" → Auto block/allow/quarantine
```

---

## 4. Technical Architecture

```
                sg scan <source>
                      │
                      ▼
        ┌─────────────────────────┐
        │  Source Type Detection  │
        │  (git / archive / local)│
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │       Ingestor          │
        │  • Clone/Extract/Read   │
        │  • Hash computation     │
        │  • Commit SHA recording │
        └─────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────┐
│     Scanner Orchestrator (Parallel)     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Secret  │ │ Static  │ │  Skill  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Entrypnt │ │  Deps   │ │ CI Risk │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │     Policy Engine       │
        │  • Score calculation    │
        │  • Rule matching        │
        │  • Threshold evaluation │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │       Enforcer          │
        │  ALLOW / BLOCK / QUAR   │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │       Reporter          │
        │  (JSON / Markdown)      │
        └─────────────────────────┘
```

---

## 5. Technology Stack

| Component | Technology |
|-----------|-----------|
| Language | TypeScript 5.3 |
| Runtime | Node.js 20+ |
| CLI Framework | Commander.js |
| Schema Validation | Zod |
| Testing | Vitest |
| Linting | ESLint |

---

## 6. Key Deliverables

| Deliverable | Description | Status |
|-------------|-------------|--------|
| CLI Tool | `sg scan` command | Complete |
| 6 Scanners | Defense-in-depth layers | Complete |
| Policy Engine | YAML-based rules | Complete |
| Reporters | JSON / Markdown output | Complete |
| Test Suite | 404 passing tests | Complete |

---

## 7. 6-Layer Defense-in-Depth

| Layer | Scanner | Detects |
|-------|---------|---------|
| 1 | **Secret Scanner** | AWS keys, GitHub tokens, API keys |
| 2 | **Static Analyzer** | eval(), exec(), obfuscation |
| 3 | **Skill Scanner** | rm -rf, curl\|bash, sudo, chmod |
| 4 | **Entrypoint Detector** | postinstall, setup.py, Makefile |
| 5 | **Dependency Scanner** | Known vulnerabilities (OSV API) |
| 6 | **CI Risk Analyzer** | GitHub Actions dangerous patterns |

---

## 8. Policy System

### Exit Codes

| Code | Decision | Action |
|------|----------|--------|
| `0` | ALLOW | Installation permitted |
| `1` | BLOCK | Installation denied |
| `2` | QUARANTINE | Sandboxed execution recommended |
| `3` | ERROR | Scan failed |

### Policy Configuration

```yaml
# skillgate.policy.yaml
name: strict-policy
thresholds:
  block: 40    # Score <= 40 triggers block
  warn: 70     # Score <= 70 triggers warning

critical_block:  # Immediate block (regardless of score)
  - secret_aws_access_key
  - skill_rm_rf_root
  - skill_curl_bash

rules:
  skill_sudo_usage:
    severity: high
    weight: 20
    enabled: true
```

---

## 9. Commands

### `sg scan <source>`

```bash
sg scan <source> [options]

Options:
  -o, --output <file>   Output file path
  -f, --format <format> Output format (json|markdown)
  -p, --policy <file>   Policy file to use
  -v, --verbose         Enable verbose output
  -q, --quiet           Suppress output except errors
```

### `sg init`

```bash
sg init [options]

Options:
  -o, --output <file>  Output path [default: skillgate.policy.yaml]
  --force              Overwrite existing file
```

### `sg validate <policy>`

```bash
sg validate ./my-policy.yaml
# ✓ Policy file is valid
```

---

## 10. Output Examples

### Safe Skill (ALLOW)

```json
{
  "decision": "allow",
  "score": 100,
  "summary": { "critical": 0, "high": 0, "medium": 0, "low": 0 }
}
```

### Dangerous Skill (BLOCK)

```json
{
  "decision": "block",
  "score": 25,
  "findings": [
    {
      "severity": "critical",
      "rule": "skill_rm_rf_root",
      "message": "Destructive rm -rf command targeting root directory",
      "location": { "file": "SKILL.md", "line": 15 }
    },
    {
      "severity": "critical",
      "rule": "skill_curl_bash",
      "message": "curl | bash pattern detected - arbitrary code execution"
    }
  ]
}
```

---

## 11. CI/CD Integration

### GitHub Actions

```yaml
name: Skill Security Check
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install SkillGate
        run: npm install -g skillgate

      - name: Scan Skills
        run: sg scan ./skills --quiet
        # Exit code 1 will fail the workflow
```

---

## 12. Audit Trail

```json
{
  "source": {
    "hash": "a1b2c3d4...",
    "commit": "abc123"
  },
  "decision": "block",
  "score": 25,
  "findings": [...],
  "policyName": "strict-policy",
  "timestamp": "2026-02-02T12:00:00Z"
}
```

**Reproducibility Guarantee:** Same input + Same policy = Always same result

---

## 13. Current Status & Roadmap

### Current Status: Release v1.0.0

| Milestone | Status |
|-----------|--------|
| Core scanning engine | Complete |
| 6 scanner modules | Complete |
| Policy engine | Complete |
| CLI interface | Complete |
| Test suite (404 tests) | Complete |

### Testing Metrics

- **Test Files:** 23
- **Passing Tests:** 404
- **Coverage:** High

---

## 14. Use Cases

### Use It For

| Scenario | Reason |
|----------|--------|
| Before installing a new Skill | Block malicious code proactively |
| CI/CD pipelines | Integrate as automatic gate |
| Team development | Policy-based approval |
| MCP server adoption | Verify external server safety |
| Evaluating open-source Skills | Pre-check untrusted sources |

### Don't Use It For

| Scenario | Alternative Tool |
|----------|------------------|
| Web app vulnerability scanning | Trivy, OWASP ZAP |
| Existing codebase static analysis | Semgrep, CodeQL |
| Docker image scanning | Trivy, Grype |
| Penetration testing | Burp Suite, Metasploit |
