import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface TagPillsProps {
  tags: string[];
}

export function TagPills({ tags }: TagPillsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`}>
          <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors">
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
