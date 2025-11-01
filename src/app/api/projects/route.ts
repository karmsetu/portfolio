// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createProjectSchema } from '@/lib/validators';
import { protectAPI } from '@/lib/api-auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const result = await protectAPI(request);

    if (result.error) return result.error;
    const validatedResult = await createProjectSchema.safeParseAsync(
      await request.json()
    );

    if (!validatedResult.success)
      return NextResponse.json(
        { error: validatedResult.error },
        { status: 400 }
      );

    const body = validatedResult.data;

    const project = await prisma.project.create({
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
      },
    });

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
