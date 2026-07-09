---
title: Cypress Translations Checker
description: A Cypress plugin that automatically validates untranslated keys on every page navigation without changing your test style.
tags:
  - Testing Utility
  - Cypress
  - Localization
  - Open Source
---

# Cypress Translations Checker

Cypress Translations Checker is a personal open source plugin that validates translation quality automatically while your normal Cypress tests run. Instead of sprinkling manual checks throughout every flow, the plugin detects navigation and checks each newly visited page for untranslated keys.

It is designed for teams that want stronger localization coverage without increasing test maintenance.

## Why I Built It

In real projects, localization issues are rarely just "nice to have" fixes. They directly impact trust, usability, and perceived product quality. I wanted a lightweight way to shift those checks left and make translation quality part of normal test execution.

This project came from that need: a focused helper that brings translation validation closer to everyday testing work.

## What It Offers

- Automatic navigation detection through Cypress URL change events
- Zero test-style changes: standard `cy.visit()` and `cy.click()` flows still work as-is
- Smart deduplication: each unique URL is checked once per test
- Non-invasive reporting: functional tests are not failed by translation checks
- Separate validation stage via `createTranslationValidationTests()`
- Configurable `patterns`, `excludeSelectors`, `allowedKeys`, `checkAttributes`, and `waitTime`
- Attribute scanning for `placeholder`, `title`, `alt`, and `aria-label`
- Optional manual check support with `cy.checkTranslations()` for advanced scenarios

## Typical Setup

1. Register persistence tasks in `cypress.config.js`.
2. Enable the plugin in `cypress/support/e2e.js` with `enableAutoTranslationCheck(...)`.
3. Add `zz-translation-validation.cy.js` and call `createTranslationValidationTests()` so translation reporting runs after functional specs.

This setup creates a practical split: functional tests stay focused on behavior, while translation issues are collected and reported cleanly at the end.

## Project Link

- GitHub: [VanBelleKoen/cypress_translations_checker](https://github.com/VanBelleKoen/cypress_translations_checker)

## Why It Matters To Me

This project reflects my broader testing mindset: quality is not only about interactions passing, but also about content being usable and trustworthy for real users across locales. Localization should be continuously validated, not treated as an afterthought.
