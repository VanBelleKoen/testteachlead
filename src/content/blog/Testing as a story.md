---
title: "Testing as a story"
description: "Why tests should tell the story of an application."
pubDate: "2026-07-08"
---

# Testing as a story

## The Tale of Sam

In a kingdom of code, a young test engineer named Sam discovered a truth that would change everything: **tests are the only reliable narrative** that can survive the relentless churn of a codebase. There were no other docs to fall back on—no manuals, no wikis, no hand‑written guides. The only thing that stayed up to date, version‑controlled, and readable was the test suite itself.

Sam’s journey began when he realized that tests could be more than assertions; they could be **explanatory narratives** that told the story of why a feature behaves the way it does. He rewrote the test suite with a single guiding principle: **every test should read like a short story**.

By treating tests as the primary documentation, writing them in a narrative style that explains *why* the code behaves a certain way, keeping them self‑sufficient and continuous, using redundancy wisely to clarify intent, and making data‑driven tests to keep the story consistent, Sam turned the kingdom of code into a living, breathing novel.

Sam’s first test was a humble one: a simple login scenario. Instead of writing paragraphs of verbose comments about backend cryptography, he used descriptive block names and clean Cypress commands to let the code itself tell the tale of a user trying to access the application. The narrative didn't need to over-explain; it just needed to clearly state the user's intent and the business rule:

```js
describe('User Authentication', () => {
  it('denies entry to users with invalid credentials and shows why', () => {
    cy.visit('/login')
    cy.get('[data-cy="username"]').type('weary_traveler')
    cy.get('[data-cy="password"]').type('wrong-password')
    cy.get('[data-cy="submit"]').click()

    // The story's climax: the system must clearly explain why entry was denied
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials. Please try again.')
  })
})
```

When the test passed, the story was complete; when it failed, the story revealed exactly where the user experience broke down. Word of Sam’s storytelling tests spread through the kingdom. Developers began to read the tests like bedtime stories, gaining insight into the system’s inner workings without wading through pages of stale documentation.

## Documentation: The Bane of Developers' Existence

Sam had watched developers stare at endless stacks of code, searching for answers that no longer existed. The documentation, once a shining beacon, had become a dusty relic, its pages yellowed and its links broken. He realized that if the docs were to be the bane, they had to be replaced by something that lived and breathed with the code.

In the early days, Sam tried to salvage the old docs. He spent hours updating broken links, rewriting paragraphs, and hoping that the effort would pay off. But the kingdom’s developers were busy, and the docs fell behind again. Sam realized that the only way to keep the narrative alive was to embed it directly into the code that mattered most: the tests.

He began to think of the tests as the kingdom’s living chronicles. Each test was a chapter, each assertion a plot twist, and each failure a cliffhanger that demanded resolution. The documentation no longer existed as a separate entity; it was woven into the very fabric of the code.

## Tests Help Troubleshoot and Find Bugs

When a bug appeared, Sam would trace the error back to a missing or outdated doc. He imagined a world where the tests themselves were the guide, pointing developers straight to the root cause without the need for a separate manual.

One rainy afternoon, a critical bug surfaced in the payment module. The error message was cryptic, and the stack trace led to a line of code that seemed innocuous. Sam dug into the test that exercised that line. The test’s narrative explained that the payment gateway required a specific header, and the test had been written to verify that header’s presence. The failure message from the test was clear: “Missing X-Auth-Token header.” The developers fixed the bug in minutes, guided by the test’s story.

Sam’s tests became the kingdom’s first line of defense against confusion. Whenever a new developer joined, they would read the tests and instantly understand the system’s expectations, reducing onboarding time and preventing many bugs before they even appeared.

## Stop Automation just for Automation's Sake

Sam had seen teams write tests just to satisfy a metric. He decided to break that cycle by aligning automation with real business goals, turning each test into a chapter that explained why a feature mattered.

Sam introduced the concept of *business‑centric test stories*. He mapped each test to a user journey, ensuring that every test answered a question like, “What does the user experience when they place an order?” or “How does the system react when a user forgets their password?” By framing tests in this way, he turned a dry checklist into a narrative that resonated with stakeholders.

The kingdom’s product managers began to read the test suite as a living product backlog. They could see which user stories were covered, which were missing, and where the system’s behavior could be improved. The tests became a bridge between engineering and business, fostering collaboration and shared understanding.

## Cypress: Mocking with Purpose

Sam discovered that tools like Cypress offered a powerful way to embed causation directly into the test. By stubbing API responses and setting values that reflected business rules, the test itself became a living explanation of *why* the system behaved that way.

For example, when Sam tested a form with a submit button that is disabled until all required fields are filled, he used Cypress to assert the button’s state and explain the business rule behind it. The test demonstrates how the UI prevents incomplete submissions and how the test itself tells that story:

```js
describe('Form submission', () => {
  it('disables the submit button until all fields are valid', () => {
    cy.visit('/form')
    // Initially, the submit button should be disabled to prevent incomplete data
    cy.get('[data-cy="submit"]').should('be.disabled')

    // Fill in required fields
    cy.get('[data-cy="name"]').type('Alice')
    cy.get('[data-cy="email"]').type('alice@example.com')

    // Now the submit button should be enabled, allowing the user to proceed
    cy.get('[data-cy="submit"]').should('not.be.disabled')
  })
})
```

### Mocking a GET request for a product list
Sam also demonstrated how to mock an API that returns a list of products. By stubbing the response, the test can explain why the UI displays a specific number of items and how the data shape influences the rendering logic.

```js
cy.intercept('GET', '/api/products', {
  statusCode: 200,
  body: {
    products: [
      { id: 1, name: 'Widget', price: 9.99 },
      { id: 2, name: 'Gadget', price: 14.99 }
    ]
  }
}).as('getProducts')

cy.visit('/products')
// The test asserts that the UI renders the mocked products
cy.wait('@getProducts')
cy.get('[data-cy="product-item"]').should('have.length', 2)
cy.get('[data-cy="product-name"]').first().should('contain', 'Widget')
```

By documenting the rationale in the stubbed response, Sam ensured the test became a narrative showing the causal chain: *verified email → token issued*. This approach kept the test from being a mere assertion and turned it into a story explaining the underlying business logic.

## Automation as Living Documentation

Sam completely re-envisioned his tests to read like stories. He added a new test for the user’s profile page, beginning with a narrative hook: “In the quiet corner of the application, a user sits, ready to update their avatar.” The test described the steps—selecting a file, clicking upload, and waiting for confirmation—and included *why* sections explaining the rationale behind file type validation and authentication. 

With these narrative tests acting as the primary documentation, Sam introduced continuous documentation. He set up a pipeline that ran the entire test suite on every pull request. If a test failed, the pipeline generated a report that read like a chapter summary: “The login story failed because the password field was missing.”

The kingdom’s developers began to treat the pipeline as a living narrator. They could see the story’s progress, spot plot holes, and fix them before the story was published. The codebase evolved into a novel where every commit ran the tests, and any failure was simply a story that needed to be fixed.

## Automated Tests Show Why Things Are the Way They Are

Sam wrote explanatory tests that answered the question, *why does this work?* He added comments that described the underlying principles, making the tests not just checks but lessons.

In one test, Sam examined the caching mechanism. The test’s narrative described how the system cached user data to improve performance. The comments explained that the cache had a TTL of 5 minutes and that the test verified the TTL by waiting and checking the cache’s state. When the test passed, the story confirmed that the caching logic worked as intended. When it failed, the story revealed a subtle bug in the TTL calculation.

These explanatory tests became the kingdom’s educational tool. New developers could read a test and learn about caching, authentication, or database transactions—all within the context of a story. The tests were no longer just code; they were lessons.

## Tests Manage Their Own Data

Sam ensured that each test was independent, generating its own data. This made the story self‑contained, allowing developers to read a test and understand the scenario without external context.

He introduced a data factory that could create users, orders, and payments on the fly via API calls. Each test generated fresh data, ensuring the story did not depend on shared state or past chapters:

```js
describe('Placing an order', () => {
  beforeEach(() => {
    // The factory creates fresh data so this story can be read in isolation
    cy.request('POST', '/api/test/factories/user').as('testUser')
  })

  it('allows a newly registered user to checkout', function() {
    cy.login(this.testUser.email, this.testUser.password)
    cy.visit('/checkout')
    // ... the rest of the checkout story
  })
})
```

Because the data was generated within the test, the story was self‑contained. Developers could run the test in isolation, confident that it would always produce the same outcome. The tests became reliable chapters that could be read, understood, and trusted.

## Redundant Code as an Explanation Tool

Sometimes, Sam used redundancy to clarify intent. By repeating a small snippet, he made the narrative clearer for newcomers, turning what could be seen as DRY-violating duplication into a teaching moment.

In a test for the checkout flow, Sam repeated the calculation of the total price right inside the test. The repeated code was not a mistake; it was a deliberate teaching tool:

```js
it('calculates the total price including a 20% tax rate', () => {
  const itemPrice = 100;
  const taxRate = 0.20;
  const expectedTotal = itemPrice + (itemPrice * taxRate); // 120

  // Redundancy as a teaching tool: We calculate it here to make the business rule explicit
  cy.get('[data-cy="cart-total"]').should('contain', `$${expectedTotal}`);
})
```

New developers could see the redundancy and understand that it was intentional. They learned that sometimes, pulling a piece of logic into the test file illuminates a concept that would otherwise be hidden behind layers of abstraction.

## Conclusion

In the end, Sam realized that the true power of test automation lies in its ability to become the living, breathing narrative of a codebase. By treating tests as the primary documentation, writing them in a narrative style that explains *why* the code behaves a certain way, keeping them self‑sufficient and continuous, using redundancy wisely to clarify intent, and making data‑driven tests to keep the story consistent, the kingdom of code could thrive without any external documentation.

Sam’s journey offers a clear path forward: refactor your test suite to include narrative names and explanatory comments, integrate tests into your CI pipeline so the story stays up to date, and share this approach with your team to foster a culture of test‑driven storytelling.
