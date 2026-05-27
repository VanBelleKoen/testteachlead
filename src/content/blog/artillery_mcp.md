---
title: "Artillery + MCP Server: Better Daily Flow with AI Workflows"
description: "How to use Artillery through an MCP server to improve performance testing habits and enable AI-assisted execution."
pubDate: "2026-04-27"
---

# Artillery + MCP Server

When you need modern, open-source, quick and clean load testing, Artillery is already a solid answer.

Now add MCP to that equation, specifically an MCP server that keeps performance testing close to day-to-day development while fitting naturally into AI-assisted workflows.

The [artillery-mcp-server](https://github.com/jch1887/artillery-mcp-server) lets MCP-compatible clients run Artillery safely through dedicated tools. It is designed so an AI client can reliably discover capabilities, invoke the right test action, and return structured output without improvising brittle shell scripts. Meaning: less command shuffling, more testing.

Or in less polite terms: fewer excuses to skip performance checks.

>"Without data, you're just another person with an opinion." - W. Edwards Deming

## Prerequisites

You need Node.js 18 or newer, an installed Artillery CLI available in your PATH, and an MCP-compatible client. That is enough to get started without building a giant test harness first. As always when working with node, double check everything.

Install Artillery:

```bash
npm install -g artillery
```

Install the MCP server:

```bash
npm install -g @jch1887/artillery-mcp-server
```

Or run it straight with npx:

```bash
npx @jch1887/artillery-mcp-server
```

## Why this setup works

Artillery has always been good at one thing: expressing realistic load behavior in a way humans can still read. MCP solves a different problem. It gives your tooling a clear interface so clients can call tested capabilities instead of improvising shell commands.

Put together, the process becomes boring in a good way. Running a smoke test before a merge, storing a baseline after a stable release, and comparing runs after changes stops being a special ceremony. It becomes routine, and routine is exactly what performance testing needs.

## Designed for AI workflow first

This is the key point: the server is not just "Artillery, but remote." It is shaped for agent-driven execution. The tools have explicit inputs, predictable outputs, and safety controls around paths, execution time, and output volume. That matters because agents work best when actions are structured and bounded.

In practice, an AI client can inspect capabilities, pick the right tool, run a smoke test or baseline, parse the result, and even compare runs for regressions, all inside one conversational flow. Instead of jumping between docs, terminal history, and custom scripts, your performance checks live inside a repeatable AI-assisted loop.

## Configure once, run often

Set a few environment variables and you have sane guardrails from day one:

```bash
export ARTILLERY_WORKDIR="/path/to/test/configs"
export ARTILLERY_TIMEOUT_MS=900000
export ARTILLERY_MAX_OUTPUT_MB=50
export ARTILLERY_ALLOW_QUICK=true
```

These controls matter. They keep runs bounded and reduce the chance of a runaway test chewing through your machine or your pipeline logs.

The practical part is not the variable names, it is the behavior they enforce. A constrained work directory keeps test files predictable. A timeout keeps hung runs from becoming background ghosts. Output limits protect your logs from turning into unreadable noise. Small controls, big quality-of-life improvement.

## What you can do with the server

This is not a thin wrapper around one command. The server can run tests from files when you already have proper scenarios, and it can run inline when you want to iterate quickly. It can launch quick HTTP checks for simple endpoint verification, then parse result JSON into summaries you can actually discuss with a team.

Where it gets interesting is continuity. You can save named configurations, run presets like smoke or soak without reauthoring YAML every time, and compare current results against baselines to flag regressions before users feel them. In other words, it supports the whole arc from "let me quickly check this" to "we have a stable performance gate."

## Where to start

Start with one endpoint that actually matters, run a smoke preset, and make sure basic behavior under light load is sane. Once that is stable, save a baseline configuration and stop treating each run like a one-off experiment. After a meaningful change, run the same baseline again and compare outcomes against explicit thresholds.

That tiny loop is enough to catch obvious regressions without pretending you need a full-blown performance program in week one.

## Example: preset smoke test

```json
{
  "target": "https://api.example.com",
  "preset": "smoke"
}
```

Small, fast, useful.

This kind of run is perfect for early pipeline integration, because it gives a quick signal and fails fast when something is badly wrong.

## Example: baseline comparison

```json
{
  "baselinePath": "./results/baseline.json",
  "currentPath": "./results/current.json",
  "thresholds": {
    "maxLatencyIncrease": 0.2,
    "maxErrorRateIncrease": 0.01,
    "minThroughputRatio": 0.9
  }
}
```

Once this exists, performance becomes a decision checkpoint instead of a vague feeling.

That is the actual win. Teams do not need more dashboards. They need simple, repeatable decisions. Is this change acceptable under expected load, yes or no?

## Where this helps in delivery

In day-to-day development, this setup gives you a practical middle ground between doing nothing and overengineering. You can run quick checks in pull requests, keep a baseline around before releases, and run comparison checks when risk is higher. Not perfect scientific certainty. Better decisions, earlier.

## Reality check

MCP integration helps with execution speed and consistency.

It does not replace test design.

If the scenario is weak, your numbers are still weak. If your environment is noisy, your conclusions are noisy.

Same old truth applies: garbage in, garbage out.

So keep scenarios representative, keep your target environment stable enough to compare runs, and document your thresholds like you mean them.

## Closing

Artillery was already quick to adopt.

Using it through an MCP server makes it easier to keep performance testing close to daily development flow while also fitting naturally into AI-assisted workflows.

If your team wants better day-to-day performance habits and a cleaner AI execution loop, this is one of the easier wins to adopt early.

## Links

If you want to dig deeper, start with the [Artillery MCP Server](https://github.com/jch1887/artillery-mcp-server), cross-check with [Artillery documentation](https://www.artillery.io/docs), and keep the [Model Context Protocol](https://modelcontextprotocol.io/) reference nearby while wiring your client.
