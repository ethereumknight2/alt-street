import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

const platformSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  url: z.string().url(),
  category: z.string(),
  description: z.string(),
  fees: z.string(),
  minInvestment: z.string(),
  assetType: z.string(),
  region: z.string(),
  taxForm: z.string(),
  liquidity: z.string(),
  affiliateId: z.string().optional(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  features: z.array(z.string()).optional(),
  founded: z.string().optional(),
});

export type Platform = z.infer<typeof platformSchema>;

export function getAllPlatforms(): Platform[] {
  const platformsDir = path.join(process.cwd(), 'data', 'platforms');

  if (!fs.existsSync(platformsDir)) {
    return [];
  }

  const files = fs.readdirSync(platformsDir).filter((file) => file.endsWith('.yml'));

  const platforms = files.map((file) => {
    const filePath = path.join(platformsDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    return platformSchema.parse(data);
  });

  return platforms;
}

export function getPlatformBySlug(slug: string): Platform | null {
  const platforms = getAllPlatforms();
  return platforms.find((p) => p.slug === slug) || null;
}

export function getPlatformsByCategory(category: string): Platform[] {
  const platforms = getAllPlatforms();
  return platforms.filter((p) => p.category === category);
}

export function filterPlatforms(params: {
  category?: string;
  minInvestment?: string;
  taxForm?: string;
  region?: string;
}): Platform[] {
  let platforms = getAllPlatforms();

  if (params.category) {
    platforms = platforms.filter((p) => p.category === params.category);
  }

  if (params.taxForm) {
    const taxForm = params.taxForm;
    platforms = platforms.filter((p) => p.taxForm.includes(taxForm));
  }

  if (params.region) {
    const region = params.region;
    platforms = platforms.filter((p) => p.region.includes(region));
  }

  return platforms;
}
