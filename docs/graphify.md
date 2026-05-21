# Multiversa Lab — Knowledge Layer: Graphify

**Graphify** is the semantic indexing engine of Multiversa Lab. It ingests whole directories, codebase dependencies, SQL schemas, media files, and documentation, transforming them into a structured, queryable knowledge graph.

---

## The Navigation Problem

Grep searches and file listing are linear. They fail to convey relationships, import hierarchies, and architecture flow. 

Graphify solves this by building a graph of nodes (files, functions, classes, tables) and edges (imports, calls, queries, relations) that your AI agent can navigate.

---

## Core Capabilities

- **Multi-Format Processing:** Parses typescript, python, rust, SQL schemas, Markdown files, PDFs, and media metadata.
- **Local & Lightweight:** Runs entirely locally, saving a portable `graph.json` file in `graphify-out/`.
- **Interactive Visualization:** Compiles an interactive HTML visualizer (`graph.html`) to display the codebase graph.
- **Git Friendly:** Includes a custom git merge driver so team members can commit their project graphs without conflicts.

```
[File: index.ts] -- (imports) --> [File: db.ts] -- (queries) --> [Table: users]
```

---

## Quick Start & Usage

Inside any workspace, run Graphify via the CLI or your AI agent:

```bash
# Initialize and index the current directory
graphify .
```

### Outputs Generated in `graphify-out/`:
1. `graph.json`: The raw node-edge map.
2. `graph.html`: Interactive dependency and visual structure board.
3. `GRAPH_REPORT.md`: Comprehensive text summary explaining entry points, database models, and hotspots.

By committing `graphify-out/` to git, your AI agents gain instant codebase awareness on checkout.
