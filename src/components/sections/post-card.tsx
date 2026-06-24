'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Post } from '@/types/content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/format';

export const PostCard = ({ post, index }: { post: Post; index?: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index ? index * 0.05 : 0 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <Badge>Article</Badge>
              {post.publishedAt ? (
                <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
              ) : null}
            </div>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.excerpt ?? 'Open the article to read more.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-primary">Read story</span>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
  );
};
