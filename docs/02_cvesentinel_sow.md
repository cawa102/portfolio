# Statement of Work: cveSentinel

**Project Name:** cveSentinel
**Version:** 0.2.0 (Beta)
**Repository:** https://github.com/cawa102/cveSentinel
**PyPI:** https://pypi.org/project/cve-sentinel/
**License:** MIT

---

## 1. Executive Summary

cveSentinel is an AI-powered vulnerability detection system that automatically identifies CVEs in project dependencies. It combines NVD (National Vulnerability Database) and Google OSV (Open Source Vulnerabilities) with intelligent filtering to deliver broad coverage without false positives.

---

## 2. Project Objectives

| Objective | Description |
|-----------|-------------|
| **Primary** | Detect vulnerabilities in dependencies before they are exploited |
| **Coverage** | Combine multiple data sources for maximum detection |
| **Accuracy** | Eliminate false positives through CPE-based validation |
| **Integration** | Seamless Claude Code session hook integration |

---

## 3. Scope of Work

### 3.1 In Scope
- Dependency manifest parsing (7+ languages)
- CVE lookup via NVD API 2.0 and Google OSV
- False positive filtering with CPE validation
- Three analysis levels (manifest, lock files, source code)
- Claude Code SessionStart hook integration

### 3.2 Out of Scope
- Runtime vulnerability detection
- SAST/DAST scanning
- Container image scanning

---

## 4. Technical Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Your Project   │────▶│  CVE Sentinel   │────▶│  Security Report│
│                 │     │                 │     │                 │
│ package.json    │     │ ┌─────────────┐ │     │ 3 Critical      │
│ requirements.txt│     │ │ NVD API 2.0 │ │     │ 5 High          │
│ go.mod          │     │ └─────────────┘ │     │ 2 Medium        │
│ Cargo.toml      │     │ ┌─────────────┐ │     │                 │
│ ...             │     │ │ Google OSV  │ │     │ + Fix Commands  │
│                 │     │ └─────────────┘ │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 4.1 Multi-Source Intelligence

| Source | Strength |
|--------|----------|
| **Google OSV** | High precision, ecosystem-aware queries, faster updates |
| **NVD** | Broader coverage, detailed CVSS scores, comprehensive CVE data |

### 4.2 Detection Comparison

| Method | CVEs Detected | False Positives | Assessment |
|--------|---------------|-----------------|------------|
| OSV Only | 19 | 0 | Limited coverage |
| NVD Only | 115 | 98+ | Many false positives |
| **cveSentinel** | **38** | **0** | Best of both worlds |

---

## 5. Technology Stack

| Component | Technology |
|-----------|-----------|
| Language | Python 3.9+ |
| APIs | NVD API 2.0, Google OSV |
| HTTP Client | requests |
| Configuration | PyYAML |
| Build System | Hatchling |
| Testing | pytest |
| CI/CD | GitHub Actions |
| Coverage | codecov |

---

## 6. Key Deliverables

| Deliverable | Description | Status |
|-------------|-------------|--------|
| CLI Tool | `cve-sentinel scan` command | Complete |
| PyPI Package | `pip install cve-sentinel` | Published |
| Multi-language Support | 7+ languages | Complete |
| False Positive Filtering | CPE-based validation | Complete |
| Claude Code Hook | SessionStart integration | Complete |

---

## 7. Supported Languages

| Language | Package Managers | Files Analyzed |
|:--------:|:-----------------|:---------------|
| **JavaScript** | npm, yarn, pnpm | `package.json`, `package-lock.json`, `yarn.lock` |
| **Python** | pip, poetry, pipenv | `requirements.txt`, `pyproject.toml`, `Pipfile` |
| **Go** | go mod | `go.mod`, `go.sum` |
| **Java** | Maven, Gradle | `pom.xml`, `build.gradle` |
| **Ruby** | Bundler | `Gemfile`, `Gemfile.lock` |
| **Rust** | Cargo | `Cargo.toml`, `Cargo.lock` |
| **PHP** | Composer | `composer.json`, `composer.lock` |

---

## 8. Analysis Levels

| Level | What It Scans | Best For |
|:-----:|:--------------|:---------|
| **1** | Manifest files only | Quick CI checks |
| **2** | + Lock files (transitive deps) | Regular development (default) |
| **3** | + Source code imports | Pre-release audits |

---

## 9. False Positive Filtering

### Filtering Mechanisms

| Mechanism | Description |
|-----------|-------------|
| **CPE Matching** | Validates vendor/product names against known mappings |
| **Hardware Exclusion** | Blocks 20+ hardware vendors (Intel, Broadcom, etc.) |
| **Confidence Scoring** | HIGH / MEDIUM / LOW ratings for each match |
| **Version Validation** | Checks if your version is actually affected |

### Example Filtered Results

| Package | False Match | Reason | Result |
|---------|-------------|--------|--------|
| `cypress` | Cypress Semiconductor chips | Hardware vendor | Filtered |
| `vite` | VITEC video encoders | Different product | Filtered |
| `express` | ExpressVPN | Different product | Filtered |

---

## 10. Claude Code Integration

### Hook Configuration

```json
{
  "hooks": {
    "sessionStart": [
      {
        "name": "cve-sentinel",
        "command": "~/.claude/hooks/cve-sentinel-scan.sh",
        "args": ["${projectPath}"],
        "enabled": true
      }
    ]
  }
}
```

### Workflow

1. **Session Start** - Hook triggers automatically
2. **Background Scan** - Dependencies scanned without blocking
3. **Results Available** - Check `.cve-sentinel/results.json`
4. **Claude Assistance** - Ask Claude to review and implement fixes

---

## 11. Current Status & Roadmap

### Current Status: Beta v0.2.0

| Milestone | Status |
|-----------|--------|
| Core scanning engine | Complete |
| NVD + OSV integration | Complete |
| False positive filtering | Complete |
| PyPI publication | Complete |
| GitHub Actions CI | Complete |

### Metrics

- PyPI package: `cve-sentinel`
- CI/CD: GitHub Actions
- Coverage tracking: codecov

---

## 12. Configuration

```yaml
# .cve-sentinel.yaml
analysis_level: 2
exclude:
  - node_modules/
  - vendor/
  - .venv/
cache_ttl_hours: 24
auto_scan_on_startup: true
datasources:
  osv_enabled: true
  nvd_enabled: true
  nvd_min_confidence: medium
  prefer_osv: true
```
