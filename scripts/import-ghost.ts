#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import https from 'https';
import { slugify } from '../lib/utils';

interface GhostPost {
  title: string;
  slug: string;
  html?: string;
  markdown?: string;
  feature_image?: string;
  published_at: string;
  updated_at?: string;
  excerpt?: string;
  tags?: Array<{ name: string }>;
  authors?: Array<{ name: string }>;
  meta_description?: string;
}

interface GhostExport {
  db: Array<{
    data: {
      posts: GhostPost[];
    };
  }>;
}

/**
 * Ghost to MDX Import Script
 *
 * Usage: pnpm import:ghost --file=./ghost-export.json
 *
 * This script:
 * 1. Reads a Ghost export JSON file
 * 2. Converts HTML posts to MDX
 * 3. Downloads and rewrites image paths
 * 4. Creates MDX files with frontmatter in content/posts/
 */

async function downloadImage(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

function htmlToMarkdown(html: string): string {
  // Basic HTML to Markdown conversion
  // In production, use a library like turndown
  let md = html;

  // Convert headings
  md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n');
  md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n');
  md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n');
  md = md.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n');

  // Convert paragraphs
  md = md.replace(/<p>(.*?)<\/p>/gs, '$1\n\n');

  // Convert links
  md = md.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

  // Convert images
  md = md.replace(/<img src="(.*?)" alt="(.*?)".*?>/g, '![$2]($1)');

  // Convert lists
  md = md.replace(/<ul>/g, '');
  md = md.replace(/<\/ul>/g, '\n');
  md = md.replace(/<li>(.*?)<\/li>/g, '- $1');

  // Convert bold/italic
  md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  md = md.replace(/<em>(.*?)<\/em>/g, '*$1*');

  // Remove remaining HTML tags (basic cleanup)
  md = md.replace(/<[^>]+>/g, '');

  // Clean up excessive newlines
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

async function processPost(post: GhostPost, outputDir: string): Promise<void> {
  const slug = post.slug || slugify(post.title);
  const category = 'uncategorized'; // Default category; update based on tags if needed

  // Extract tags
  const tags = post.tags?.map(t => t.name.toLowerCase()) || [];

  // Convert HTML to Markdown
  const content = post.markdown || (post.html ? htmlToMarkdown(post.html) : '');

  // Download and rewrite feature image
  let coverPath = '';
  if (post.feature_image) {
    const imageFilename = path.basename(new URL(post.feature_image).pathname);
    const imagePath = path.join(process.cwd(), 'public', 'images', 'migrated', imageFilename);
    const publicPath = `/images/migrated/${imageFilename}`;

    try {
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      await downloadImage(post.feature_image, imagePath);
      coverPath = publicPath;
      console.log(`  ✓ Downloaded image: ${imageFilename}`);
    } catch (error) {
      console.log(`  ✗ Failed to download image: ${post.feature_image}`);
    }
  }

  // Create frontmatter
  const frontmatter = {
    title: post.title,
    description: post.meta_description || post.excerpt || '',
    date: new Date(post.published_at).toISOString().split('T')[0],
    ...(post.updated_at && { updated: new Date(post.updated_at).toISOString().split('T')[0] }),
    category,
    tags,
    ...(coverPath && { cover: coverPath }),
    author: post.authors?.[0]?.name || 'AltStreet Team',
  };

  // Build MDX file
  const mdxContent = `---
${Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      return `${key}: ${typeof value === 'string' && value.includes(':') ? `"${value}"` : value}`;
    })
    .join('\n')}
---

${content}
`;

  // Write MDX file
  const outputPath = path.join(outputDir, `${slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent, 'utf-8');
  console.log(`  ✓ Created: ${slug}.mdx`);
}

async function main() {
  const args = process.argv.slice(2);
  const fileArg = args.find(arg => arg.startsWith('--file='));

  if (!fileArg) {
    console.error('Error: Missing --file argument');
    console.log('Usage: pnpm import:ghost --file=./ghost-export.json');
    process.exit(1);
  }

  const filePath = fileArg.split('=')[1];

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  console.log('Reading Ghost export...');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const ghostData: GhostExport = JSON.parse(rawData);

  const posts = ghostData.db[0]?.data?.posts || [];

  if (posts.length === 0) {
    console.log('No posts found in export.');
    process.exit(0);
  }

  console.log(`Found ${posts.length} posts. Starting import...\n`);

  // Create output directory
  const outputDir = path.join(process.cwd(), 'content', 'posts', 'imported');
  fs.mkdirSync(outputDir, { recursive: true });

  // Process posts
  for (const post of posts) {
    console.log(`Processing: ${post.title}`);
    try {
      await processPost(post, outputDir);
    } catch (error) {
      console.error(`  ✗ Failed: ${error}`);
    }
  }

  console.log(`\n✓ Import complete! Posts saved to: ${outputDir}`);
  console.log('\nNext steps:');
  console.log('1. Review imported posts in content/posts/imported/');
  console.log('2. Categorize posts by moving them to appropriate category folders');
  console.log('3. Update frontmatter (categories, tags, affiliate links)');
  console.log('4. Run `pnpm dev` to preview imported content');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
