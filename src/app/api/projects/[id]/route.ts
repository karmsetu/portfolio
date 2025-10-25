// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { protectAPI } from '@/lib/api-auth';
import { updateProjectSchema } from '@/lib/validators';
import { deleteImage } from '@/utils/uploadthing-server';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: {
        id,
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

    const { id } = await params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'project not found' }, { status: 404 });
    }

    const validatedSchema = updateProjectSchema.safeParse(await request.json());
    if (!validatedSchema.success)
      return NextResponse.json(
        { error: validatedSchema.error, message: 'Invalid input' },
        { status: 404 }
      );
    const body = validatedSchema.data;

    // check if the image URL has changed
    /* ? conditions: 
           ? condition #1: previously project had an image, and now it doesn't
           ? condition #2: previous project didn't had an image and now it does 
           ? condition #3: previous project had different image then now
          */
    if (body.imageUrl! && existingProject.imageUrl) {
      await deleteImage(existingProject.imageUrl);
    } else if (
      existingProject.imageUrl &&
      body.imageUrl !== existingProject.imageUrl
    ) {
      await deleteImage(existingProject.imageUrl);
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: { ...body, updatedAt: new Date() },
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

    const { id } = await params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'project not found' }, { status: 404 });
    }

    // deleted image
    if (existingProject.imageUrl) {
      const imgDeletionResult = await deleteImage(existingProject.imageUrl);
      if (!imgDeletionResult) throw new Error('Unable to delete Image');
    }
    await prisma.project.delete({
      where: {
        id,
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
