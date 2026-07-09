---
title: Cypress Positional
description: A Cypress plugin that adds chainable position assertions like isLeftOf, isRightOf, isAbove, and isBelow for layout-sensitive UI testing.
tags:
  - Testing Utility
  - Cypress
  - UI Testing
  - Open Source
---

# Cypress Positional

Cypress Positional is a personal open source plugin for asserting spatial relationships between UI elements in Cypress tests. It focuses on the class of bugs where elements still exist and are visible, but appear in the wrong place.

Rather than relying on ad hoc geometry helpers in test files, the plugin exposes readable assertions for common layout expectations.

## Why I Built It

In practice, visual and layout regressions can pass standard functional assertions while still creating a broken user experience. I built this project to experiment with better ways of validating positional expectations in Cypress and to reduce brittle ad-hoc test code.

It started as a targeted utility and evolved into a reusable approach I could share with others facing the same challenge.

## What It Offers

- Chainable positional commands: `isLeftOf`, `isRightOf`, `isAbove`, `isBelow`
- Straightforward setup through `cypressPositional(on, config)` and `registerCommands()`
- A layout-testing workflow that reads clearly in test specs
- TypeScript support with custom command typings
- Debug-friendly logging through plugin tasks (including `cy.task('log', ...)`)

## How It Works

Under the hood, the assertions compare element coordinates from `getBoundingClientRect()`:

- `isLeftOf`: source right edge <= target left edge
- `isRightOf`: source left edge >= target right edge
- `isAbove`: source bottom edge <= target top edge
- `isBelow`: source top edge >= target bottom edge

This makes expectations explicit and repeatable for navigation bars, sidebars, headers, footers, and other layout-critical components.

## Project Link

- GitHub: [VanBelleKoen/cypress_positional](https://github.com/VanBelleKoen/cypress_positional)

## Why It Matters To Me

This project represents the type of practical experimentation I enjoy: identifying a subtle but recurring test problem, building a focused solution, and turning that learning into something the wider testing community can use.
