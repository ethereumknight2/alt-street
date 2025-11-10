// This file provides type definitions for Velite generated content
// The actual .velite directory will be generated when you run: npm run build

declare module '#site/content' {
  export interface Post {
    title: string;
    description: string;
    date: string;
    updated?: string;
    category: string;
    tags: string[];
    cover?: string;
    author: string;
    toc: boolean;
    affiliateLinks: string[];
    faq?: Array<{ question: string; answer: string }>;
    slug: string;
    slugAsParams: string;
    body: string; // This is the compiled MDX code as a string
    readingTime: {
      text: string;
      minutes: number;
      time: number;
      words: number;
    };
    pathname: string;
    ogImageUrl: string;
  }

  export interface Page {
    title: string;
    description: string;
    slug: string;
    slugAsParams: string;
    body: string; // This is the compiled MDX code as a string
    pathname: string;
  }

  export const posts: Post[];
  export const pages: Page[];
}
