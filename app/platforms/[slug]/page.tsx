import { notFound } from 'next/navigation';
import type { Metadata } from 'next/metadata';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { getAllPlatforms, getPlatformBySlug } from '@/lib/platforms';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProsCons } from '@/components/pros-cons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PlatformPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms();
  return platforms.map((platform) => ({
    slug: platform.slug,
  }));
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) return {};

  const seo = generateSEO({
    title: `${platform.name} Review`,
    description: platform.description,
    path: `/platforms/${platform.slug}`,
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default function PlatformPage({ params }: PlatformPageProps) {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Breadcrumbs
        items={[
          { name: 'Platforms', href: '/platforms' },
          { name: platform.name, href: platform.slug },
        ]}
      />

      {/* Platform Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-4xl font-bold">{platform.name}</h1>
          <Badge variant="secondary">{platform.category}</Badge>
        </div>
        <p className="mb-6 text-xl text-muted-foreground">{platform.description}</p>
        <Button size="lg" asChild>
          <a
            href={platform.url}
            target="_blank"
            rel={platform.affiliateId ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'}
            className="inline-flex items-center gap-2"
          >
            Visit {platform.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </header>

      {/* Platform Details */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Minimum Investment</h3>
          <p className="text-2xl font-bold">{platform.minInvestment}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Fees</h3>
          <p className="text-2xl font-bold">{platform.fees}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Tax Form</h3>
          <p className="text-2xl font-bold">{platform.taxForm}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Liquidity</h3>
          <p className="text-2xl font-bold">{platform.liquidity}</p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mb-12 rounded-lg border p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-muted-foreground">Asset Type</dt>
            <dd className="mt-1">{platform.assetType}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-foreground">Region</dt>
            <dd className="mt-1">{platform.region}</dd>
          </div>
          {platform.founded && (
            <div>
              <dt className="text-sm font-semibold text-muted-foreground">Founded</dt>
              <dd className="mt-1">{platform.founded}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Features */}
      {platform.features && platform.features.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Key Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {platform.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pros & Cons */}
      <ProsCons pros={platform.pros} cons={platform.cons} />

      {/* CTA */}
      <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mb-6 text-muted-foreground">
          Visit {platform.name} to learn more and open an account.
        </p>
        <Button size="lg" asChild>
          <a
            href={platform.url}
            target="_blank"
            rel={platform.affiliateId ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'}
            className="inline-flex items-center gap-2"
          >
            Visit {platform.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        {platform.affiliateId && (
          <p className="mt-4 text-sm text-muted-foreground">
            This is an affiliate link. We may earn a commission at no cost to you.{' '}
            <Link href="/disclosures" className="underline">
              Learn more
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
