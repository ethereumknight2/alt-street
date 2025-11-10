# AltStreet - Alternative Investment Content Site

A production-ready Next.js 15 content site for publishing SEO-optimized articles about alternative investments including carbon markets, AI compute, fractional farmland, royalties, and collectibles.

## Features

- **Next.js 15** with App Router and React Server Components
- **TypeScript** for type safety
- **Contentlayer** for type-safe MDX content management
- **Tailwind CSS + shadcn/ui** for beautiful, accessible components
- **Dark mode** support with next-themes
- **SEO optimized** with next-seo, OpenGraph, and JSON-LD structured data
- **Newsletter integration** (Beehiiv or ConvertKit)
- **Affiliate link system** with disclosure banners
- **Platform directory** with YAML-based data
- **RSS feed & Sitemap** auto-generated
- **Plausible Analytics** integration
- **Ghost CMS import** script for content migration
- **GitHub Actions CI/CD**

## Tech Stack

- **Framework**: Next.js 15.0
- **Content**: Contentlayer + MDX
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui + Radix UI
- **Validation**: Zod
- **Analytics**: Plausible
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd alt-street
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AltStreet
NEXT_PUBLIC_SITE_DESCRIPTION=Alternative investment insights

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=altstreet.com

# Newsletter Provider (choose one)
NEWSLETTER_PROVIDER=convertkit  # or 'beehiiv'

# ConvertKit (if using)
CONVERTKIT_FORM_ID=your_form_id
CONVERTKIT_API_KEY=your_api_key

# Beehiiv (if using)
BEEHIIV_PUBLICATION_ID=your_pub_id
BEEHIIV_API_KEY=your_api_key
```

4. **Run development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
alt-street/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── posts/[slug]/        # Blog post pages
│   ├── categories/[category]/ # Category pages
│   ├── tags/[tag]/          # Tag pages
│   ├── platforms/           # Platform directory
│   ├── api/                 # API routes
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Custom components
├── content/                 # MDX content
│   ├── posts/               # Blog posts
│   └── pages/               # Static pages
├── data/                    # Data files
│   ├── platforms/           # Platform YAMLs
│   └── affiliates.json      # Affiliate links
├── lib/                     # Utilities
│   ├── config.ts            # Site configuration
│   ├── posts.ts             # Post utilities
│   ├── platforms.ts         # Platform utilities
│   └── seo.ts               # SEO utilities
├── scripts/                 # Build & migration scripts
│   └── import-ghost.ts      # Ghost CMS import
├── contentlayer.config.ts   # Contentlayer config
├── tailwind.config.ts       # Tailwind config
└── next.config.js           # Next.js config
```

## Writing Content

### Creating a New Post

1. Create a new MDX file in `content/posts/{category}/{slug}.mdx`

```mdx
---
title: Your Post Title
description: A compelling description for SEO
date: 2025-11-10
category: carbon-markets
tags: [carbon-removal, investing]
author: Your Name
affiliateLinks: [platform-id]
---

# Your Post Title

Your content here...

<Callout type="info">
Important information for readers.
</Callout>

<AffiliateButton id="platform-id" />

<SubscribeCta />
```

### Available MDX Components

- `<Callout type="info|warning|success|danger" title="Optional">` - Informational callouts
- `<ProsCons pros={[...]} cons={[...]} />` - Pros/cons comparison
- `<AffiliateButton id="affiliate-id" />` - Affiliate CTA button
- `<SubscribeCta />` - Inline newsletter signup
- `<Image />` - Next.js optimized images

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | SEO description |
| `date` | date | ✅ | Publication date (YYYY-MM-DD) |
| `category` | string | ✅ | Post category slug |
| `tags` | string[] | ❌ | Array of tags |
| `author` | string | ❌ | Author name (default: AltStreet Team) |
| `cover` | string | ❌ | Cover image path |
| `affiliateLinks` | string[] | ❌ | Affiliate IDs (triggers disclosure) |
| `toc` | boolean | ❌ | Show table of contents (default: true) |
| `updated` | date | ❌ | Last updated date |

## Adding Platforms

1. Create a YAML file in `data/platforms/{slug}.yml`:

```yaml
id: platform-name
name: Platform Name
slug: platform-slug
url: https://platform.com
category: farmland
description: Platform description
fees: 2% + 10% performance
minInvestment: $10,000
assetType: Fractional farmland
region: United States
taxForm: K-1
liquidity: Illiquid
affiliateId: affiliate-id
founded: '2020'
pros:
  - Pro 1
  - Pro 2
cons:
  - Con 1
  - Con 2
features:
  - Feature 1
  - Feature 2
```

2. Add affiliate link to `data/affiliates.json` (if applicable)

## Managing Affiliate Links

Edit `data/affiliates.json`:

```json
[
  {
    "id": "platform-id",
    "name": "Platform Name",
    "url": "https://platform.com/referral",
    "description": "Short description",
    "cta": "Get Started with Platform"
  }
]
```

Use in MDX:

```mdx
<AffiliateButton id="platform-id" />
```

## Importing from Ghost CMS

If you're migrating from Ghost:

1. Export your Ghost content (Settings → Labs → Export)

2. Run the import script:

```bash
pnpm import:ghost --file=./ghost-export.json
```

3. Review imported posts in `content/posts/imported/`

4. Move posts to appropriate category folders and update frontmatter

## Build & Deploy

### Build for Production

```bash
pnpm build
```

This will:
- Compile TypeScript
- Process Contentlayer content
- Generate static pages
- Create sitemap.xml and RSS feed

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Import project in [Vercel](https://vercel.com)

3. Add environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Newsletter provider credentials
- Any other secrets

4. Deploy

Vercel will automatically:
- Install dependencies
- Run `pnpm build`
- Deploy to global CDN

### Deploy to Other Platforms

Build output is in `.next/` directory. You can deploy to:

- **Netlify**: Add `netlify.toml` with `command = "pnpm build"`
- **Cloudflare Pages**: Set build command to `pnpm build`
- **Self-hosted**: Run `pnpm start` after `pnpm build`

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm import:ghost` | Import from Ghost CMS |

## SEO & Performance

### Built-in SEO Features

- ✅ Dynamic meta tags per page
- ✅ OpenGraph & Twitter Card tags
- ✅ Canonical URLs
- ✅ JSON-LD structured data (BlogPosting, BreadcrumbList, FAQPage)
- ✅ Auto-generated sitemap.xml
- ✅ RSS feed at /rss.xml
- ✅ Robots.txt

### Performance Optimizations

- ✅ Next.js Image optimization (AVIF/WebP)
- ✅ Static generation (ISR where appropriate)
- ✅ Font optimization
- ✅ Route prefetching
- ✅ Code splitting
- ✅ CSS/JS minification

**Target Lighthouse Score**: ≥95 on desktop

## Configuration

### Site Config

Edit `lib/config.ts` to modify:

- Site name, description, URL
- Navigation menu
- Footer links
- Categories

### Newsletter Providers

#### ConvertKit

```env
NEWSLETTER_PROVIDER=convertkit
CONVERTKIT_FORM_ID=your_form_id
CONVERTKIT_API_KEY=your_api_key
```

#### Beehiiv

```env
NEWSLETTER_PROVIDER=beehiiv
BEEHIIV_PUBLICATION_ID=your_pub_id
BEEHIIV_API_KEY=your_api_key
```

### Analytics

Add Plausible domain to `.env.local`:

```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

Script will auto-inject in production.

## Customization

### Theme Colors

Edit `app/globals.css` CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... */
}
```

### Adding Categories

1. Update `siteConfig.categories` in `lib/config.ts`
2. Add navigation link if desired
3. Create content in `content/posts/{category}/`

### Custom Components

Create components in `components/` and import in MDX:

1. Create `components/custom-component.tsx`
2. Export in `components/mdx-components.tsx`
3. Use in MDX: `<CustomComponent />`

## Troubleshooting

### Build Errors

**"Cannot find module 'contentlayer/generated'"**

Run `pnpm dev` first to generate Contentlayer types.

**"Module not found: Can't resolve '@/...'"**

Check `tsconfig.json` paths are correct.

### Content Not Showing

**Posts not appearing**

Ensure frontmatter is valid and file is in `content/posts/`.

**Platforms not loading**

Verify YAML syntax in `data/platforms/*.yml`.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this for your own projects.

## Support

For issues or questions:

- Open an issue on GitHub
- Check existing issues and discussions

---

Built with ❤️ for alternative investment enthusiasts.
