// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { protectAPI } from '@/lib/api-auth';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    const body = await request.json();

    const project = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        role: body.role,
        tools: body.tools,
        summary: body.summary,
        outcome: body.outcome,
        imageUrl: body.imageUrl,
        githubUrl: body.githubUrl,
        liveUrl: body.liveUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
