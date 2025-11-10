import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('AltStreet'),
  NEXT_PUBLIC_SITE_DESCRIPTION: z
    .string()
    .default('Alternative investment insights for retail investors and professionals'),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  BEEHIIV_PUBLICATION_ID: z.string().optional(),
  BEEHIIV_API_KEY: z.string().optional(),
  CONVERTKIT_FORM_ID: z.string().optional(),
  CONVERTKIT_API_KEY: z.string().optional(),
  NEWSLETTER_PROVIDER: z.enum(['beehiiv', 'convertkit']).default('convertkit'),
  AFFILIATE_JSON_PATH: z.string().default('./data/affiliates.json'),
});

const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  BEEHIIV_PUBLICATION_ID: process.env.BEEHIIV_PUBLICATION_ID,
  BEEHIIV_API_KEY: process.env.BEEHIIV_API_KEY,
  CONVERTKIT_FORM_ID: process.env.CONVERTKIT_FORM_ID,
  CONVERTKIT_API_KEY: process.env.CONVERTKIT_API_KEY,
  NEWSLETTER_PROVIDER: process.env.NEWSLETTER_PROVIDER,
  AFFILIATE_JSON_PATH: process.env.AFFILIATE_JSON_PATH,
});

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  url: env.NEXT_PUBLIC_SITE_URL,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  author: 'AltStreet Team',
  plausibleDomain: env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  newsletter: {
    provider: env.NEWSLETTER_PROVIDER,
    beehiiv: {
      publicationId: env.BEEHIIV_PUBLICATION_ID,
      apiKey: env.BEEHIIV_API_KEY,
    },
    convertkit: {
      formId: env.CONVERTKIT_FORM_ID,
      apiKey: env.CONVERTKIT_API_KEY,
    },
  },
  affiliateJsonPath: env.AFFILIATE_JSON_PATH,
  categories: [
    {
      slug: 'carbon-markets',
      name: 'Carbon Markets',
      description: 'Explore carbon removal credits, offsets, and climate investment opportunities',
    },
    {
      slug: 'ai-compute',
      name: 'AI Compute',
      description: 'GPU tokens, decentralized compute networks, and AI infrastructure investments',
    },
    {
      slug: 'farmland',
      name: 'Farmland',
      description: 'Fractional farmland investing, agricultural REITs, and rural land opportunities',
    },
    {
      slug: 'royalties',
      name: 'Royalties',
      description: 'Music, film, and intellectual property royalty investments',
    },
    {
      slug: 'collectibles',
      name: 'Collectibles',
      description: 'Fine art, wine, watches, cars, and luxury asset investing',
    },
  ],
  navigation: [
    {
      name: 'Categories',
      items: [
        { name: 'Carbon Markets', href: '/categories/carbon-markets' },
        { name: 'AI Compute', href: '/categories/ai-compute' },
        { name: 'Farmland', href: '/categories/farmland' },
        { name: 'Royalties', href: '/categories/royalties' },
        { name: 'Collectibles', href: '/categories/collectibles' },
      ],
    },
    { name: 'Platforms', href: '/platforms' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'About', href: '/about' },
  ],
  footer: {
    links: [
      { name: 'About', href: '/about' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Disclosures', href: '/disclosures' },
      { name: 'Privacy', href: '/privacy' },
    ],
  },
};

export type Category = (typeof siteConfig.categories)[number];
