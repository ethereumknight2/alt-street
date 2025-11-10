import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

import type { Post } from 'contentlayer/generated';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={post.pathname} className="block">
        {post.cover && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDate(post.date)}
            </div>
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.author}</span>
            <span>{post.readingTime.text}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
