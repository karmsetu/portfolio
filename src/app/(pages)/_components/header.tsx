'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  const isBlogPost = pathname.split('/').length > 2;
  return (
    <>
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={isBlogPost ? '/blog' : '/'}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {isBlogPost ? 'Blogs' : 'home'}
          </Link>
        </div>
      </header>
    </>
  );
};
