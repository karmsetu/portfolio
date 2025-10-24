import { ZodError } from 'zod';

export const formatZodErrors = (error: ZodError) => {
  const o: { [k: string]: string } = {};

  error.issues.forEach((issue) => {
    o[issue.path[0] as string] = issue.message;
  });

  return o;
};
