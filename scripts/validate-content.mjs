import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const PUBLIC_DIR = path.join(ROOT, 'public');

const errors = [];
const warnings = [];

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function toProjectPath(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join('/');
}

function addError(filePath, message) {
  errors.push(`${toProjectPath(filePath)}: ${message}`);
}

function addWarning(filePath, message) {
  warnings.push(`${toProjectPath(filePath)}: ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function parseFrontmatter(filePath) {
  const content = readText(filePath);
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    addError(filePath, 'Missing frontmatter opening delimiter (---).');
    return null;
  }

  let endIdx = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    addError(filePath, 'Missing frontmatter closing delimiter (---).');
    return null;
  }

  const rawFrontmatter = lines.slice(1, endIdx).join('\n');
  try {
    const data = yaml.load(rawFrontmatter);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      addError(filePath, 'Frontmatter must be a YAML object.');
      return null;
    }
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    addError(filePath, `Invalid YAML frontmatter: ${message}`);
    return null;
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidDate(value) {
  if (value instanceof Date) return !Number.isNaN(value.getTime());
  if (typeof value !== 'string') return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

function isValidUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeTaxonomySlug(value) {
  if (typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function ensurePublicAsset(filePath, imagePath) {
  if (typeof imagePath !== 'string') {
    addError(filePath, 'Image path must be a string.');
    return;
  }

  if (!imagePath.startsWith('/')) {
    addWarning(filePath, `Image path "${imagePath}" is not root-relative; skipping public file check.`);
    return;
  }

  const absoluteAssetPath = path.join(PUBLIC_DIR, imagePath.replace(/^\//, ''));
  if (!fs.existsSync(absoluteAssetPath)) {
    addError(filePath, `Referenced asset does not exist in public/: ${imagePath}`);
  }
}

function validateAbout() {
  const dir = path.join(CONTENT_DIR, 'about');
  const files = walkMarkdownFiles(dir);
  const seenOrders = new Set();

  for (const file of files) {
    const data = parseFrontmatter(file);
    if (!data) continue;

    if (!isNonEmptyString(data.title)) {
      addError(file, 'Field "title" must be a non-empty string.');
    }

    if (!Number.isInteger(data.order) || data.order < 0) {
      addError(file, 'Field "order" must be a non-negative integer.');
    } else if (seenOrders.has(data.order)) {
      addWarning(file, `Duplicate order value detected: ${data.order}`);
    } else {
      seenOrders.add(data.order);
    }
  }
}

function validateSpeakingDate(file, value) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      addError(file, 'Field "date" is an invalid Date.');
    }
    return;
  }

  if (typeof value !== 'string' || !value.trim()) {
    addError(file, 'Field "date" must be a non-empty string or Date.');
    return;
  }

  const dateString = value.trim();
  if (dateString.includes(' - ')) {
    const [from, to] = dateString.split(' - ').map((v) => v.trim());
    if (!isValidDate(from) || !isValidDate(to)) {
      addError(file, `Field "date" range is invalid: ${dateString}`);
    }
    return;
  }

  if (!isValidDate(dateString)) {
    addError(file, `Field "date" is invalid: ${dateString}`);
  }
}

function validateSpeaking() {
  const dir = path.join(CONTENT_DIR, 'speaking');
  const files = walkMarkdownFiles(dir);

  for (const file of files) {
    const data = parseFrontmatter(file);
    if (!data) continue;

    validateSpeakingDate(file, data.date);

    if (!isNonEmptyString(data.title)) {
      addError(file, 'Field "title" must be a non-empty string.');
    }
    if (!isNonEmptyString(data.location)) {
      addError(file, 'Field "location" must be a non-empty string.');
    }
    if (!isNonEmptyString(data.description)) {
      addError(file, 'Field "description" must be a non-empty string.');
    }
    if (typeof data.eventUrl !== 'undefined' && !isValidUrl(data.eventUrl)) {
      addError(file, 'Field "eventUrl" must be a valid http/https URL when present.');
    }
  }
}

function validateProjects() {
  const dir = path.join(CONTENT_DIR, 'projects');
  const files = walkMarkdownFiles(dir);
  const seenSlugs = new Set();

  for (const file of files) {
    const data = parseFrontmatter(file);
    if (!data) continue;

    const slug = path.basename(file, '.md');
    const normalized = slug.toLowerCase();
    if (seenSlugs.has(normalized)) {
      addError(file, `Duplicate project slug by filename (case-insensitive): ${slug}`);
    }
    seenSlugs.add(normalized);

    if (!isNonEmptyString(data.title)) {
      addError(file, 'Field "title" must be a non-empty string.');
    }
    if (!isNonEmptyString(data.description)) {
      addError(file, 'Field "description" must be a non-empty string.');
    }

    if (typeof data.tags !== 'undefined') {
      if (!Array.isArray(data.tags) || data.tags.some((tag) => !isNonEmptyString(tag))) {
        addError(file, 'Field "tags" must be an array of non-empty strings when present.');
      }
    }

    if (typeof data.featured !== 'undefined' && typeof data.featured !== 'boolean') {
      addError(file, 'Field "featured" must be a boolean when present.');
    }
  }
}

function validateBlog() {
  const dir = path.join(CONTENT_DIR, 'blog');
  const files = walkMarkdownFiles(dir);

  for (const file of files) {
    const data = parseFrontmatter(file);
    if (!data) continue;

    if (!isNonEmptyString(data.title)) {
      addError(file, 'Field "title" must be a non-empty string.');
    }
    if (!isNonEmptyString(data.description)) {
      addError(file, 'Field "description" must be a non-empty string.');
    }

    if (!isValidDate(data.pubDate)) {
      addError(file, 'Field "pubDate" must be a valid date.');
    }

    if (typeof data.updatedDate !== 'undefined' && !isValidDate(data.updatedDate)) {
      addError(file, 'Field "updatedDate" must be a valid date when present.');
    }

    if (typeof data.heroImage !== 'undefined') {
      ensurePublicAsset(file, data.heroImage);
    }

    if (typeof data.tags !== 'undefined') {
      if (!Array.isArray(data.tags) || data.tags.length === 0) {
        addError(file, 'Field "tags" must be a non-empty array of strings when present.');
      } else {
        const seenTags = new Set();
        for (const tag of data.tags) {
          if (!isNonEmptyString(tag)) {
            addError(file, 'Field "tags" must only contain non-empty strings.');
            continue;
          }

          const normalized = normalizeTaxonomySlug(tag);
          if (!normalized) {
            addError(file, `Tag "${tag}" cannot be normalized to a valid slug.`);
            continue;
          }

          if (seenTags.has(normalized)) {
            addWarning(file, `Duplicate tag detected after normalization: ${tag}`);
          }
          seenTags.add(normalized);

          if (!isKebabCase(tag.trim())) {
            addWarning(file, `Tag "${tag}" is not kebab-case. Consider "${normalized}" for consistency.`);
          }
        }
      }
    }

    if (typeof data.category !== 'undefined') {
      if (!isNonEmptyString(data.category)) {
        addError(file, 'Field "category" must be a non-empty string when present.');
      } else {
        const normalizedCategory = normalizeTaxonomySlug(data.category);
        if (!normalizedCategory) {
          addError(file, `Category "${data.category}" cannot be normalized to a valid slug.`);
        } else if (!isKebabCase(data.category.trim())) {
          addWarning(file, `Category "${data.category}" is not kebab-case. Consider "${normalizedCategory}" for consistency.`);
        }
      }
    }
  }
}

function validateBlogHeroMappings() {
  const filePath = path.join(CONTENT_DIR, 'blog-hero-images.yaml');
  if (!fs.existsSync(filePath)) {
    addError(filePath, 'Missing file.');
    return;
  }

  try {
    const data = yaml.load(readText(filePath));
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      addError(filePath, 'YAML root must be an object with mappings/default keys.');
      return;
    }

    if (!Array.isArray(data.mappings)) {
      addError(filePath, 'Field "mappings" must be an array.');
    } else {
      const seenKeywords = new Set();
      for (const [idx, mapping] of data.mappings.entries()) {
        if (!mapping || typeof mapping !== 'object' || Array.isArray(mapping)) {
          addError(filePath, `mappings[${idx}] must be an object.`);
          continue;
        }

        if (!Array.isArray(mapping.keywords) || mapping.keywords.length === 0) {
          addError(filePath, `mappings[${idx}].keywords must be a non-empty array.`);
        } else {
          for (const keyword of mapping.keywords) {
            if (!isNonEmptyString(keyword)) {
              addError(filePath, `mappings[${idx}].keywords must only contain non-empty strings.`);
              continue;
            }
            const normalized = keyword.toLowerCase();
            if (seenKeywords.has(normalized)) {
              addWarning(filePath, `Keyword appears in multiple mappings: ${keyword}`);
            }
            seenKeywords.add(normalized);
          }
        }

        if (!isNonEmptyString(mapping.image)) {
          addError(filePath, `mappings[${idx}].image must be a non-empty string.`);
        } else {
          ensurePublicAsset(filePath, mapping.image);
        }
      }
    }

    if (!isNonEmptyString(data.default)) {
      addError(filePath, 'Field "default" must be a non-empty string.');
    } else {
      ensurePublicAsset(filePath, data.default);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    addError(filePath, `Invalid YAML: ${message}`);
  }
}

function printSummary() {
  if (warnings.length > 0) {
    console.log('Warnings:');
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.error('Content validation failed:');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log('Content validation passed.');
  if (warnings.length > 0) {
    console.log(`Completed with ${warnings.length} warning(s).`);
  }
}

validateAbout();
validateSpeaking();
validateProjects();
validateBlog();
validateBlogHeroMappings();
printSummary();
