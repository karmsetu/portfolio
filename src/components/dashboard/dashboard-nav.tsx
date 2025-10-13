// components/dashboard-nav.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  FileText,
  Briefcase,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Posts', href: '/dashboard/posts', icon: FileText },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavLinks = () => (
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
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}
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
        <nav className="p-6 h-full overflow-y-auto">
          <NavLinks />
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 bg-background border-r p-6 fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="pt-6">
          <h1 className="text-xl font-bold mb-6">Dashboard</h1>
          <NavLinks />
        </div>
      </nav>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
