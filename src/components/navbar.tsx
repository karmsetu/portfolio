'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blogs' },
    { href: '/connect', label: 'Connect' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <div className="flex justify-center mt-1.5">
      <nav className="relative flex items-center justify-between border border-gray-700/30 px-6 py-3 shadow-xl/20 font-light rounded-3xl bg-background/80 backdrop-blur-sm w-full max-w-md z-40">
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
              className={`transition-all duration-200 hover:text-blue-400 font-bold ${
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
        <button
          className="md:hidden z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay (clicking closes menu) */}
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-full bg-background/95 border border-gray-700/30 rounded-2xl shadow-xl p-4 md:hidden z-50 pointer-events-auto"
              >
                <div className="flex flex-col gap-3 text-center">
                  {navItems.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
