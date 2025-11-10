import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { pages } from '#site/content';
import { generateSEO } from '@/lib/seo';
import { Prose } from '@/components/prose';
import { mdxComponents } from '@/components/mdx-components';
import { MDXContent } from '@/components/mdx-content';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((p) => p.slugAsParams === slug);

  if (!page) return {};

  const seo = generateSEO({
    title: page.title,
    description: page.description,
    path: page.pathname,
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((p) => p.slugAsParams === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container py-12">
      <article className="mx-auto max-w-4xl">
        <Prose>
          <MDXContent code={page.body} components={mdxComponents} />
        </Prose>
      </article>
    </div>
  );
}
