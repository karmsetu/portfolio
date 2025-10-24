// app/api/posts/route.ts
import { protectAPI } from '@/lib/api-auth';
import { prisma } from '@/lib/db';
import { sanitizeMarkdown } from '@/lib/sanitize';
import { createPostSchema } from '@/lib/validators';
import { NextRequest, NextResponse } from 'next/server';
import slug from 'slug';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    const reqBody = await request.json();
    const validatedSchema = await createPostSchema.safeParseAsync(reqBody);
    if (!validatedSchema.success)
      return NextResponse.json(
        { error: validatedSchema.error, message: 'Invalid input' },
        { status: 404 }
      );

    const body = validatedSchema.data;
    const slugedTitle = slug(body.title);
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: await sanitizeMarkdown(body.content),
        slug: slugedTitle,
        published: body.published || false,
        tags: body.tags,
        featuredImage: body.featuredImage,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
