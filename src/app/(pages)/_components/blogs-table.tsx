// components/blog-table.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Blogs } from '../blog/page';

export function BlogTable({ blogs }: { blogs: Blogs }) {
  const getReadingTime = (content: string) =>
    Math.ceil(content.split(/\s+/).length / 200); // ~200 words per minute
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Title</TableHead>
            <TableHead className="hidden sm:table-cell">Tags</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Read</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs &&
            blogs.map((blog) => (
              <TableRow
                key={blog.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors group"
              >
                <TableCell className="font-medium">
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-primary transition-colors">
                          {blog.title}
                        </span>
                        {!blog.published && (
                          <Badge variant="secondary" className="text-xs">
                            Draft
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2 sm:hidden">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(blog.createdAt, 'MMM dd')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingTime(blog.content)}m
                        </span>
                      </div>
                    </div>
                  </Link>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{blog.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3" />
                    {format(blog.createdAt, 'MMM dd, yyyy')}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(blog.content)}m</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Empty State */}
      {(!blogs || blogs.length === 0) && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No blog posts yet.</div>
        </div>
      )}
    </div>
  );
}
