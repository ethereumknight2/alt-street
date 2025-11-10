import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function AffiliateDisclosure() {
  return (
    <div className="my-6 flex gap-3 rounded-lg border border-amber-500/50 bg-amber-50 p-4 dark:bg-amber-950/20">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-500" />
      <div className="text-sm">
        <p className="font-semibold text-amber-900 dark:text-amber-100">Affiliate Disclosure</p>
        <p className="mt-1 text-amber-800 dark:text-amber-200">
          This article contains affiliate links. We may earn a commission if you sign up through
          these links, at no additional cost to you. Read our full{' '}
          <Link href="/disclosures" className="underline hover:no-underline">
            disclosure policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
