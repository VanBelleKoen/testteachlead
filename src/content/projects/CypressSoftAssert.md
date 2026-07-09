---
title: Cypress Soft Assert
description: A Cypress plugin that enables soft assertions, allowing tests to collect multiple assertion failures before reporting them.
tags:
  - Testing Utility
  - Cypress
  - Open Source
  - Plugin
---

# Cypress Soft Assert

Cypress Soft Assert is a small open source project I created to make Cypress tests more expressive and practical in situations where a single failure should not immediately stop all validation.

The goal of the project is simple: allow teams to keep gathering useful feedback during a test run instead of failing at the first unmet expectation. This can be especially valuable when validating pages, forms, or data-rich flows where seeing the full set of problems at once is more useful than fixing them one by one through repeated runs.

## Why I Built It

While working with Cypress, I often saw the same friction point: tests are excellent at stopping immediately on failure, but not every assertion should end the conversation right away. In some cases, a softer approach gives better visibility, better debugging, and a more efficient feedback loop.

This project came out of that need. I wanted a lightweight way to bring soft assertion behavior into Cypress without overcomplicating the test authoring experience.

## What It Offers

- Soft assertion support for Cypress test flows
- Better visibility into multiple failures within a single execution
- A simple utility for teams that want richer test feedback
- A practical example of extending Cypress for real-world testing needs

## Project Link

- GitHub: [VanBelleKoen/cypress_soft_assert](https://github.com/VanBelleKoen/cypress_soft_assert)

## Why It Matters To Me

This project reflects the kind of work I enjoy most: noticing a small but recurring problem, designing a practical solution, and sharing it so others can benefit from it as well. It sits at the intersection of quality engineering, developer experience, and open source contribution, which is exactly where I like to spend my time.
