import { z } from 'zod';
export const connectPostSchema = z.object({
  email: z.email(),
  message: z.string().min(5, 'not enough characters').nonempty(),
});

// export const post
