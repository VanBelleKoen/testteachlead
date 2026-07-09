---
title: 'Advanced Testing Techniques in Cypress: Mocking and Validating API Calls'
description: Explore advanced Cypress techniques for mocking, modifying, and validating API calls, simulating network failures, and writing maintainable tests.
pubDate: '2025-07-31'
category: testing
tags:
  - testing
  - cypress
---

Cypress provides powerful tools for mocking and validating API calls. In this blog, we’ll explore advanced testing techniques, including how to manipulate API requests using `cy.intercept`, validate if API calls have been made using `cy.spy`, handle unspyable events with `cy.on('fail')`, and use function-based selectors to keep tests maintainable.

## Mocking API Calls with `cy.intercept`

`cy.intercept` is a flexible command that allows you to modify both the request and the response. Let’s first look at basic request handling, and then dive into more advanced use cases where we modify requests using `req.continue()`.

### Mocking with Custom Request and Response Types

```javascript
interface CustomRequest {
  tagId: number;
  tagName: string;
}

interface CustomResponse {
  success: boolean;
  message: string;
}

describe('Mocking with custom request and response types', () => {
  it('should handle and verify custom request and response in API calls', () => {
    // Mock the API request using custom request/response types
    cy.intercept<CustomRequest, CustomResponse>('POST', '/api/tags', (req) => {
      expect(req.body.tagId).to.equal(1);
      expect(req.body.tagName).to.equal('Cypress');

      // Continue the request and modify the response
      req.continue((res) => {
        expect(res.body.success).to.be.true;
        res.body.message = 'Tag created successfully';
      });
    }).as('createTag');

    cy.visit('/tags');
    cy.get('button.create-tag').click();
    cy.wait('@createTag');
    cy.get('.success-message').should('contain', 'Tag created successfully');
  });
});
```

### Modifying Requests with `req.continue()`

Sometimes, you may need to modify the API request before it is sent, or manipulate the response after it is received. Using `req.continue()`, you can intercept the request, make changes to the payload, and then let it proceed.

Here’s an example of modifying a request body before continuing:

```javascript
describe('Modifying requests with req.continue()', () => {
  it('should modify the request before continuing', () => {
    cy.intercept('POST', '/api/tags', (req) => {
      // Modify the request body before continuing
      req.body.tagName = 'ModifiedTagName';
      req.continue((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.be.true;
      });
    }).as('modifyTagRequest');

    cy.visit('/tags');
    cy.get('button.create-tag').click();

    // Wait for the modified request and check the response
    cy.wait('@modifyTagRequest');
    cy.get('.success-message').should('contain', 'Tag modified successfully');
  });
});
```

In this example:

- `req.body.tagName` is modified before the request is sent.
- The test ensures that the modified request is sent, and the response is validated afterward.
- `req.continue()` allows us to control when the request proceeds, giving full flexibility to modify both the request and the response.

### Using `req.destroy()` to Simulate Network Failures

There are cases where you might want to simulate a network failure by destroying the request entirely, mimicking what happens when a connection is unexpectedly interrupted.

```javascript
describe('Using req.destroy() with cy.intercept', () => {
  it('should destroy the request and simulate a network failure', () => {
    // Intercept a request and destroy it
    cy.intercept('GET', '/api/tags', (req) => {
      // Simulate a network failure by destroying the request
      req.destroy();
    }).as('destroyRequest');

    // Visit the page and attempt to trigger the API call
    cy.visit('/tags');
    cy.get('button.fetch-tags').click();

    // Validate that the error message is shown in the UI
    cy.get('.error-message').should('contain', 'Network request failed');
  });
});
```

In this example:

- The request is destroyed using `req.destroy()`, simulating a network issue.
- After destroying the request, we assert that the UI displays an appropriate error message, ensuring the application handles network failures gracefully.

### Validating API Calls with `cy.spy`

You can use `cy.spy` to track whether a function or API call was triggered during your test. This is especially helpful for confirming if a request was made under specific conditions. Or even validate if the request has not been made. Cancel buttons for instance should not trigger an API call.

```javascript
describe('Validating API Calls with cy.spy', () => {
  it('should verify the API call is triggered when a button is clicked', () => {
    const apiCallSpy = cy.spy(window, 'fetch'); // assuming fetch is used

    cy.visit('/tags');
    cy.get('button.fetch-tags').click();

    expect(apiCallSpy).to.be.calledOnce;
  });

  it('should verify that the API call is not triggered under certain conditions', () => {
    const apiCallSpy = cy.spy(window, 'fetch');

    cy.visit('/tags');

    expect(apiCallSpy).to.not.have.been.called;
  });
});
```

### Handling Unspyable Events with `cy.on('fail')`

Sometimes, you need to ensure that an API request is **not** made. If an unintended request is triggered, you want the test to fail. Using `cy.on('fail')`, you can handle cases where unintended requests are made and fail the test accordingly.

```javascript
describe('Handling unspyable events with cy.on(fail)', () => {
  it('should fail the test if an API request is made when the "Cancel" button is clicked', () => {
    cy.intercept('GET', '/api/vision', {
      statusCode: 200,
      body: [],
    }).as('CreateVision');

    cy.visit('/no-vision-required');

    cy.on('fail', (err) => {
      expect(err.message).to.include('Request should not have been made');
      return false; // Prevent Cypress from automatically failing the test
    });

    cy.get('button.cancel').click();

    cy.wait('@CreateVision').then(() => {
      throw new Error('Request should not have been made');
    });

    cy.get('@CreateVision').should('not.exist');
  });
});
```

### Selectors as Functions

Function-based selectors can make tests more maintainable and adaptable to changes in the UI structure. By dynamically generating selectors, you reduce the risk of broken tests when UI elements change.

```javascript
const selectors = {
  searchTagTypeOnTitle: (title) => `[data-token="tagType-${title}"]`,
};

describe('Selectors as functions', () => {
  it('should select elements dynamically using a function-based selector', () => {
    cy.intercept('GET', '/api/tags', {
      statusCode: 200,
      body: [
        { id: 1, title: 'React' },
        { id: 2, title: 'Angular' },
      ],
    }).as('getTags');

    cy.visit('/tags');
    cy.wait('@getTags');

    cy.get(selectors.searchTagTypeOnTitle('React')).should('exist');
    cy.get(selectors.searchTagTypeOnTitle('Angular')).should('exist');
  });
});
```

### Conclusion

In this blog, we explored advanced Cypress techniques, including how to modify API requests using `cy.intercept` and `req.continue()`, simulate network failures with `req.destroy()`, and validate whether API calls have been made with `cy.spy`. Additionally, we demonstrated how to handle unspyable events using `cy.on('fail')` and how to use function-based selectors to make tests more maintainable.

These techniques empower you to write more robust tests, ensuring your application behaves as expected under a variety of scenarios. By mastering these features, your test suite can cover more complex edge cases, leading to more reliable and maintainable tests.


