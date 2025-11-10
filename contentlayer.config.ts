import { defineDocumentType, makeSource, ComputedFields } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw),
  },
  pathname: {
    type: 'string',
    resolve: (doc) => {
      const type = doc._raw.sourceFileDir.split('/')[0];
      const slug = doc._raw.flattenedPath.split('/').slice(1).join('/');
      if (type === 'posts') return `/posts/${slug}`;
      if (type === 'pages') return `/${slug}`;
      return `/${slug}`;
    },
  },
  ogImageUrl: {
    type: 'string',
    resolve: (doc) => {
      if (doc.cover) return doc.cover;
      const slug = doc._raw.flattenedPath.split('/').slice(1).join('/');
      return `/api/og?title=${encodeURIComponent(doc.title)}`;
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    updated: {
      type: 'date',
      required: false,
    },
    category: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    cover: {
      type: 'string',
      required: false,
    },
    author: {
      type: 'string',
      default: 'AltStreet Team',
    },
    toc: {
      type: 'boolean',
      default: true,
    },
    affiliateLinks: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    faq: {
      type: 'json',
      required: false,
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Page],
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
            // Prevent lines from collapsing in `display: grid` mode
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
