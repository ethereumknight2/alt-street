import { MetadataRoute } from 'next';
import { allPosts, allPages } from 'contentlayer/generated';
import { siteConfig } from '@/lib/config';
import { getAllPlatforms } from '@/lib/platforms';
import { getAllTags } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}${post.pathname}`,
    lastModified: post.updated || post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const pages = allPages.map((page) => ({
    url: `${siteConfig.url}${page.pathname}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categories = siteConfig.categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const platforms = getAllPlatforms().map((platform) => ({
    url: `${siteConfig.url}/platforms/${platform.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tags = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/platforms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/newsletter`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...posts,
    ...pages,
    ...categories,
    ...platforms,
    ...tags,
  ];
}
