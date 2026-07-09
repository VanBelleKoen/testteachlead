import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		order: z.number().int().nonnegative().default(0),
	}),
});

const speaking = defineCollection({
	loader: glob({ base: './src/content/speaking', pattern: '**/*.md' }),
	schema: z.object({
		date: z.union([z.string(), z.date()]),
		title: z.string(),
		location: z.string(),
		description: z.string(),
		eventUrl: z.string().url().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		featured: z.boolean().optional(),
	}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			category: z.string().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { about, speaking, projects, blog };
