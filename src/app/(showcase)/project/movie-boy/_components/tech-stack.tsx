// components/TechStack.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const technologies = [
  { name: 'Expo SDK 54', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Appwrite', category: 'Database' },
  {
    name: 'Nativewind CSS',
    category: 'Styling',
  },
  {
    name: 'TMDB API',
    category: 'Data Source',
  },
  {
    name: 'Moti',
    category: 'Animation',
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Built with modern technologies for optimal performance and developer
            experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl backdrop-blur-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* <div className="text-2xl mb-2">{tech.icon}</div> */}
                <div className="text-lg font-bold text-white mb-1">
                  {tech.name}
                </div>
                <div className="text-sm text-white/70">{tech.category}</div>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
