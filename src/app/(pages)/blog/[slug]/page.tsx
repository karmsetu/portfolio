import { prisma as db } from '@/lib/db';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    omit: { id: true, published: true },
  });

  if (!post) {
    return notFound();
  }
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200); // ~200 words per minute
  return (
    <div className="min-h-screen bg-background">
      {/* Blog Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt.toDateString()}>
                {format(post.createdAt, 'MMMM dd, yyyy')}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>

            {post.updatedAt !== post.createdAt && (
              <div className="text-xs bg-muted px-2 py-1 rounded">
                Updated {format(post.updatedAt, 'MMM dd, yyyy')}
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.featuredImage && (
            <div className="my-3">
              <picture>
                <img
                  src={post.featuredImage}
                  alt={`title-image`}
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </picture>
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, '<br/>'),
            }}
          />
        </div>
      </article>
    </div>
  );
}
