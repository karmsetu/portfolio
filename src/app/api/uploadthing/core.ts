import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@/lib/auth';
import { ALLOWED_GITHUB_EMAIL, ALLOWED_GITHUB_IDS } from '@/lib/api-auth';

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session) throw new Error('Unauthorized');

      if (
        ALLOWED_GITHUB_EMAIL.includes(session.user.email) &&
        ALLOWED_GITHUB_IDS.includes(session.user.name)
      ) {
        return { userId: session.user.id };
      }
      throw new Error('Forbidden');
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log('File uploaded by:', metadata.userId, 'URL:', file.ufsUrl);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
