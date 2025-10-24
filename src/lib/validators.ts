import { z } from 'zod';
export const connectPostSchema = z.object({
  email: z.email(),
  message: z.string().min(5, 'not enough characters').nonempty(),
});

// export const post
export const createPostSchema = z.object({
  title: z.string().min(3, 'write few more words for ').nonempty(),
  content: z.string().min(3, 'write few more words for ').nonempty(),
  published: z.boolean(),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag cannot be empty')
        .max(30, 'Tag must be 30 characters or less')
        .regex(
          /^[a-zA-Z0-9\s\-_]+$/,
          'Tag can only contain letters, numbers, spaces, hyphens, and underscores'
        )
        .transform((str) => str.trim().toLowerCase())
    )
    .refine((tags) => tags.length > 0, {
      message: 'At least one tag is required',
      path: ['tags'],
    })
    .refine((tags) => tags.length <= 10, {
      message: 'Cannot have more than 10 tags',
      path: ['tags'],
    })
    .refine(
      (tags) => {
        const uniqueTags = new Set(tags);
        return uniqueTags.size === tags.length;
      },
      {
        message: 'Tags must be unique',
        path: ['tags'],
      }
    )
    .transform((tags) => {
      // Remove empty strings and ensure uniqueness
      return Array.from(new Set(tags.filter((tag) => tag.length > 0)));
    }),
  featuredImage: z.url().optional(),
});

export const postUpdateValidator = createPostSchema.partial();

export const createProjectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  role: z.string().nonempty(),
  tools: z.string().nonempty().array(),
  summary: z.string().nonempty(),
  outcome: z.string().nonempty(),
  imageUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
