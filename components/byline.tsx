import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { ReadTimeResults } from 'reading-time';

interface BylineProps {
  author: string;
  date: string;
  readingTime: ReadTimeResults;
  updated?: string;
}

export function Byline({ author, date, readingTime, updated }: BylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span className="font-medium">{author}</span>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
      {updated && (
        <div className="flex items-center gap-1">
          <span>Updated:</span>
          <time dateTime={updated}>{formatDate(updated)}</time>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{readingTime.text}</span>
      </div>
    </div>
  );
}
