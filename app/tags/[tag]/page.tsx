import { notFound } from 'next/navigation';
import type { Metadata } from 'next/metadata';

import { getPostsByTag, getAllTags } from '@/lib/posts';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PostCard } from '@/components/post-card';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const seo = generateSEO({
    title: `Posts tagged "${params.tag}"`,
    description: `Browse all articles tagged with ${params.tag}`,
    path: `/tags/${params.tag}`,
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ name: 'Tags', href: '/tags' }, { name: params.tag, href: params.tag }]} />

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Tagged: {params.tag}</h1>
        <p className="text-muted-foreground">{posts.length} articles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slugAsParams} post={post} />
        ))}
      </div>
    </div>
  );
}
