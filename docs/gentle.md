# Multiversa Lab — Operational Layer: Gentle AI & GentlePI

**Gentle AI** (and its Pi-agent native harness **GentlePI**) is the operational harness of Multiversa Lab. It enforces disciplined development pipelines through Spec-Driven Development (SDD) and structured agent personas.

---

## Spec-Driven Development (SDD)

AI coding agents are fast, but they often rush to write code before fully understanding the requirements. This leads to code drift, regression, and messy refactors.

SDD enforces a strict three-phase pipeline:

```
[Phase 1: Research] ──> [Phase 2: Plan] ──> [Phase 3: Execute & Verify]
```

1. **Research Phase:** Analyze the codebase, dependencies, and requirements. No code editing allowed.
2. **Planning Phase (Specification):** Create an implementation plan (`implementation_plan.md`) describing exactly what files will be changed or created, and the verification plan. **Wait for human approval.**
3. **Execution & Verification Phase:** Once approved, compile a tracking task list (`task.md`) and execute the changes. Finally, run tests and create a code walkthrough (`walkthrough.md`).

---

## Agent Personas: `el_gentleman`

Gentle AI configures agents with a **senior-architect-level persona**:
- **Teaching-Oriented:** Explains architectural trade-offs, does not just write code silently.
- **Security-First:** Never leaves private files exposed, sanitizes inputs, audits security rules.
- **Verification-Obsessed:** Validates that changes are working using unit tests and dev builds.

---

## GentlePI: Agent Harness

For Pi-native agents, the `gentle-pi` package provides commands directly in the agent shell:

```bash
# Install gentle-pi inside your project (Multiversa policy: pnpm-only)
pi install pnpm:gentle-pi   # if your Pi runtime supports the pnpm: namespace

# Initialize SDD specifications
/sdd-init

# Switch agent modes
/gentle:persona el_gentleman
```

This enforces that the agent works within a bounded phase DAG and preserves files in `openspec/` directories.
