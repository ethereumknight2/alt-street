import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getAllPosts, getFeaturedPostsByCategory } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/post-card';
import { SubscribeForm } from '@/components/subscribe-form';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);
  const featuredByCategory = getFeaturedPostsByCategory(2);

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Alternative Investment Insights
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Explore carbon markets, AI compute, fractional farmland, royalties, and collectibles.
          Research-driven analysis for retail investors and professionals.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/categories/carbon-markets">
              Explore Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/platforms">Browse Platforms</Link>
          </Button>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/posts">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slugAsParams} post={post} />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      {siteConfig.categories.map((category) => {
        const posts = featuredByCategory[category.slug] || [];
        if (posts.length === 0) return null;

        return (
          <section key={category.slug} className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">{category.name}</h2>
              <p className="mb-4 text-muted-foreground">{category.description}</p>
              <Button variant="outline" asChild>
                <Link href={`/categories/${category.slug}`}>
                  View All {category.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slugAsParams} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-2xl rounded-lg border bg-muted/50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Stay Informed</h2>
        <p className="mb-6 text-muted-foreground">
          Get alternative investment insights delivered to your inbox weekly. No spam, unsubscribe
          anytime.
        </p>
        <SubscribeForm variant="default" />
      </section>
    </div>
  );
}
