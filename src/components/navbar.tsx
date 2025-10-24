'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blogs' },
    { href: '/connect', label: 'Connect' },
  ];

  return (
    <div className="flex justify-center mt-1.5">
      <nav className="flex items-center justify-between border border-gray-700/30 px-6 py-3 shadow-xl/20 font-light rounded-3xl bg-background/80 backdrop-blur-sm w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
        >
          Karmsetu
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all duration-200 hover:text-blue-400 ${
                pathname === item.href
                  ? 'text-blue-400 font-medium'
                  : 'text-foreground/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 bg-background border border-gray-700/30 rounded-2xl shadow-xl p-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-all duration-200 hover:text-blue-400 cursor-alias ${
                    pathname === item.href
                      ? 'text-blue-400 font-medium'
                      : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
