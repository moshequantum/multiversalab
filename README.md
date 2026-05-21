# Multiversa Lab — Engine Room (◎ ⬡ ✦)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PNPM Workspace](https://img.shields.io/badge/node-pnpm-blue.svg)](#)
[![BaaS: InsForge](https://img.shields.io/badge/backend-InsForge-brightgreen.svg)](https://insforge.app)

Welcome to the technical foundation of **Multiversa Lab**. This repository houses the open-source logic, AI agent harnesses, and local development configurations that run the Intelligent Personal OS.

---

## 🌐 Lab vs Group: Integrity Separation

To protect intellectual property and maintain strict security boundaries, the Multiversa ecosystem is separated into two entities:

*   **Multiversa Lab (This Repository):** The open-source R&D laboratory. Where we design, experiment, and release core software agents, plugins, and architectures (MIT licensed).
*   **Multiversa Group:** The commercial consulting and delivery entity. Delivers custom, private integrations for enterprise customers under strict NDAs.

---

## 🏗 Core Architecture: The Six Pillars

Multiversa Lab is built around **six core architectural layers**, running from persistent memory up to multi-agent swarm simulations:

```
┌────────────────────────────────────────────────────────┐
│  Layer 05: SIMULATION (MiroFish Scenario Simulator)     │
├────────────────────────────────────────────────────────┤
│  Layer 04: PERSONAL (GentlePI Agent Persona)           │
├────────────────────────────────────────────────────────┤
│  Layer 03: DISCIPLINE (GentleAI SDD Harness)           │
├────────────────────────────────────────────────────────┤
│  Layer 02: KNOWLEDGE (Graphify Semantic Map)           │
├────────────────────────────────────────────────────────┤
│  Layer 01: MEMORY (Engram SQLite Context Spine)       │
├────────────────────────────────────────────────────────┤
│  Layer 06: INFRASTRUCTURE (InsForge Cloud Sync BaaS)   │
└────────────────────────────────────────────────────────┘
```

1.  **[Engram](./docs/engram.md) (Memory):** A local SQLite database + FTS5 full-text search indexing architectural decisions to combat agent session amnesia.
2.  **[Graphify](./docs/graphify.md) (Knowledge):** Codebase ingestor mapping files, databases, and dependencies into an interactive visual graph.
3.  **[GentleAI](./docs/gentle.md) (Discipline):** Spec-Driven Development (SDD) pipeline enforcing Research ➔ Specification ➔ Execution phases.
4.  **[GentlePI](./docs/gentle.md) (Personal):** Standard agent configuration infusing human-like tone, style, and rules.
5.  **[MiroFish](./docs/mirofish.md) (Simulation):** Swarm intelligence powered by OASIS and Neo4j to test scenarios before deployment.
6.  **[InsForge](./docs/insforge.md) (Infrastructure):** Unified cloud backend providing database tables, storage buckets, and LLM gateways.

---

## 🧩 The Triad Protocol (◎ ⬡ ✦)

Agent operations are split into three specialized subagents to optimize token costs and enhance clarity:
*   **◎ Orchestrator (AsturSadeth):** Handles planning, decision logic, and routing.
*   **⬡ System (Aureon):** Executes commands, builds codebases, and writes files.
*   **✦ Interface (Runa):** Renders views, captures feedback, and prompts the user.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js**, **pnpm**, **Python 3**, and **uv** installed.

### Onboarding

Initialize the local directory structure and configuration under `~/.multiversa`:

```bash
chmod +x multiversa-installer.sh
./multiversa-installer.sh
```

### Developing the SvelteKit Frontend

To launch the local dashboard and waitlist landing page:

```bash
# Install dependencies across the workspace
pnpm install

# Run local dev server
pnpm dev

# Build for production
pnpm build
```

---

## 📚 Technical Documentation

Explore the detailed architecture guides in the [`docs/`](./docs) directory:
*   [Core Architecture & Triad Protocol](./docs/architecture.md)
*   [Engram (Local Memory Layer)](./docs/engram.md)
*   [Graphify (Knowledge Graph Mapping)](./docs/graphify.md)
*   [Gentle AI / GentlePI (Spec-Driven Development)](./docs/gentle.md)
*   [MiroFish (Agent Scenario Swarm)](./docs/mirofish.md)
*   [InsForge (BaaS cloud integration)](./docs/insforge.md)

---

## 🤝 Contributing & Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
