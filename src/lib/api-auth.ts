// lib/api-auth.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const ALLOWED_GITHUB_EMAIL = process.env.ALLOWED_GITHUB_EMAILS!.split(',');
const ALLOWED_GITHUB_IDS = process.env.ALLOWED_GITHUB_IDS!.split(',');

export async function protectAPI(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  console.log({ ALLOWED_GITHUB_EMAIL, ALLOWED_GITHUB_IDS, session });

  if (
    ALLOWED_GITHUB_EMAIL.includes(session.user.email) &&
    ALLOWED_GITHUB_IDS.includes(session.user.name)
  ) {
    return { session };
  }

  return {
    error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
  };
}
