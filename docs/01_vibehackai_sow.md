# Statement of Work: VibeHackAI

**Project Name:** VibeHackAI
**Version:** 2.0 (Beta)
**Repository:** https://github.com/cawa102/VibeHackAI
**License:** MIT

---

## 1. Executive Summary

VibeHackAI is an AI-assisted penetration testing framework that leverages Claude Code's agent capabilities and MCP (Model Context Protocol). The system enables coordinated security assessments through four specialized agents operating under human supervision.

---

## 2. Project Objectives

| Objective | Description |
|-----------|-------------|
| **Primary** | Provide AI-augmented penetration testing with human control |
| **Safety** | Ensure scope compliance and prevent unauthorized access |
| **Reproducibility** | Maintain evidence integrity with SHA-256 verification |
| **Efficiency** | Automate reconnaissance and enumeration phases |

---

## 3. Scope of Work

### 3.1 In Scope
- Passive/active information gathering (OSINT, Nmap, Shodan)
- Service enumeration and vulnerability candidate identification
- CVE research and attack planning
- Exploit execution with human approval
- Evidence collection and report generation

### 3.2 Out of Scope
- Fully autonomous attack execution
- DoS attacks or data exfiltration
- Unauthorized target scanning

---

## 4. Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Human Interface                        │
│           (Approval, Interaction, Oversight)             │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Orchestrator Agent                      │
│               (Control Plane - Writer)                   │
│     ┌─────────────┬─────────────┬─────────────┐         │
│     │    State    │  Approval   │    Agent    │         │
│     │  Management │    Gates    │   Routing   │         │
│     └─────────────┴─────────────┴─────────────┘         │
└────────────────────────┬────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
┌───▼───┐         ┌──────▼──────┐      ┌──────▼──────┐
│Recon  │         │ Enumeration │      │Exploitation │
│Agent  │         │    Agent    │      │   Agent     │
└───────┘         └─────────────┘      └─────────────┘
```

### 4.1 Agent Configuration

| Agent | Role | Capabilities |
|-------|------|--------------|
| **Orchestrator** | Control plane | Phase transitions, approval gates, state management |
| **Planner** | Strategy | CVE research, attack planning, CVSS evaluation |
| **Reconnaissance** | Discovery | OSINT, Nmap, Shodan, DNS enumeration |
| **Enumeration** | Analysis | Service enumeration, entry point identification |
| **Exploitation** | Execution | PoC execution, Metasploit integration |

---

## 5. Technology Stack

| Component | Technology |
|-----------|-----------|
| Language | Python 3.10+ |
| AI Integration | Claude Code, MCP |
| External Tools | hexstrike-ai MCP Server |
| Data Validation | Pydantic |
| Testing | pytest |
| Containerization | Docker |

---

## 6. Key Deliverables

| Deliverable | Description | Status |
|-------------|-------------|--------|
| 5 Agent Definitions | Orchestrator, Planner, Recon, Enum, Exploit | Complete |
| Shared Workspace | State store, evidence store, cache | Complete |
| Documentation | CLAUDE.md, spec docs, agent specs | Complete |
| Evidence Management | Append-only store with SHA-256 | Complete |
| Web UI Dashboard | Visual interface | Planned |

---

## 7. Safety Features

| Feature | Implementation |
|---------|----------------|
| **Scope Enforcement** | All operations tagged with scope_tag |
| **Approval Gates** | Human approval required for dangerous operations |
| **Evidence Integrity** | SHA-256 hash verification |
| **Auto-Stop** | Halt on consecutive errors or DoS indicators |

---

## 8. Workspace Structure

```
/workspace/sessions/<session_id>/
├── state/           # Normalized state (Orchestrator write-only)
│   ├── scope.json
│   ├── target_profile.json
│   ├── candidates_vuln.json
│   ├── findings.json
│   └── state_version.json
├── evidence/        # Raw data (append-only, sha256 verified)
│   └── <evidence_id>/
│       ├── raw.<ext>
│       └── meta.json
├── cache/           # Query result cache
└── reports/         # Final deliverables
```

---

## 9. Current Status & Roadmap

### Current Status: Beta v2.0

| Milestone | Status |
|-----------|--------|
| Core agent framework | Complete |
| MCP integration | Complete |
| Evidence management | Complete |
| Human approval flow | Complete |

### Roadmap

- [ ] Web UI Dashboard
- [ ] Multi-target parallel scanning
- [ ] Custom plugin system
- [ ] Report template customization
- [ ] Integration with more MCP servers

---

## 10. Dependencies

| Dependency | Purpose | Required |
|------------|---------|----------|
| Claude Code CLI | AI agent runtime | Yes |
| Docker | Containerized execution | Yes |
| Python 3.10+ | Language runtime | Yes |
| hexstrike-ai MCP | Penetration testing tools | Yes |
