import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllPlatforms } from '@/lib/platforms';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Investment Platforms Directory',
  description:
    'Compare alternative investment platforms across carbon markets, AI compute, farmland, royalties, and collectibles.',
  path: '/platforms',
});

export default function PlatformsPage() {
  const platforms = getAllPlatforms();

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ name: 'Platforms', href: '/platforms' }]} />

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Investment Platforms</h1>
        <p className="text-xl text-muted-foreground">
          Compare fees, minimums, liquidity, and tax forms across alternative investment platforms.
        </p>
      </div>

      {platforms.length === 0 ? (
        <div className="rounded-lg border bg-muted/50 p-12 text-center">
          <p className="text-lg text-muted-foreground">No platforms available yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Asset Type</TableHead>
                <TableHead>Min Investment</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Tax Form</TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/platforms/${platform.slug}`}
                      className="hover:underline"
                    >
                      {platform.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{platform.category}</Badge>
                  </TableCell>
                  <TableCell>{platform.assetType}</TableCell>
                  <TableCell>{platform.minInvestment}</TableCell>
                  <TableCell>{platform.fees}</TableCell>
                  <TableCell>{platform.taxForm}</TableCell>
                  <TableCell>{platform.liquidity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/platforms/${platform.slug}`}>
                        View
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
