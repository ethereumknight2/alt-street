import { posts } from '#site/content';
import { compareDesc } from 'date-fns';

// Infer the Post type from the posts array
export type Post = (typeof posts)[number];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slugAsParams === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return posts
    .filter((post) => post.category === category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPostsByTag(tag: string): Post[] {
  return posts
    .filter((post) => post.tags?.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  const relatedPosts = posts.filter((p) => {
    if (p.slugAsParams === post.slugAsParams) return false;

    // First priority: same category
    if (p.category === post.category) return true;

    // Second priority: shared tags
    const sharedTags = p.tags?.filter((tag) => post.tags?.includes(tag)) || [];
    return sharedTags.length > 0;
  });

  // Sort by relevance: same category first, then by number of shared tags
  relatedPosts.sort((a, b) => {
    if (a.category === post.category && b.category !== post.category) return -1;
    if (a.category !== post.category && b.category === post.category) return 1;

    const aSharedTags = a.tags?.filter((tag) => post.tags?.includes(tag)).length || 0;
    const bSharedTags = b.tags?.filter((tag) => post.tags?.includes(tag)).length || 0;

    if (aSharedTags !== bSharedTags) return bSharedTags - aSharedTags;

    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return relatedPosts.slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getFeaturedPostsByCategory(limit: number = 4): Record<string, Post[]> {
  const categories = ['carbon-markets', 'ai-compute', 'farmland', 'royalties', 'collectibles'];
  const featured: Record<string, Post[]> = {};

  categories.forEach((category) => {
    featured[category] = getPostsByCategory(category).slice(0, limit);
  });

  return featured;
}

export function paginatePosts(postsArray: Post[], page: number = 1, perPage: number = 12) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    posts: postsArray.slice(start, end),
    totalPages: Math.ceil(postsArray.length / perPage),
    currentPage: page,
    hasNext: end < postsArray.length,
    hasPrev: page > 1,
  };
}
