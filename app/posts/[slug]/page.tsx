import { notFound } from 'next/navigation';
import type { Metadata } from 'next/metadata';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from 'contentlayer/generated';
import { getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { generateSEO, generateBlogPostingLD, generateBreadcrumbLD, generateFAQPageLD } from '@/lib/seo';
import { hasAffiliateLinks } from '@/lib/affiliates';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Byline } from '@/components/byline';
import { Prose } from '@/components/prose';
import { ShareButtons } from '@/components/share-buttons';
import { AffiliateDisclosure } from '@/components/affiliate-disclosure';
import { RelatedPosts } from '@/components/related-posts';
import { TagPills } from '@/components/tag-pills';
import { mdxComponents } from '@/components/mdx-components';
import { siteConfig } from '@/lib/config';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) return {};

  const seo = generateSEO({
    title: post.title,
    description: post.description,
    path: post.pathname,
    image: post.cover || post.ogImageUrl,
    type: 'article',
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      ...seo.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: seo.twitter,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);
  const relatedPosts = getRelatedPosts(post, 3);
  const category = siteConfig.categories.find((c) => c.slug === post.category);
  const showAffiliateDisclosure = hasAffiliateLinks(post.affiliateLinks || []);

  const breadcrumbItems = [
    { name: category?.name || 'Posts', href: `/categories/${post.category}` },
    { name: post.title, href: post.pathname },
  ];

  // Generate JSON-LD
  const blogPostingLD = generateBlogPostingLD(post);
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'Home', url: '/' },
    ...breadcrumbItems.map((item) => ({ name: item.name, url: item.href })),
  ]);
  const faqLD = post.faq ? generateFAQPageLD(post.faq as any) : null;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      {faqLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}

      <article className="container py-12">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mb-6 text-xl text-muted-foreground">{post.description}</p>
            <Byline
              author={post.author}
              date={post.date}
              readingTime={post.readingTime}
              updated={post.updated}
            />
            <div className="mt-4">
              <TagPills tags={post.tags || []} />
            </div>
          </header>

          {/* Affiliate Disclosure */}
          {showAffiliateDisclosure && <AffiliateDisclosure />}

          {/* Post Content */}
          <Prose>
            <MDXContent components={mdxComponents} />
          </Prose>

          {/* Share Buttons */}
          <div className="mt-12 border-t pt-8">
            <ShareButtons title={post.title} url={`${siteConfig.url}${post.pathname}`} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Tags</h3>
              <TagPills tags={post.tags} />
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </article>
    </>
  );
}
