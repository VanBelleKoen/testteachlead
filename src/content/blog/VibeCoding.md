---
title: "Vibe Coding: An AI Skeptic's Guide to Productive Ideation"
description: "How to use AI for brainstorming, pattern discovery, and ideation without relying on generated code."
pubDate: "2025-07-31"
---

As someone who maintains a healthy skepticism about AI's role in software development, I've discovered an unexpected sweet spot in what I call "vibe coding" – using AI not as a replacement for thinking, but as a catalyst for it.

## What Is Vibe Coding?

Vibe coding isn't about getting production-ready code from AI. It's about using AI as an ideation partner to explore problem spaces, generate architectural approaches, and surface solutions you might not have considered. The key insight? You're not looking for code to ship – you're looking for ideas to steal.

Think of it like brainstorming with a colleague who has read every programming tutorial ever written but has never actually shipped software. They'll suggest approaches ranging from brilliant to bizarre, and your job is to sort through the noise to find the signal.

## The Skeptic's Dilemma

Here's my fundamental tension with AI coding tools: they're simultaneously impressive and unreliable. They can generate syntactically correct code that solves complex problems, but they also hallucinate APIs, make subtle logical errors, and confidently suggest approaches that will break in production.

This unreliability makes them poor choices for direct code generation in anything beyond trivial scripts. But it makes them surprisingly effective for something else entirely: pattern recognition and solution space exploration.

## Why Vibe Coding Works

### 1. **Breaking Mental Blocks**

We all get stuck in our usual patterns. When facing a complex problem, we tend to reach for familiar tools and approaches. AI doesn't have this limitation – it can suggest using a state machine for UI logic, propose event sourcing for a simple CRUD app, or recommend functional programming patterns in places you'd never consider them.

Most of these suggestions will be wrong for your specific context. But one might be exactly the nudge you need to see your problem from a new angle.

### 2. **Rapid Prototyping of Ideas**

Want to explore how dependency injection might work in your codebase? Ask AI to sketch out the structure. Curious about implementing a command pattern? Get a quick example to evaluate. The code will likely be flawed, but it gives you something concrete to reason about.

This is faster than diving into documentation or trying to implement from scratch, and it's particularly valuable when you're evaluating multiple approaches.

### 3. **Exposing Hidden Assumptions**

AI often makes different assumptions than you would. When it suggests an approach that seems obviously wrong, that moment of "why would you do it that way?" can reveal assumptions you didn't realize you were making.

Maybe the AI suggests storing configuration in a database when you assumed it would be in files. Maybe it proposes a different data structure than what seems "obvious." These moments force you to articulate why your approach is better – and sometimes you discover it isn't.

## The Vibe Coding Process

Here's how I typically approach vibe coding:

1. **Frame the Problem**: Describe what you're trying to solve, including constraints and context
2. **Generate Options**: Ask for multiple approaches, architectural patterns, or implementation strategies
3. **Evaluate and Critique**: Look for interesting ideas while identifying what won't work
4. **Iterate on Concepts**: Drill down into promising approaches with follow-up questions
5. **Implement Yourself**: Take the best ideas and write the actual code

The key is maintaining that separation between ideation and implementation. You're mining for concepts, not copying code.

## Practical Examples

### Architecture Exploration
Instead of asking "write a REST API," try "what are five different ways to structure a REST API for a multi-tenant application, and what are the tradeoffs of each approach?"

### Algorithm Brainstorming
Rather than "implement a search function," ask "what are different strategies for implementing fuzzy search in a web application, considering both performance and user experience?"

### Pattern Discovery
Instead of "fix this code," try "what design patterns could help organize this complex conditional logic, and when would you use each one?"

## The Limitations

Vibe coding isn't magic. AI suggestions often:
- Ignore important constraints from your specific domain
- Propose solutions that don't scale
- Mix incompatible concepts from different paradigms
- Suggest overly complex solutions to simple problems

This is why the "throw away the code" mindset is crucial. You're not looking for working solutions – you're looking for starting points for your own thinking.

## A Balanced Approach

As an AI skeptic, I believe the technology is overhyped and often misapplied. But vibe coding represents a more honest relationship with AI's current capabilities. It acknowledges that AI is better at generating ideas than generating production code, and it keeps humans firmly in the driver's seat for actual implementation.

The result is a workflow that leverages AI's extent of pattern recognition while maintaining the critical thinking, domain expertise, and quality standards that only human developers can provide.

## Getting Started

If you want to try vibe coding, start small. Pick a problem you're already familiar with and ask AI to suggest alternative approaches. Compare its suggestions to what you would normally do. Look for patterns in what it suggests that you might not have considered.

Remember: the goal isn't to find the perfect solution from AI. It's to expand your solution space and challenge your assumptions. Sometimes the best idea comes not from what the AI suggests, but from what it makes you realize you want to do differently.

## Conclusion

Vibe coding won't replace good engineering practices, domain expertise, or careful implementation. But it can be a valuable addition to your problem-solving toolkit – a way to break out of routine thinking and explore new possibilities.

In a field where we're constantly solving similar problems in slightly different contexts, having a tool that can suggest alternative approaches is genuinely useful. Just remember to keep your skepticism sharp and your implementation standards high.

The code you throw away might be worthless, but the ideas you keep could be invaluable.