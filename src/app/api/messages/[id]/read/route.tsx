// app/api/messages/[id]/read/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    // Update message as read
    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Message marked as read',
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Mark as read error:', error);

    // Handle message not found
    if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    );
  }
}
