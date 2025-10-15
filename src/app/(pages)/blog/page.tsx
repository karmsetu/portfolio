// app/blogs/page.tsx
import { getPosts } from '@/lib/server/actions';
import { BlogTable } from '../_components/blogs-table';

export type Blogs = Awaited<ReturnType<typeof getPosts>>;

export default async function BlogsPage() {
  // Sort by newest first (SSR)
  const sortedBlogs = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Minimal Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            here are all the blogs I have written...
          </p>
        </div>

        {/* Table */}
        <BlogTable blogs={sortedBlogs} />
      </div>
    </div>
  );
}
