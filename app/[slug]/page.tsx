import { notFound } from 'next/navigation';
import type { Metadata } from 'next/metadata';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPages } from 'contentlayer/generated';
import { generateSEO } from '@/lib/seo';
import { Prose } from '@/components/prose';
import { mdxComponents } from '@/components/mdx-components';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = allPages.find((p) => p.slugAsParams === params.slug);

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

export default function Page({ params }: PageProps) {
  const page = allPages.find((p) => p.slugAsParams === params.slug);

  if (!page) {
    notFound();
  }

  const MDXContent = useMDXComponent(page.body.code);

  return (
    <div className="container py-12">
      <article className="mx-auto max-w-4xl">
        <Prose>
          <MDXContent components={mdxComponents} />
        </Prose>
      </article>
    </div>
  );
}
