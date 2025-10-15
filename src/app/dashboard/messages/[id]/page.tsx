import { prisma as db } from '@/lib/db';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const messages = await db.contactMessage.findUnique({
    where: { id },
    omit: { id: true },
  });

  if (!messages) {
    return notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Blog Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {messages.email}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={messages.createdAt.toDateString()}>
                {format(messages.createdAt, 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="blog-content" />
          {messages.message}
        </div>
      </article>
    </div>
  );
}
