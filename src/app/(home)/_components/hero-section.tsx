'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RubikCube from '@/components/rubik-s-cube';
import { X } from 'lucide-react';

export default function HeroSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden mt-7">
      <div
        className={`container mx-auto px-4 md:px-6 transition-opacity duration-500 ${
          expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="space-y-6 text-center lg:text-left ">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              I am{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Karmsetu
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              A web and mobile app developer
            </p>
          </div>

          {/* Cube Section */}
          <div className="flex justify-center lg:justify-end min-h-[300px] sm:min-h-[400px] mt-8 sm:mt-0">
            <motion.div
              layout
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer w-full max-w-md h-64 sm:h-80 rounded-2xl flex items-center justify-center"
            >
              <RubikCube toRotate={true} />

              {/* Click Label */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 text-sm font-medium text-slate-700 tracking-wide
                  px-3 py-1 rounded-full backdrop-blur-sm bg-white/20
                  shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              >
                Click to explore
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fullscreen Cube */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            layoutId="cube"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <motion.div
              layout
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative cursor-pointer w-full h-full flex items-center justify-center"
            >
              {/* Rotating stops when expanded */}
              <RubikCube toRotate={!expanded} />

              {/* Close Button */}
              <button
                className="absolute top-6 right-8 text-white text-2xl"
                onClick={() => setExpanded(false)}
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
