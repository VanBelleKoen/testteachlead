---
title: "The Benefits of Looping in Cypress Test Cases"
description: "Exploring the advantages of using loops in Cypress test automation."
pubDate: "2023-10-05"
---

When writing test cases in Cypress, a common challenge is avoiding duplicated code while maintaining clear and effective reporting. One powerful technique to achieve this is looping—either over test values or selectors. While using loops in test automation might seem counterintuitive, they can lead to cleaner, more efficient tests with improved execution speed and reporting clarity.

### Why Looping?
1. **Better Reporting:** Each test value or selector now becomes a separate test case in the reporting, allowing you to easily identify which specific value or field is failing.
2. **Less Duplicated Code:** Rather than writing the same assertion or interaction multiple times, a loop can iterate over an array of values or selectors, making the test more maintainable and reducing redundancy.
3. **Simplifies Form Validation:** Adding a new input field to validate is as simple as adding a single value to the array—no need to write additional test logic.
4. **Keeps It Simple (KISS Principle):** This approach follows the "Keep It Simple, Stupid" principle by keeping test logic straightforward and avoiding unnecessary complexity.

### Looping Over Values
When testing different input values for a form field, a common approach is to create separate test cases for each value. However, this can be streamlined with a loop:

```javascript
const testValues = ['John Doe', 'Jane12Doe', 'Al%SE', 'null'];

describe('Form Input Tests', () => {
  cy.visit('/form-page');

  testValues.forEach((value) => {
    it(`should accept input: ${value}`, () => {
      cy.get('#name-input').clear().type(value);
      cy.get('#submit-button').click();
      cy.get('.success-message').should('be.visible');
    });
  });
});
```

By looping over `testValues`, we avoid writing separate `it` blocks while still getting detailed test reports for each value. The test case title dynamically includes the value being tested (`should accept input: ${value}`), ensuring that the test report clearly indicates which input was used in each iteration. This makes it easy to pinpoint failures and analyze test results efficiently. Simply because the report will now contain 5 different tests, each with it's own value filled in in the title. This takes away any need for debugging, the test case title is enough, you immediately know which value is the perpetrator.

### Looping Over Selectors
Another powerful use case is looping over selectors. This empowers the creation of selectors as functions, where the loop is powered by an array of strings that the function accepts, returning the full selector dynamically.

```javascript
const fields = ['first-name', 'last-name', 'email', 'phone'];

const getFieldSelector = (field) => `#${field}-input`;

describe('Form Field Validations', () => {
  cy.visit('/form-page');

  fields.forEach((field) => {
    it(`should validate the ${field} field`, () => {
      cy.get(getFieldSelector(field)).should('be.visible');
    });
  });
});
```

Here, instead of hardcoding each selector, we define a function `getFieldSelector` that dynamically generates selectors based on an array of field names. This makes it easy to extend the test: simply add a new field name to the array, and the test will automatically cover it. This will also greatly reduce the length of the page-objects, as now the selectors are dynamically generated based on what the test case requires.

### But how will we skip a test ?

In the example above we have four different test cases, but phone triggers an error. So we should skip that test while waiting on a fix.

```javascript
const fields = [
  'first-name', 
  'last-name', 
  'email', 
  // 'phone'
  ];
```

By simply commenting the value, that specific test is taken out of rotation. Granted, it is not as clean as a `.skip()` but we can't have everything. To be frank, the benefits of looping over test cases, strongly outweigh the downside of having to comment a value or selector.

### Conclusion
Looping over Cypress test cases is like having a smart assistant that takes care of all the repetitive work for you. It keeps your tests lean, your reports clean, and your maintenance routine serene. No more endless copy-pasting or debugging nearly identical test cases—just add a new value or selector, and let the loop do its magic. So embrace the loop, keep it simple, and let Cypress work smarter, not harder!


