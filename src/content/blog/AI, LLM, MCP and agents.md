---
title: "AI, LLM, MCP and agents"
description: "The real difference between LLMs, MCP, and agentic applications."
pubDate: "2026-05-27"
---

# The Real Difference Between LLMs, MCP, and Agentic Applications

If you’ve been anywhere near tech circles recently, you’ve probably heard people confidently mixing up terms like LLM, MCP, and agent. Sometimes you see all three in the same sentence, as if they’re interchangeable components of a single magical AI super-brain.
They aren’t.
Not even close.

Once you understand what each of these layers actually does, the whole ecosystem becomes far less mysterious, far less magical, and—ironically—far more useful. You also stop expecting AI to behave like a digital intern with ambitions. Spoiler: it has none.

## LLMs: Impressive, Useful, and Completely Goalless

At the foundation sits the Large Language Model. An LLM doesn’t think, understand, or plan. There’s no tiny consciousness inside it debating philosophy or plotting world domination. It simply predicts the next token. That’s the whole trick. It predicts words the same way weather apps predict rain—sometimes accurately, sometimes absolutely not, and sometimes with the confidence of a golden retriever wearing a lab coat.

Ask it to generate Cypress tests and it will give you something that looks like Cypress tests because that’s statistically what usually follows the patterns in your prompt. But ask it to *update* your actual test suite, run the code, fix the flaky ones, and push a commit? It won’t even attempt it unless you explicitly tell it every step. It’s reactive, not proactive.
Think of it as autocomplete on steriods.

## MCP: Giving the Model a Doorway Into Your Tools

As soon as you want an LLM to do anything beyond producing text, you run into reality. You want it to read files, touch code, call APIs, maybe even run commands. Historically, people solved this by duct-taping prompts together and hoping for the best—a strategy about as stable as writing your test automation strategy on a post-it note and giving it to the wind.

The Model Context Protocol is a response to that chaos. MCP defines a structured way for the model to interact with tools: file systems, command runners, databases, APIs, whatever you expose. Instead of telling the model “open the code” and praying it guesses correctly, MCP gives it an actual, defined interface. If it needs to open a repository file, it does so through a proper tool rather than hallucinating a filesystem into existence.

But MCP doesn’t create any form of agency. It’s just a plumbing system. A very elegant plumbing system, yes, but still plumbing. You provide the tools, you define the boundaries, and the model uses them when asked. Without instructions, it does nothing—much like a teenager told to clean their room.

## Agentic Applications: Where Behaviour Actually Comes From

The moment you hear someone say “the model decided to…” you know something has gone wrong. LLMs don’t decide anything. Agentic applications do.

An agentic application wraps around an LLM and introduces structure: tasks, goals, plans, execution loops, evaluation steps, and retries. The LLM provides the reasoning inside each step, but the actual behaviour—the part that looks autonomous—comes from the agent framework you write.

Imagine telling an agent:
“Go improve the reliability of our flaky end-to-end tests.”

A well-designed agent will read the test suite, analyse patterns, draft a plan, apply changes, run the test suite, evaluate what happened, and repeat until the goal is reached. All of that behaviour comes from the agent system, not the LLM. The LLM is just the pattern matching engine the agent consults along the way.

Or think about a DevSecOps agent that continuously scans your dependencies. It checks for vulnerabilities, drafts version upgrades, updates manifests, opens pull requests, and notifies your team. Again, the LLM predicts text inside those tasks, but the logic and initiative come from the application layer.
The agent is the driver.
The LLM is the navigation system.
And MCP is the steering wheel and pedals that make the whole thing move.

Just don’t confuse the navigation system with an actual driver. Otherwise you end up anthropomorphising your tools, and we don’t want that. Nobody needs a world where people thank their LLM for “being there for them.” It’s a model. It doesn’t know you exist.

## Seeing the Three Layers Clearly

When you strip away the hype, the differences fall into place.
LLMs generate text based on statistical patterns.
MCP connects that text generator to real tools in a controlled and predictable way.
Agentic applications provide the goals, the structure, and the behaviour that makes the entire system useful.

Once you understand this separation, building AI systems becomes much more grounded. You can appreciate what these tools are good at while still recognising their limitations. And most importantly, you avoid the trap of treating statistical models as intelligent beings with intentions.

They’re just tools. Very capable tools, yes, but still tools.
The rest is engineering.
