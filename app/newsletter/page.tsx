import type { Metadata } from 'next/metadata';

import { generateSEO } from '@/lib/seo';
import { SubscribeForm } from '@/components/subscribe-form';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Newsletter',
  description: 'Subscribe to AltStreet for weekly alternative investment insights delivered to your inbox.',
  path: '/newsletter',
});

export default function NewsletterPage() {
  const benefits = [
    'Weekly curated insights on alternative investments',
    'Platform reviews and comparisons',
    'Market trends in carbon, AI compute, farmland, and more',
    'Early access to in-depth guides',
    'No spam, unsubscribe anytime',
  ];

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">Subscribe to AltStreet</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Get alternative investment insights delivered straight to your inbox. Join retail investors
          and professionals staying informed about emerging asset classes.
        </p>

        <div className="mb-8 rounded-lg border bg-muted/50 p-8">
          <h2 className="mb-4 text-xl font-semibold">What You'll Get</h2>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <SubscribeForm variant="default" />

        <p className="mt-6 text-sm text-muted-foreground">
          By subscribing, you agree to receive periodic emails from AltStreet. We respect your privacy
          and will never share your email address. You can unsubscribe anytime. Read our{' '}
          <a href="/privacy" className="underline hover:no-underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
