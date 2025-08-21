---
title: "Safetest: Netflix’s Next-Gen UI Testing Framework"
description: "A deep dive into Safetest, Netflix’s UI testing solution combining Playwright and Jest/Vitest for robust, framework-agnostic testing."
pubDate: "2025-07-31"
---

In the fast-paced world of web development, robust UI testing is non-negotiable. Netflix, a company renowned for its innovative engineering, has introduced Safetest, a UI testing framework that merges the power of Playwright and Jest/vitest into a unified solution. Let's dive into what Safetest offers, how to get started, and its strengths and weaknesses in the UI testing landscape.

## What Makes Safetest Unique?

Safetest is designed to simplify and streamline the testing of your web applications, whether you're working with individual components or the entire app's functionality and visual appearance. Here's what sets it apart:

### Comprehensive Testing: The Best of Both Worlds
Safetest excels in providing comprehensive testing capabilities by combining the power of two leading technologies:

### Playwright's Robust Browser Automation:
Playwright is renowned for its ability to automate browser interactions across various browsers and devices. Safetest leverages this to simulate real user scenarios, like clicking buttons, filling forms, and navigating through your application. This allows you to test the full user journey and ensure your UI responds as expected.

### Jest/Vitest's Familiar Testing Structure:
Jest and Vitest are popular testing frameworks that offer a clear and structured way to write and organize tests. Safetest integrates with these frameworks, so you can use their familiar syntax and assertions while harnessing Playwright's capabilities. This creates a seamless workflow for developers who are already accustomed to either Jest or Vitest.

By merging these two powerful tools, Safetest empowers you to write tests that cover a wide spectrum:

- **Functional Testing:** Verify that your application's features and user flows work correctly.

- **End-to-End Testing:** Simulate complete user journeys to ensure seamless interactions across different pages or components.
Visual Regression Testing: Capture screenshots of your UI and compare them to baseline images to detect unintended visual changes.

### Framework Agnostic: Versatility for Your Projects
One of Safetest's key strengths is its versatility. While it's initially designed with React in mind, it's not confined to a single framework. Here's how it achieves this:

- **Adaptable Setup:** Safetest's setup process can be tailored to work with different frameworks. Whether you're using Vue, Svelte, Angular, or Next.js, you can configure Safetest to integrate seamlessly with your chosen technology.

- **Framework-Specific Adapters:** Safetest provides adapters that bridge the gap between its core functionalities and the specific requirements of different frameworks. This ensures that you can leverage Safetest's features regardless of your tech stack. This framework-agnostic approach is a significant advantage in the ever-evolving web development landscape. It allows you to adopt Safetest without being tied to a particular framework, giving you the freedom to choose the technologies that best suit your project's needs.

### Screenshot Diffing and Reporting: Visualizing Your Success
Visual regressions, where unintended changes occur in your UI's appearance, can be subtle yet impactful. Safetest makes it easy to catch these regressions with its screenshot diffing feature. You can capture screenshots of your UI at various stages and automatically compare them to reference images.

In addition, Safetest's reporting capabilities provide you with detailed insights into your test results. You get clear information about which tests passed, failed, or are pending, along with relevant error messages. This helps you quickly identify and address issues in your code.

### Getting Started with Safetest: A Step-by-Step Guide

Let's walk through the installation and setup process for React and Angular projects using Jest:

1. **Install Safetest:**
   ```bash
   npm install --save-dev safetest
   ```

2. **Add Run Command:**
   Modify your `package.json` with the appropriate script:

   * **React:**
     ```json
     "safetest": "OPT_URL=${TARGET_URL:-http://localhost:3000} react-scripts 
         --inspect test --runInBand 
         --testMatch '**/*.safetest.{j,t}s{,x}' 
         --setupFilesAfterEnv ./setup-safetest.js"
     ```

   * **Angular:**
     ```json
     "safetest": "OPT_URL=${OPT_URL:-http://localhost:4200} 
         node --inspect node_modules/.bin/jest --runInBand --bail=5 
         --testMatch '**/*.safetest.{j,t}s{,x}' 
         --setupFilesAfterEnv ./setup-safetest.js 
         --testTimeout=30000"
     ```

3. **Create `setup-safetest.js`:**
   ```javascript
   const { setup } = require("safetest/setup");

   setup({
       bootstrappedAt: require.resolve('./src/index.tsx')
   });
   ```
Absolutely! Let's expand on steps 4 and 5 of the Safetest setup process:

4. **Bootstrap Your Application: Preparing Your App for Testing**

Bootstrapping your application is a crucial step in making it compatible with Safetest. This involves modifying your app's entry point (usually `index.tsx` for React or `main.ts` for Angular) to integrate Safetest's capabilities. Here's why it's important and how it's done:

**Why Bootstrap?**

* **Test Environment:** Bootstrapping creates a special test environment for your application. This environment isolates your components and allows Safetest to manipulate them for testing purposes.
* **Module Loading:**  Safetest needs to be able to load and interact with your application's modules, including components and dependencies. Bootstrapping sets up this loading mechanism.
* **Customization:** The bootstrapping process can be customized to suit your specific application's requirements. For instance, you can specify which components or modules to load for testing.

**How to Bootstrap (React Example):**
```ts
// src/index.tsx (or your entry point)

import { createRoot } from 'react-dom/client';
import { bootstrap } from 'safetest/react'; // Import from Safetest
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

bootstrap({ // Use Safetest's bootstrap function
  container,
  element: <App />,
  render: (element) => root.render(element),
  webpackContext: import.meta.webpackContext('.', {
    recursive: true,
    regExp: /\.safetest$/,
    mode: 'lazy'
  })
});
```

**Key Points:**

* **`bootstrap` function:** This function from Safetest handles the initialization of your app within the test environment.
* **`container` and `element`:**  Specify the DOM element where your app will be rendered and the root component (`<App />` in this example).
* **`render`:** Provides a custom rendering function if needed (e.g., for React 18).
* **`webpackContext`:**  (For Webpack-based projects) This option helps Safetest load your modules correctly.

**Angular Bootstrapping:**
For Angular projects, the process is similar, but you'll use Safetest's `bootstrap` function designed specifically for Angular and provide your `AppModule`.

5. **Optional Configurations: Tailoring Safetest to Your Needs**

Safetest offers additional configurations to enhance your testing experience:

* **TypeScript Support:** If your project uses TypeScript, you'll need to configure Jest to work with TypeScript files. This typically involves installing additional packages like `ts-jest` and configuring your `tsconfig.json`.

* **Playwright Integration:** If you want to leverage Playwright's full capabilities for browser automation, you'll need to install Playwright separately. This will enable you to use Playwright's rich API for interacting with browsers, simulating user events, and more.

## Pros and Cons: A Balanced Perspective

Absolutely! Let's take a closer look at the pros and cons of Safetest:

**Pros: Unveiling Safetest's Strengths**

1. **A Powerful Trio:** Safetest's foundation lies in its integration of three robust technologies:

   * **Playwright:** This browser automation powerhouse provides the backbone for simulating user interactions and testing across different browsers.
   * **Jest/Vitest:** These popular testing frameworks bring a familiar structure and assertion library, making test writing intuitive.
   * **React:** While Safetest is adaptable to other frameworks, its React-centric design offers seamless integration for React projects.

2. **Flexible Testing Environments:** One of Safetest's standout features is its flexibility in test execution. You can choose to run your tests in:

   * **Node.js:** This lightweight environment is ideal for fast, isolated component testing.
   * **Real Browsers:** For testing that requires full browser interactions, you can seamlessly switch to running tests in actual browsers (Chrome, Firefox, etc.).

3. **Simplified Authentication Mocking:** Authentication is often a pain point in UI testing. Safetest simplifies this by providing built-in mechanisms for mocking authentication flows. This means less setup hassle and more focus on testing the core functionality of your application.

4. **Visual Regression Testing:** Safetest's screenshot diffing and reporting features are invaluable for catching visual regressions. It can automatically compare screenshots taken during tests to baseline images, alerting you to any unexpected visual changes in your UI.

5. **Powerful debugging:** Safetest's render function also returns a pause method, allowing you to pause page execution and inspect its state in the browser. This is particularly useful when debugging complex interactions or verifying page elements.
```ts
const { page } = await render(<ItemDetailsWrapper item={itemMock} userId={userId} />);

debugger;
await pause();

await expect(page.getByText('Test Item')).toBeVisible();
```

**Cons: Addressing the Challenges**

1. **Documentation and Examples:** One common complaint about Safetest is the lack of comprehensive documentation and real-world examples. While the basic setup and usage are explained, more detailed guides and tutorials would be beneficial, especially for handling complex scenarios.

2. **Infrequent Updates and Open Issues:**  As a relatively new project, Safetest's development pace has been somewhat slow. This has led to some reported issues remaining unresolved, which might be a concern for those seeking active support and rapid bug fixes.

3. **Setup Complexity:** Setting up Safetest, particularly in existing projects or with frameworks other than React, can be challenging. The process may involve manual configurations and troubleshooting compatibility issues, potentially hindering adoption for some teams.

4. **React-Centric Design:** While Safetest aims to be framework agnostic, its React-centric design might lead to challenges when using it with other frameworks like Angular or Vue.js. Some features may not translate seamlessly, requiring workarounds or additional setup.

**The Verdict: Is Safetest Right for You?**

Despite its drawbacks, Safetest holds significant promise for simplifying and streamlining UI testing. If you're working primarily with React and are willing to invest some time in setup and potentially tackle some compatibility issues, Safetest can be a valuable addition to your testing toolkit. However, if you're heavily reliant on another framework or require extensive documentation and support, you might want to consider exploring alternative solutions.

As Safetest continues to mature and address its limitations, it has the potential to become a powerful and versatile tool for ensuring the quality and reliability of your web applications.

## Taking Safetest Further: Advanced Techniques

* **Page Objects:** Leverage Playwright's page object model for cleaner, more maintainable tests.
* **Reporting:** Integrate Safetest reports into your CI/CD pipeline for automated quality assurance.
* **Mocking:** Simplify component testing by using `createOverride` to mock dependencies.
* **Debugging:**  Safetest's `pause` method allows you to inspect the page's state during test execution.

## Troubleshooting Tips

- **Module Resolution Issues:** If Safetest has trouble finding your test files, make sure your testMatch pattern in your package.json is correct and that your tsconfig.app.json includes the test files.
- **TypeScript Errors:** Ensure you've installed the TypeScript-specific Jest dependencies (@types/jest and ts-jest).
- **Environment Variables:** Double-check that your OPT_URL variable is set correctly in your package.json script.
By following these steps, you'll have a solid foundation for using Safetest to create robust UI tests for your React or Angular applications.

## Conclusion

Safetest is a promising tool that aims to revolutionize UI testing by combining the strengths of multiple technologies. While it has its limitations in terms of documentation and setup complexity, the potential benefits of a unified testing approach are undeniable. As Safetest matures and addresses these issues, it has the potential to become a go-to framework for ensuring the reliability and quality of modern web applications.

