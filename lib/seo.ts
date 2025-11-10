import { siteConfig } from './config';
import type { Post } from './posts';

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph: {
    type: string;
    title: string;
    description: string;
    url: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images?: string[];
  };
}

export function generateSEO(params: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}): SEOMetadata {
  const { title, description, path, image, type = 'website' } = params;
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image || `${siteConfig.url}/og-image.png`;

  return {
    title: fullTitle,
    description,
    canonical: url,
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function generateBlogPostingLD(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.cover || post.ogImageUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${post.pathname}`,
    },
  };
}

export function generateFAQPageLD(faq: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbLD(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateFinancialProductLD(params: {
  name: string;
  description: string;
  url: string;
  category: string;
  provider?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: params.name,
    description: params.description,
    url: params.url,
    category: params.category,
    ...(params.provider && {
      provider: {
        '@type': 'Organization',
        name: params.provider,
      },
    }),
  };
}
