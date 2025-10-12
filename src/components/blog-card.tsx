// components/blog-list.tsx
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  slug: string;
}

interface BlogListProps {
  blogs: BlogPost[];
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-2">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate group-hover:text-primary">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {blog.content.substring(0, 80)}...
            </p>
          </div>
          <div className="flex items-center text-sm text-muted-foreground ml-4 shrink-0">
            <Calendar className="w-4 h-4 mr-2" />
            <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
          </div>
        </Link>
      ))}
    </div>
  );
}
