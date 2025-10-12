// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { connectPostSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const validatedSchema = await connectPostSchema.safeParseAsync(
      await request.json()
    );

    if (!validatedSchema.success)
      return NextResponse.json(
        { error: validatedSchema.error },
        { status: 404 }
      );

    const { email, message } = validatedSchema.data;

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        email,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
