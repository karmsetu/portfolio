// components/dashboard-nav.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageSquare,
  FileText,
  Briefcase,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    accessKey: 'O',
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
    accessKey: 'M',
  },
  { name: 'Posts', href: '/dashboard/posts', icon: FileText, accessKey: 'P' },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase,
    accessKey: 'P',
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      authClient.signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      // You can show a toast notification here
      toast.error((error as Error).message || 'Error While Signing Out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const NavLinks = ({ isDesktop }: { isDesktop: boolean }) => (
    <div className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            data-accesskey={isDesktop ? item.accessKey : ''}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}

      {/* Logout Button */}
      <Button
        onClick={() => {
          handleLogout();
          setIsMobileOpen(false);
        }}
        variant={'outline'}
        disabled={isLoggingOut}
      >
        <LogOut className="w-4 h-4" />
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-md hover:bg-accent"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-background border-r z-40 transform transition-transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-6 h-full flex flex-col">
          <div className="flex-1">
            <NavLinks isDesktop={false} />
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 bg-background border-r p-6 fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="pt-6 h-full flex flex-col">
          <div>
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>
            <NavLinks isDesktop={true} />
          </div>
        </div>
      </nav>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
