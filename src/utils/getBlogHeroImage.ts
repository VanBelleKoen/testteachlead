// src/utils/getBlogHeroImage.ts

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const HERO_YAML_PATH = path.resolve('src/content/blog-hero-images.yaml');

let heroMappingsCache: any = null;

function loadHeroMappings() {
  if (heroMappingsCache) return heroMappingsCache;
  const file = fs.readFileSync(HERO_YAML_PATH, 'utf8');
  const data = yaml.load(file);
  heroMappingsCache = data;
  return data;
}

/**
 * Returns the correct hero image path and a flag for placeholder usage, using YAML config.
 * @param {string | undefined} heroImage - The heroImage from frontmatter (can be undefined)
 * @param {string} title - The blog post title
 * @returns {{ src: string, visual: boolean }}
 */
export function getBlogHeroImage(heroImage: any, title: string) {
  if (heroImage) {
    return { src: heroImage, visual: false };
  }
  const { mappings, default: defaultImage } = loadHeroMappings();
  if (title) {
    const lowerTitle = title.toLowerCase();
    for (const { keywords, image } of mappings) {
      if (Array.isArray(keywords) && keywords.some((kw: string) => lowerTitle.includes(kw.toLowerCase()))) {
        return { src: image, visual: true };
      }
    }
  }
  return { src: defaultImage, visual: true };
}
