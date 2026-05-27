# Project Overview: TestTeachLead

## Purpose
TestTeachLead is a specialized technical blog and knowledge base focused on software quality assurance, testing methodologies, and leadership in engineering. It serves as a resource for manual and automation testers to learn about modern tools, best practices, and real-world project experiences.

## Architecture & Tech Stack
- **Framework:** Built using a static site generator (Astro), indicated by the `src/content/blog` structure.
- **Content Format:** Markdown (.md) utilizing YAML frontmatter for metadata.
- **Frontmatter Schema:**
  - `title`: The headline of the post.
  - `description`: A brief summary for SEO and listing pages.
  - `pubDate`: Publication date in `YYYY-MM-DD` format.

## Key Technical Pillars
1.  **API Testing:** Comprehensive guides on tools like **Postman** and **Insomnia**, with specific focus on E-commerce and CRUD flows.
2.  **Web Automation:** Best practices for **Cypress**, focusing on robust selectors, DOM traversal, and integration into TDD/BDD cycles.
3.  **Performance Testing:** Modern, lightweight load testing using **Artillery**.
4.  **Test Management:** Critical evaluations of tools (e.g., **Test Monitor**) and frameworks (e.g., **Cucumber**), often highlighting where industry "hype" meets reality.
5.  **Utilities & DevOps:** Practical guides for **SSH key management** for AWS and proprietary tools like the **Test-Data-Generator**.

## Content Philosophy
- **Critical Thinking:** The content doesn't just explain "how" but evaluates "if" and "why" (e.g., the critical view on Cucumber and Test Monitor).
- **Practicality:** Focuses on real-world implementation, such as avoiding "flaky" selectors in Cypress or chaining requests in Insomnia.
- **Accessibility:** Aimed at bridging the gap between business analysts, developers, and testers.

## Information for Agents
- **Content Location:** All blog posts are located in `/src/content/blog/`.
- **Tone of Voice:** Professional, experienced, world-class engineering assistant style.
- **Code Quality:** Examples should be clear, reusable, and include necessary configuration (YAML/Bash/JS).
- **Contextual Awareness:** When adding new content, reference existing posts (like the Petstore API or BDD concepts) to maintain project cohesion.