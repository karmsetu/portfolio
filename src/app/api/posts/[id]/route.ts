import { z } from 'zod';
import { prisma } from '@/lib/db';
import { postUpdateValidator } from '@/lib/validators';
import { NextRequest, NextResponse } from 'next/server';
import slugger from 'slug';
import { protectAPI } from '@/lib/api-auth';
import { deleteImage } from '@/utils/uploadthing-server';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    const { id } = await params;
    const json = await request.json();

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Validate input
    const validatedData = postUpdateValidator.parse({
      ...json,
    });

    let slug = existingPost.slug;

    // Generate new slug if title changed
    if (validatedData.title && validatedData.title !== existingPost.title) {
      slug = slugger(validatedData.title);
    }

    // check if the image URL has changed
    /* ? conditions: 
     ? condition #1: previously post had an image, and now it doesn't
     ? condition #2: previous post didn't had an image and now it does 
     ? condition #3: previous post had different image then now
    */
    if (validatedData.featuredImage! && existingPost.featuredImage) {
      await deleteImage(existingPost.featuredImage);
    } else if (
      existingPost.featuredImage &&
      validatedData.featuredImage !== existingPost.featuredImage
    ) {
      await deleteImage(existingPost.featuredImage);
    }

    // Update post
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...validatedData,
        slug,
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error updating post:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    const { id } = await params;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // deleted image
    if (existingPost.featuredImage) {
      const imgDeletionResult = await deleteImage(existingPost.featuredImage);
      if (!imgDeletionResult) throw new Error('Unable to delete Image');
    }

    // Delete post
    await prisma.post.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/blog');

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
