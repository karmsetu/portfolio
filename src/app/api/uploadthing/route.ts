// app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next';
import { uploadRouter } from './core';

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
