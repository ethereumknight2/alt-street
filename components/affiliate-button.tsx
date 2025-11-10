'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAffiliateLink } from '@/lib/affiliates';

interface AffiliateButtonProps {
  id: string;
  className?: string;
}

export function AffiliateButton({ id, className }: AffiliateButtonProps) {
  const affiliate = getAffiliateLink(id);

  if (!affiliate) {
    return (
      <div className="my-4 rounded-lg border border-red-500/50 bg-red-50 p-4 dark:bg-red-950/20">
        <p className="text-sm text-red-800 dark:text-red-200">
          Affiliate link &quot;{id}&quot; not found.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link
          href={affiliate.url}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          {affiliate.cta || `Visit ${affiliate.name}`}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      {affiliate.description && (
        <p className="mt-2 text-sm text-muted-foreground">{affiliate.description}</p>
      )}
    </div>
  );
}
