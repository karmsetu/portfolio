// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  tools: string[];
  summary: string;
  outcome: string;
  imageUrl?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  role: string;
  tools: string[];
  summary: string;
  outcome: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;
