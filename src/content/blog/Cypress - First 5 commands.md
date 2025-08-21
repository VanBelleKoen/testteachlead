---
title: "Cypress for Beginners: 5 Commands to Kickstart Your Testing Journey"
description: "An introductory guide to Cypress commands for beginners."
pubDate: "2023-10-10"
---

Welcome to the exciting world of Cypress! If you're new to web application testing, Cypress is a fantastic framework that makes writing and running tests a breeze. To start your journey, let's explore five essential Cypress commands that will quickly become your testing arsenal.

**1. Visit Your Test Subject: `cy.visit()`**

The first step in any Cypress test is to tell it where to go – enter `cy.visit()`. This command loads the web page you want to interact with and test. Think of it as the starting line of your test race. Whether it's a live website or a simple HTML file on your computer, `cy.visit()` is your trusty navigator.

There's more to `cy.visit()` than meets the eye. You can customize its behavior:
Set a default base URL in your Cypress configuration to avoid typing the full address every time.

Here's how you'd use it:

```javascript
cy.visit('/') // Visit the baseurl
cy.visit('https://www.example.com')  // Visit a live website
cy.visit('file:///path/to/your/local/file.html') // Visit a local file
```

If your page takes a while to load, you can adjust how long Cypress waits before timing out. This timeout will override the default Cypress timeout of 4000ms.

Here's how you'd use it:

```javascript
cy.visit('/', { timeout: 10000 }) // Add timeout
```

By mastering `cy.visit()`, you'll be able to control the starting point of your tests and ensure your virtual user lands on the right page before you put it through its paces. 

**2. Grab Elements on the Page: cy.get()**
   
Now that you've landed on your webpage, it's time to interact with it. This is where cy.get() shines. It's your way of telling Cypress, "Hey, find this specific element on the page so I can work with it." Think of it like playing a game of "I Spy." You describe what you're looking for, and Cypress locates it for you. The description you provide is called a selector. Here are the common ways to select elements:

  •	CSS Selectors: These are like the addresses for elements on your page. You can target them by their tag name (e.g., button, div), class name (e.g., .my-button), ID (e.g., #submit), or any combination of these.
  •	Data Attributes: The most reliable way to select elements is by using data attributes. These are custom attributes you add to your HTML, like data-cy="login-button". This way, even if your CSS changes, your tests remain stable.

Here's how you'd use cy.get() with these selectors:

```JavaScript
  cy.get('button')            // Get all buttons on the page
  cy.get('.my-button')       // Get elements with the class "my-button"
  cy.get('#submit')          // Get the element with the ID "submit"
  cy.get('[data-cy="login-button"]') // Get the element with the data-cy attribute "login-button"
```
cy.get() is incredibly versatile. You can even chain it with other commands to perform actions on the elements you find. For example:

```JavaScript
cy.get('button').click()  // Find a button and click it
cy.get('button').first() // Select only the first of all buttons
cy.get('input[name="email"]').type('test@example.com') // Find an input field and type into it
```

By mastering cy.get(), you'll be able to target and manipulate elements on your web page, making your tests truly interactive.

**3. Click Away: `cy.click()`**

Once you've used `cy.get()` to grab hold of your target element, it's time to unleash the power of interaction with `cy.click()`. This command does exactly what it says – it simulates a real user clicking on the selected element.  Whether it's a button that triggers an action, a link that takes you to a new page, or any other clickable element, `cy.click()` is your virtual fingertip.

The basic usage is beautifully simple:

```javascript
cy.get('button').click()  // Find a button and click it
cy.get('[data-cy="submit-button"]').click() // Find a button by its data attribute and click it
```

But `cy.click()` has a few tricks up its sleeve:

* **Multiple Clicks:** Want to click multiple elements in quick succession? Use the `multiple: true` option:

   ```javascript
   cy.get('.my-checkboxes').click({ multiple: true })
   ```

* **Forced Clicks:** Sometimes, elements might be visually hidden or obstructed. No problem! `cy.click()` can push through with the `force: true` option:

   ```javascript
   cy.get('.hidden-button').click({ force: true }) 
   ```

* **Click Positions:** You can even control where on the element the click happens (top left, center, bottom right, etc.):

   ```javascript
   cy.get('#my-image').click('topRight')
   ```

With `cy.click()`, you can mimic a wide range of user interactions, from simple button clicks to complex navigation sequences. This makes your Cypress tests feel like a real user is exploring your application, ensuring a robust and comprehensive testing experience.


**4. Type Like a User: `cy.type()`**

Let's face it, most web applications involve some form of text input – filling out forms, searching for products, writing comments, and so on.  Cypress has you covered for all of these scenarios with the `cy.type()` command. This command emulates a user typing into a selected input field or textarea. 

Imagine you have a login form with an email field:

```javascript
cy.get('input[name="email"]').type('test@example.com') 
```

This simple command finds the email input field and types "test@example.com" into it. But `cy.type()` can do much more:

* **Special Characters:** Want to simulate typing symbols or key combinations? Use curly braces to enclose special character sequences:

   ```javascript
   cy.get('input[name="password"]').type('MyS3cretP@ssw0rd{enter}') // Types password and presses enter
   cy.get('textarea').type('{selectAll}{backspace}') // Selects all text and deletes it
   ```

* **Delayed Typing:**  By default, `cy.type()` types very quickly. You can slow it down using the `delay` option to mimic a more realistic typing speed:

    ```javascript
    cy.get('input[name="username"]').type('johndoe', { delay: 100 }) // Types each character with a 100ms delay
    ```

* **Chaining with Other Commands:** You can effortlessly combine `cy.type()` with other Cypress commands to create complex interactions:

    ```javascript
    cy.get('select').select('Option 2').type('{downarrow}{enter}') // Select an option from a dropdown and confirm with Enter
    ```
* **Typing Events:** Cypress also triggers events like `keydown`, `keypress`, and `keyup` as it types, making your tests even more accurate.

With `cy.type()`, you can automate the input of any kind of text, making your Cypress tests comprehensive and user-friendly.


**5. Check Your Work: `cy.should()`**

After you've navigated to your web page, selected elements, clicked buttons, and filled out forms, it's time for the moment of truth: verifying that your application is behaving as expected. That's where `cy.should()` steps in. This command is your quality control inspector, allowing you to make assertions about the state of your web page.

Think of assertions as questions you ask Cypress about the elements on your page:

* "Is this button visible?"
* "Does this heading contain the correct text?"
* "Does this element have a specific CSS class?"

With `cy.should()`, you can pose these questions and Cypress will give you a definitive answer – either the assertion passes (the condition is true) or it fails (the condition is not met). Here's the basic structure:

```javascript
cy.get('h1').should('contain', 'Welcome to My Website') // Check if the h1 tag contains the text "Welcome to My Website"
```

In this example, we're first selecting the `<h1>` element and then using `cy.should()` to assert that it contains the specified text. Cypress provides a wide range of built-in assertions you can use:

* **Existence:** `exist`, `not.exist`
* **Visibility:** `be.visible`, `be.hidden`
* **Content:** `contain`, `have.text`, `have.value`
* **Classes and Attributes:** `have.class`, `have.attr`
* **Length and Count:** `have.length`, `have.length.greaterThan`

You can even combine multiple assertions:

```javascript
cy.get('button').should('be.visible').and('have.class', 'active') // Button must be visible and have the "active" class
```

`cy.should()` not only helps you catch bugs but also makes your tests more readable and self-documenting. By clearly stating your expectations, you create tests that are easy to understand and maintain.


**Bonus Tip: Pause and Synchronize with `cy.wait()`**

While `cy.visit()`, `cy.get()`, `cy.click()`, `cy.type()`, and `cy.should()` are the bread and butter of Cypress, the `cy.wait()` command is like your secret weapon for handling the asynchronous nature of web applications. 

Modern websites are constantly fetching data, updating content, and transitioning between states. This can make automated tests tricky because you might try to interact with an element before it's fully loaded or available. `cy.wait()` allows you to pause your test execution until specific conditions are met, ensuring that your tests stay in sync with your application's behavior.

Here are the main ways to use `cy.wait()`:

**1. Fixed Timeouts:**  This is the simplest form of `cy.wait()`. You tell Cypress to pause for a set amount of time (in milliseconds):

```javascript
cy.wait(2000) // Wait for 2 seconds
```

Use this sparingly, as it's not always the most reliable method and this is considered bad practice. Which unfortunately does not mean, it isn't sometimes required in order to ensure the stability of the test.

**2. Waiting for Network Requests:**  Many web apps make requests to servers to fetch data or update information. `cy.wait()` can wait for these requests to complete before proceeding:

```javascript
cy.intercept('/api/users').as('getUsers')
cy.wait('@getUsers')  // Wait for the request aliased as 'getUsers' to finish
```

By intercepting requests and waiting for their responses, you can ensure your tests are synchronized with your application's data flow.

**3. Waiting for Elements:** You can also wait for specific elements to appear or for existing elements to change their state:

```javascript
cy.wait('@my-animation').then(() => {
  // Do something after the animation is complete
})

cy.get('button').should('be.enabled').then(() => {
  cy.get('button').click()  // Click the button only after it becomes enabled
})
```

In these examples, we're waiting for an element with the alias `@my-animation` to exist and for a button to become enabled before interacting with them.

**Important Considerations:**

* While `cy.wait()` is useful, try to minimize its use. It's generally better to wait for specific conditions rather than arbitrary timeouts.
* Cypress already has built-in retry mechanisms for most commands. For example, `cy.get()` will automatically retry until the element is found or until the default timeout has passed.
* Explore the `cy.intercept()` command to gain more control over network requests and how you wait for them.

By incorporating `cy.wait()` judiciously into your tests, you can handle asynchronous behavior gracefully and ensure that your Cypress tests are reliable and robust.

Remember, these are just the building blocks.  Cypress has a rich set of commands to explore. The best way to learn is by doing, so try building a small test suite using these five commands. Don't hesitate to dive into the Cypress documentation for more details and discover even more powerful features. 

Happy testing!
