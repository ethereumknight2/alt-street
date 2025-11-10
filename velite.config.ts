import { defineConfig, defineCollection, s } from 'velite';
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const computedFields = <T extends { slug: string; body: string; title: string; cover?: string }>(
  data: T
) => ({
  ...data,
  slugAsParams: data.slug,
  readingTime: readingTime(data.body),
  pathname: `/posts/${data.slug}`,
  ogImageUrl: data.cover || `/api/og?title=${encodeURIComponent(data.title)}`,
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      updated: s.isodate().optional(),
      category: s.string(),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      author: s.string().default('AltStreet Team'),
      toc: s.boolean().default(true),
      affiliateLinks: s.array(s.string()).default([]),
      faq: s.any().optional(),
      slug: s.slug('posts').optional(),
      body: s.mdx(),
    })
    .transform((data, { meta }) => {
      // Auto-generate slug from filename if not provided
      // Normalize the path to handle both Unix and Windows paths
      const normalizedPath = meta.path.replace(/\\/g, '/');
      // Extract the relative path after 'posts/'
      const match = normalizedPath.match(/posts\/(.+)\.mdx$/);
      const slug = data.slug || (match ? match[1] : meta.path.replace(/^posts\//, '').replace(/\.mdx$/, ''));
      return computedFields({ ...data, slug, body: data.body });
    }),
});

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      slug: s.slug('pages').optional(),
      body: s.mdx(),
    })
    .transform((data, { meta }) => {
      // Auto-generate slug from filename if not provided
      // Normalize the path to handle both Unix and Windows paths
      const normalizedPath = meta.path.replace(/\\/g, '/');
      // Extract the relative path after 'pages/'
      const match = normalizedPath.match(/pages\/(.+)\.mdx$/);
      const slug = data.slug || (match ? match[1] : meta.path.replace(/^pages\//, '').replace(/\.mdx$/, ''));
      return {
        ...data,
        slug,
        slugAsParams: slug,
        pathname: `/${slug}`,
      };
    }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, pages },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className?.push('line--highlighted');
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
    ],
  },
});
