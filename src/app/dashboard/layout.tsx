// app/dashboard/layout.tsx

import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Your allowed GitHub account(s)
const ALLOWED_GITHUB_IDS = process.env.ALLOWED_GITHUB_IDS!.split(',');
const ALLOWED_GITHUB_EMAILS = process.env.ALLOWED_GITHUB_EMAILS!.split(',');

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  if (!checkUserValidity(session)) {
    // check if the user is valid
    return <h1>Invalid user</h1>;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 lg:ml-64 p-4 lg:p-6">{children}</main>
    </div>
  );
}

const checkUserValidity = (
  session: Awaited<ReturnType<typeof auth.api.getSession>>
) => {
  if (
    ALLOWED_GITHUB_IDS.includes(session!.user.name) &&
    ALLOWED_GITHUB_EMAILS.includes(session!.user.email)
  )
    return true;

  return false;
};
