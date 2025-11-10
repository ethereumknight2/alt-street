import { notFound } from 'next/navigation';
import type { Metadata } from 'next/metadata';

import { getPostsByCategory, paginatePosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PostCard } from '@/components/post-card';
import { SubscribeForm } from '@/components/subscribe-form';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateStaticParams() {
  return siteConfig.categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = siteConfig.categories.find((c) => c.slug === params.category);

  if (!category) return {};

  const seo = generateSEO({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = siteConfig.categories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const allPosts = getPostsByCategory(params.category);
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages, hasNext, hasPrev } = paginatePosts(allPosts, page, 12);

  return (
    <div className="container py-12">
      <Breadcrumbs
        items={[{ name: 'Categories', href: '/' }, { name: category.name, href: params.category }]}
      />

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border bg-muted/50 p-12 text-center">
          <p className="text-lg text-muted-foreground">No articles found in this category yet.</p>
        </div>
      ) : (
        <>
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slugAsParams} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {hasPrev && (
                <a
                  href={`/categories/${params.category}?page=${page - 1}`}
                  className="rounded-md border px-4 py-2 hover:bg-muted"
                >
                  Previous
                </a>
              )}
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              {hasNext && (
                <a
                  href={`/categories/${params.category}?page=${page + 1}`}
                  className="rounded-md border px-4 py-2 hover:bg-muted"
                >
                  Next
                </a>
              )}
            </div>
          )}
        </>
      )}

      {/* Newsletter CTA */}
      <div className="mx-auto mt-16 max-w-2xl">
        <SubscribeForm variant="inline" />
      </div>
    </div>
  );
}
