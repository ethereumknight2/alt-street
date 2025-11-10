import { CheckCircle, XCircle } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="my-8 grid gap-6 md:grid-cols-2">
      {/* Pros */}
      <div className="rounded-lg border border-green-500/50 bg-green-50 p-6 dark:bg-green-950/20">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-900 dark:text-green-100">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex gap-2 text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-500" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-lg border border-red-500/50 bg-red-50 p-6 dark:bg-red-950/20">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-900 dark:text-red-100">
          <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex gap-2 text-sm text-red-800 dark:text-red-200">
              <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-500" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
