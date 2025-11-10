import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { getAllPosts } from '@/lib/posts';
import { SubscribeForm } from '@/components/subscribe-form';

export function SiteFooter() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Subscribe to AltStreet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get alternative investment insights delivered to your inbox weekly.
            </p>
            <SubscribeForm variant="footer" />
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Latest Posts</h3>
            <ul className="space-y-2 text-sm">
              {latestPosts.map((post) => (
                <li key={post.slugAsParams}>
                  <Link
                    href={post.pathname}
                    className="text-muted-foreground hover:text-foreground transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            {siteConfig.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
