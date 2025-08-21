---
title: "Cypress Intercept: Control, Mock, and Test Network Requests"
description: "A practical guide to using Cypress intercept for frontend testing, mocking, and error handling."
pubDate: "2025-07-31"
---

## Cypress Intercept, Why ?

The folks at cypress define the intercept function as a way to "Spy and stub network requests and responses". I myself prefer the term mocking the request or response. Just to trow in my two cents on the mock vs stub debate. There is no difference.

For those unaware of the massive internet discussion, this just became our most controversial post.

Granted, there are differences between mocking and stubbing but it all depends on which book you've read. If you've read The art of unit testing, we're discussing mocks here. For our more diligent readers, the cypress website will use the term stubbing. Did I mention that it's dependent on the literature you've read ?

## What Does it Do ?

This extremely valuable function allows us to `intercept` a network call. I think we can all agree that in terms of self-documenting code cypress did a wonderful job here. So what can we do here with an intercepted call ?

Quite a few things actually, because as we intercept the call we gain control of it. Suddenly we'd be able to read the information inside the request, modify it or even mock a response. The world becomes our oyster. One advantage that we should consider, besides the obvious, is decoupling the fronted tests from the backend. Regardless of how reliable the backend environment can be, this decoupling gives the tester full control over the frontend. Suddenly we no longer need to perform tedious database setup tasks or worry about security, stability or storage when writing automated tests. The frontend will believe whatever we tell it to believe. I have just the quote for this occasion.

> The strong man is the one who is able to intercept at will the communication between the senses and the mind. Napoleon Bonaparte

## Why Should We Use Intercept for Almost Every Request ?

One of the major difficulties of frontend testing is being able to control the data that is displayed on the page itself. The as mentioned before tedious pre-test setup can, with cypress, become a more dynamic and code-based process. As my cypress test case navigates the application, each request is intercepted and modified to suite the needs of my test case.

Another hurdle in frontend testing is the database. More often then not I contaminate the database with whatever garbage the API's allow me to send. Regardless whether or not this behavior is acceptable, it does influence the frontend. Again being able to control the data, helps circumvent this problem. The same goes in the other direction. Maybe we do not want to change any values with the UI test. Using the intercept options allows the frontend to send the request and cypress can just destroy it before it reaches the server.

Maybe one of the least known, or least respected options, of mocking is the increase in speed for your tests. Suddenly the response is always there, in an instant. This is only when the response can be mocked. When it cannot be mocked, the intercept function can still save the day. As we can use it to wait for a specific request to complete. No more changing the timeout on a dynamically generated element. We can patiently wait until the request is finished before starting the search for an the element.

The last difficulty I want to cross off the list is error handling. Creating a robust website requires a great deal of creativity for both the developer and the tester. Cypress simplifies matters considerably. As with the intercept option we can mock responses, including error codes. This grants us the capability to test how the site holds up against different error codes without having to start doing weird things inside the database or the infrastructure of our application.

There are many more advantages, but as each of these are another variation on data control and data management we do not need to go into them.

## Why Shouldn't We Intercept Every Request ?

Because with every intercepted request we deviate a bit further from the production environment. The real response might be slower, might include different headers. There is even the highly unlikely event that you as a tester made a mistake in the intercept. We have to take in account that when we start mocking that we lose a bit of security.

And this is the trade off that we should always consider, security for stability. So we shouldn't intercept every request, just most of them. Cypress advises the user to only keep the critical paths as real requests. This in order to keep the end2end tests in a production valid state.

This matches fairly well with the creation of different test suites. And we should consider seperating the tests with real calls from those with mocked calls. This in order to keep the reporting and troubleshooting of failures simpler.

## A Code Example

```js
    cy.intercept('POST', '/users/graphql').as(
      'users'
    );
    cy.wait('@users')
      .its('response.statusCode')
      .should('eq', 200);
  });
```

So in this example, I'm intercepting a request that matches with `/users/graphql`. As soon as the intercept is a success, it's best to assign it an alias. In this case the alias users has been assigned. After which the test case will wait until the call is finished before validating the response code.

```js
cy.intercept('POST', '/users*', {
  statusCode: 201,
  body: {
    name: 'Peter Pan',
  },
})
```

An example blatantly stolen from the cypress website itself. Here the request is intercepted and the response is mocked. So in this case the statusCode 201 and a specific response body is returned. And that's as easy as it gets.

While there are many more features for the intercept option, we've seen the most important one. For me, this again proves that cypress isn't just another UI test automation tool.

## Sources

[The art of unit testing](https://www.artofunittesting.com/)
[Cypress intercept](https://docs.cypress.io/api/commands/intercept)
[Cypress Network Guide](https://docs.cypress.io/guides/guides/network-requests#Testing-Strategies)
