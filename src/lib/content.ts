import { getCollection, type CollectionEntry } from 'astro:content';

export interface ProjectCard {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export interface SpeakingEngagement {
  date: string | Date;
  title: string;
  location: string;
  description: string;
  eventUrl?: string;
}

export interface TaxonomyTerm {
  label: string;
  slug: string;
  count: number;
}

export interface BlogPostWithTaxonomy {
  post: CollectionEntry<'blog'>;
  tags: Array<{ label: string; slug: string }>;
  category: { label: string; slug: string };
}

const DEFAULT_PROJECT_TAGS: Record<string, string[]> = {
  Jobbonus: ['Government', 'Eligibility System'],
  Sustatool: ['Sustainability', 'KPI Tracking'],
  VlaamseArbeidsmigratie: ['Government', 'Migration Registry'],
  Kwaliteitsdatabank: ['Government', 'Open Data Registry'],
  Opleidingsverlof: ['Government', 'Education Scheme'],
  KwalificerendWerkplekleren: ['Government', 'Education Grant'],
  PIO: ['Astro Blog', 'Knowledge Sharing'],
  Loket: ['Government', 'Portal Hub'],
  Zetes: ['Signing Service', 'Security'],
  mbp: ['Government', 'Citizen Portal'],
  WebPlatform: ['Frameworks', 'Public Sector'],
  TestDataGenerator: ['Testing Utility', 'Serverless'],
  ewings: ['E-commerce', 'Proof of Concept'],
  arxcus: ['Invoicing Tool', 'Billing POC'],
  BaloiseInsurance: ['Testing Integration', 'Insurance'],
  Argenta: ['Mobile Banking', 'FinTech'],
  VEX: ['Supply Chain', 'Logistics Platform'],
};

const DEFAULT_FEATURED_PROJECT_SLUGS = ['Jobbonus', 'Sustatool', 'VlaamseArbeidsmigratie'];

const BLOG_TAXONOMY_RULES: Array<{
  keywords: string[];
  tags: string[];
  category: string;
}> = [
    { keywords: ['cypress'], tags: ['Cypress', 'UI Testing'], category: 'Testing' },
    { keywords: ['playwright'], tags: ['Playwright', 'UI Testing'], category: 'Testing' },
    { keywords: ['postman', 'insomnia', 'api'], tags: ['API Testing'], category: 'API Testing' },
    { keywords: ['ai', 'agi', 'llm', 'mcp', 'agent'], tags: ['AI', 'LLM'], category: 'AI and Tooling' },
    { keywords: ['git'], tags: ['Git'], category: 'Developer Tooling' },
    { keywords: ['vim', 'neovim', 'vscode'], tags: ['Editor Tooling'], category: 'Developer Tooling' },
    { keywords: ['artillery', 'performance'], tags: ['Performance Testing'], category: 'Testing' },
    { keywords: ['katalon', 'tricentis', 'eggplant', 'cucumber'], tags: ['Test Tools'], category: 'Testing' },
    { keywords: ['lead', 'leadership', 'mindset', 'teach'], tags: ['Leadership'], category: 'Leadership' },
  ];

function getStartDate(dateVal: string | Date): Date {
  if (dateVal instanceof Date) return dateVal;
  const str = String(dateVal);
  if (str.includes(' - ')) {
    return new Date(str.split(' - ')[0].trim());
  }
  return new Date(str.trim());
}

function slugifyTerm(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function prettifyTaxonomyLabel(value: string): string {
  const cleaned = value.trim().replace(/[-_]+/g, ' ');
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferTaxonomyFromTitle(title: string): { tags: string[]; category: string } {
  const lowerTitle = title.toLowerCase();
  const tags = new Set<string>();
  let category = 'Testing';

  for (const rule of BLOG_TAXONOMY_RULES) {
    if (rule.keywords.some((keyword) => lowerTitle.includes(keyword))) {
      for (const tag of rule.tags) {
        tags.add(tag);
      }
      category = rule.category;
    }
  }

  if (tags.size === 0) {
    tags.add('Testing');
  }

  return {
    tags: [...tags],
    category,
  };
}

function normalizeTaxonomyTerms(values: string[]): Array<{ label: string; slug: string }> {
  const bySlug = new Map<string, { label: string; slug: string }>();
  for (const value of values) {
    if (typeof value !== 'string') continue;
    const label = value.trim();
    if (!label) continue;
    const slug = slugifyTerm(label);
    if (!slug) continue;
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { label: prettifyTaxonomyLabel(label), slug });
    }
  }
  return [...bySlug.values()];
}

function getPostTaxonomy(post: CollectionEntry<'blog'>): BlogPostWithTaxonomy {
  const inferred = inferTaxonomyFromTitle(post.data.title);
  const rawTags = Array.isArray(post.data.tags) && post.data.tags.length > 0
    ? post.data.tags
    : inferred.tags;
  const tags = normalizeTaxonomyTerms(rawTags);

  const categoryLabel = (typeof post.data.category === 'string' && post.data.category.trim())
    ? post.data.category.trim()
    : inferred.category;
  const categorySlug = slugifyTerm(categoryLabel) || 'testing';

  return {
    post,
    tags,
    category: {
      label: prettifyTaxonomyLabel(categoryLabel),
      slug: categorySlug,
    },
  };
}

export async function getBlogPostsSorted(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getRecentBlogPosts(limit = 3): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getBlogPostsSorted();
  return posts.slice(0, limit);
}

export async function getBlogPostsWithTaxonomy(): Promise<BlogPostWithTaxonomy[]> {
  const posts = await getBlogPostsSorted();
  return posts.map((post) => getPostTaxonomy(post));
}

export async function getBlogTagSummaries(): Promise<TaxonomyTerm[]> {
  const posts = await getBlogPostsWithTaxonomy();
  const counts = new Map<string, TaxonomyTerm>();

  for (const entry of posts) {
    for (const tag of entry.tags) {
      const existing = counts.get(tag.slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(tag.slug, { label: tag.label, slug: tag.slug, count: 1 });
      }
    }
  }

  return [...counts.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label);
  });
}

export async function getBlogCategorySummaries(): Promise<TaxonomyTerm[]> {
  const posts = await getBlogPostsWithTaxonomy();
  const counts = new Map<string, TaxonomyTerm>();

  for (const entry of posts) {
    const existing = counts.get(entry.category.slug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(entry.category.slug, {
        label: entry.category.label,
        slug: entry.category.slug,
        count: 1,
      });
    }
  }

  return [...counts.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label);
  });
}

export async function getBlogPostsByTag(tagSlug: string): Promise<BlogPostWithTaxonomy[]> {
  const posts = await getBlogPostsWithTaxonomy();
  return posts.filter((entry) => entry.tags.some((tag) => tag.slug === tagSlug));
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithTaxonomy[]> {
  const posts = await getBlogPostsWithTaxonomy();
  return posts.filter((entry) => entry.category.slug === categorySlug);
}

export async function getBlogTagStaticPaths() {
  const tags = await getBlogTagSummaries();
  return tags.map((tagSummary) => ({
    params: { tag: tagSummary.slug },
    props: { tagSummary },
  }));
}

export async function getBlogCategoryStaticPaths() {
  const categories = await getBlogCategorySummaries();
  return categories.map((categorySummary) => ({
    params: { category: categorySummary.slug },
    props: { categorySummary },
  }));
}

export async function getAboutEntriesSorted(): Promise<CollectionEntry<'about'>[]> {
  const sections = await getCollection('about');
  return sections.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getSpeakingEngagementsSorted(): Promise<SpeakingEngagement[]> {
  const entries = await getCollection('speaking');
  return entries
    .map((entry) => ({
      date: entry.data.date,
      title: entry.data.title,
      location: entry.data.location,
      description: entry.data.description,
      eventUrl: entry.data.eventUrl,
    }))
    .sort((a, b) => getStartDate(b.date).getTime() - getStartDate(a.date).getTime());
}

export async function getProjectEntries(): Promise<CollectionEntry<'projects'>[]> {
  return getCollection('projects');
}

export async function getProjectCards(): Promise<ProjectCard[]> {
  const projects = await getProjectEntries();
  return projects.map((project) => ({
    slug: project.id,
    title: project.data.title,
    description: project.data.description,
    tags: project.data.tags?.length ? project.data.tags : DEFAULT_PROJECT_TAGS[project.id] || ['Software Engineering'],
  }));
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectCard[]> {
  const allProjects = await getProjectCards();
  const projectBySlug = new Map(allProjects.map((project) => [project.slug, project]));

  let featured = DEFAULT_FEATURED_PROJECT_SLUGS
    .map((slug) => projectBySlug.get(slug))
    .filter((project): project is ProjectCard => Boolean(project));

  if (featured.length < limit) {
    const fallbackProjects = allProjects
      .filter((project) => !DEFAULT_FEATURED_PROJECT_SLUGS.includes(project.slug))
      .slice(0, limit - featured.length);
    featured = [...featured, ...fallbackProjects];
  }

  return featured.slice(0, limit);
}

export async function getProjectStaticPaths() {
  const projects = await getProjectEntries();
  return projects.map((project) => ({
    params: { slug: project.id },
    props: project,
  }));
}

export async function getBlogStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
