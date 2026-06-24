import type { Post } from '@/types/content';
import { PostCard } from './post-card';

export const PostGrid = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/70 p-8 text-sm text-muted-foreground">
        No posts yet. Add entries to the local content layer or wire a CMS later.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.id} index={index} post={post} />
      ))}
    </div>
  );
};
