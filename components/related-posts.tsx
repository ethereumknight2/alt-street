import type { Post } from 'contentlayer/generated';
import { PostCard } from '@/components/post-card';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slugAsParams} post={post} />
        ))}
      </div>
    </div>
  );
}
