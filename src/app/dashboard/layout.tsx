// app/dashboard/layout.tsx

import { DashboardNav } from '@/components/dashboard/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 lg:ml-64 p-4 lg:p-6">{children}</main>
    </div>
  );
}
