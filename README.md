# Personal Website – Astro Content-Driven Starter

This project is a fully content-driven personal website built with [Astro](https://astro.build/). All information (bio, about, blog posts, etc.) is managed in files (YAML, Markdown) – no content is hardcoded in the codebase. The site is styled with a modern, dark, tokyonight-inspired theme.

## ✨ Features

- **Content-driven:** All site content is managed in files (YAML/Markdown) in `src/content/`.
- **Dynamic About Page:** About page sections are defined in a YAML file. Add, remove, or reorder sections without code changes.
- **Blog System:** Blog posts are Markdown/MDX files in `src/content/blog/` and are listed automatically.
- **Consistent Layout:** Header and footer are shared across all pages. Social links are managed in one place.
- **Modern Theme:** Uses a tokyonight-inspired palette for a beautiful, accessible look.
- **SEO & Performance:** 100/100 Lighthouse, SEO-friendly, OpenGraph, sitemap, and RSS support.

## 🗂️ Project Structure

```
├── public/                  # Static assets (images, fonts, etc.)
├── src/
│   ├── components/          # Reusable Astro components (Header, Footer, etc.)
│   ├── content/             # All content lives here
│   │   ├── aboutMe.yaml     # About page sections (YAML, fully dynamic)
│   │   └── blog/            # Blog posts (Markdown/MDX)
│   ├── layouts/             # Layout components
│   └── pages/               # Astro/MDX/HTML pages (routing)
├── astro.config.mjs         # Astro configuration
├── package.json             # Project metadata & scripts
└── tsconfig.json            # TypeScript config
```

## 📝 Content Management

### About Page
- Content is defined in `src/content/aboutMe.yaml` as an array of sections:

```yaml
sections:
  - title: "Work"
    content: |
      I'm a test automation engineer with a passion for building useful things.
  - title: "Hobbies"
    content: |
      In my free time, I enjoy archery, reading, and exploring new places.
```
- You can add, remove, or reorder sections in the YAML file. The About page will update automatically.
- Each section supports multi-line content and basic HTML for formatting/highlighting.

### Blog
- Blog posts are Markdown or MDX files in `src/content/blog/`.
- Each post requires frontmatter:

```markdown
---
title: "My First Post"
description: "A short summary."
pubDate: "2025-07-31"
---
Your post content here...
```
- New posts are automatically listed on the blog page. No code changes needed.

### Homepage
- The homepage content (introduction, bio) is managed in `content.yaml` (if using the static HTML version) or can be migrated to Astro for full integration.

## 🖥️ Running the Project

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The site will be available at [http://localhost:4321](http://localhost:4321).
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview the production build:**
   ```sh
   npm run preview
   ```

## 🛠️ Customization

- **Add new About sections:** Edit `src/content/aboutMe.yaml` and add a new object to the `sections` array.
- **Add a new blog post:** Add a new `.md` or `.mdx` file to `src/content/blog/` with the required frontmatter.
- **Change social links:** Edit the social links in `src/components/Header.astro` and `src/components/Footer.astro`.
- **Change theme/colors:** Edit `src/styles/global.css` or the inline styles in your layout/page files.
- **Add new pages:** Create new `.astro` or `.md` files in `src/pages/`.

## 🧩 Integrations & Extensibility

- **Astro Content Collections:** Used for blog posts and can be extended for other content types.
- **YAML Parsing:** About page uses `js-yaml` and Node.js `fs` to load YAML at build time.
- **Markdown Rendering:** Blog and About sections support Markdown and HTML for rich formatting.
- **SEO:** `BaseHead.astro` manages meta tags, OpenGraph, and canonical URLs.

## 🧑‍💻 Developer Notes

- All content is file-based. No content is hardcoded in the codebase.
- You can use HTML in YAML/Markdown content for highlights and accents.
- The About page is fully dynamic: add as many sections as you want in YAML.
- The blog page and about page share header/footer for a consistent look.
- The project is easily extensible for new content types or sections.

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Integrations](https://docs.astro.build/en/guides/integrations-guide/)

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/) and inspired by the tokyonight color palette.
