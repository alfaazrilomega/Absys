---
description: Figma MCP Integration — Design-to-Code Workflow for Antigravity
---

# Figma MCP Skill — Antigravity Integration Guide

This skill teaches you how to effectively use the **Figma MCP** integration within Antigravity to translate designs into production code. This is the definitive guide for getting the most from the 6 available Figma tools.

---

## 🔧 Setup Checklist

Before using any Figma MCP tool, verify the following:

- [ ] Figma desktop app is **open**
- [ ] Local MCP server is **running** in Figma (Settings → Dev Resources → Local MCP Server)
- [ ] Your `mcp_config.json` uses `mcp-remote` pointing to `http://127.0.0.1:3845/mcp`
- [ ] Antigravity shows the Figma MCP server as **connected**

---

## 🛠️ The 6 Figma MCP Tools — When & How to Use Them

### 1. `get_design_context` ⭐ PRIMARY TOOL

**The most important tool. Always start here.**

Use this when you want to implement a design into code. It returns:

- Reference code snippet
- A screenshot of the node
- Spacing, colors, and font metadata

**Best Practices:**

- Always run `get_design_context` first before any other tool
- Select the exact node/frame in Figma before calling (or pass the `node-id` from the URL)
- Ask the AI to **adapt** the output to your project's stack (e.g., "translate this to Tailwind + React")
- Do NOT copy the reference code verbatim — treat it as a blueprint

**Power Prompt:**

```
Use get_design_context on the currently selected node, then implement it using our project's design tokens, component patterns, and folder structure. Do not use hardcoded values.
```

---

### 2. `get_variable_defs` — Extract Design Tokens

**Use this when you need design tokens (colors, spacing, typography).**

Extracts all Figma variable definitions (design tokens) for a node. Ideal for:

- Generating CSS variables or Tailwind config from Figma variables
- Syncing your design system with code
- Understanding which variables a component uses

**Power Prompt:**

```
Call get_variable_defs on the [component name] node and map the results to our existing CSS variables in globals.css. Highlight any missing tokens.
```

---

### 3. `get_screenshot` — Visual Reference

**Use when you need a visual confirmation of what a node looks like.**

Best used for:

- Verifying the correct node is selected before generating code
- Comparing your implementation visually
- Documentation and walkthroughs

**Best Practice:** Always use `get_screenshot` after implementing code to visually compare output.

---

### 4. `get_metadata` — Explore File Structure

**Use to explore a Figma file's layer tree before diving into a node.**

Returns an XML overview with node IDs, types, names, positions, and sizes.

Use this when:

- You don't know the node ID you need
- You want to understand the overall page structure
- You're building a multi-section page and need all node IDs at once

**Workflow:**

```
1. get_metadata (page level) → discover node IDs
2. get_design_context (specific node) → get code
```

**Power Prompt:**

```
Call get_metadata on the current page to list all frames and their node IDs. Then call get_design_context on the 'Hero' frame.
```

---

### 5. `create_design_system_rules` — Scaffold Design System

**Use at the START of a new project to generate design system rules.**

This generates AI-friendly rules for your design system, including:

- Typography scale
- Color palette and usage rules
- Component naming conventions
- Spacing system

**Best Practice:** Run this once per project and store the output in your project's `SKILL.md` or `design-system.md` file.

**Power Prompt:**

```
Use create_design_system_rules and then save the output into our project's design-system.md file.
```

---

### 6. `get_figjam` — FigJam Boards Only

**Only for FigJam files (whiteboards, flows, diagrams).**

Generates UI code from FigJam boards. Use for:

- User flows → routing logic
- Architecture diagrams → folder structure
- Wireframes → basic layout scaffolding

> ⚠️ **Important:** This tool ONLY works with FigJam files, not regular Figma design files.

---

## 🚀 Viral Workflows (Proven Patterns)

### Workflow 1: Zero-to-Code (Fastest)

```
1. Select a frame in Figma
2. Ask: "Use get_design_context and implement this as a React component using our design system."
3. Review screenshot vs. implementation
4. Iterate
```

### Workflow 2: Full Page Implementation

```
1. get_metadata → map all sections (Hero, About, Features, Footer)
2. For each section: get_design_context → implement component
3. get_variable_defs → sync design tokens
4. Compose all components in the page file
```

### Workflow 3: Design System Sync

```
1. create_design_system_rules → generate baseline rules
2. get_variable_defs on key components → extract all tokens
3. Map tokens to Tailwind config / CSS variables
4. Document in design-system.md
```

### Workflow 4: Pixel-Perfect Review

```
1. Implement component
2. get_screenshot → capture Figma reference
3. Open browser side-by-side
4. Identify and fix visual discrepancies
```

---

## 📐 Figma File Preparation Tips (From Viral Tutorials)

For the best MCP code output, prepare your Figma file well:

1. **Name every layer** — AI reads layer names to understand intent
2. **Use Auto Layout everywhere** — AI outputs better flex/grid code
3. **Use Figma Variables** — These map directly to design tokens
4. **Avoid raster images in layouts** — Use frames with fills instead
5. **Group logically** — Match your component architecture in Figma
6. **Use Figma Components** — They translate to reusable UI components
7. **Annotate with Dev Mode** — Add notes for complex interactions

---

## 💡 Pro Tips

- **Node IDs from URLs:** If you have a Figma URL like `?node-id=1234-5678`, pass `1234:5678` to any tool
- **Always prefer `get_design_context`** over `get_metadata` — it gives far richer context
- **Batch small components:** Ask the AI to implement multiple small components in one go: "Implement the Button, Input, and Card components from these three Figma nodes."
- **Local server stays up:** The local MCP server may stop when Figma is closed. If tools stop working, reopen Figma and enable the server again
- **Screenshot as spec:** `get_screenshot` can be passed to `generate_image` or used as a reference for manual review
- **Use `node-id` not URLs:** Pass the node ID directly (e.g., `1234:5678`) instead of full URLs for faster lookups

---

## ⚡ Quick Reference: Tool Cheat Sheet

| Goal                            | Tool                         |
| ------------------------------- | ---------------------------- |
| Implement a design into code    | `get_design_context`         |
| Extract colors, spacing, tokens | `get_variable_defs`          |
| See what a node looks like      | `get_screenshot`             |
| Find node IDs in a file         | `get_metadata`               |
| Generate design system rules    | `create_design_system_rules` |
| Generate code from FigJam flows | `get_figjam`                 |

---

## 🔗 Antigravity-Specific Notes

- The Figma MCP server runs locally at `http://127.0.0.1:3845/mcp` (provided by the Figma desktop app)
- It is bridged to Antigravity via `mcp-remote` in `mcp_config.json`
- The server requires the **Figma desktop app** to be open with Dev Mode enabled
- If the connection drops, simply reopen Figma and ensure the local MCP server is active in Dev settings
