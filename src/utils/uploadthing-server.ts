'use server';

// lib/uploadthing-server.ts
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

/**
 * Delete an image from UploadThing using its URL or key
 * @param fileUrl - The file URL or UploadThing key
 */
export async function deleteImage(fileUrl: string): Promise<boolean> {
  try {
    if (!fileUrl) return false;
    // Extract key from UploadThing URL (usually last part of the path)
    const key = fileUrl.split('/').pop() || '';

    const res = await utapi.deleteFiles([key]);

    return res.success;
  } catch (err) {
    console.error('UploadThing deletion failed:', err);
    return false;
  }
}
