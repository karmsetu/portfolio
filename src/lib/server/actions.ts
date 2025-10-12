'use server';
import { prisma } from '@/lib/db';

export const getPosts = async () => {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProjects = async () => {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error(error);
  }
};
