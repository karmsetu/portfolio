// components/ShowcaseHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function ShowcaseHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            Movie <span className="text-purple-400">Boy</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            A modern movie discovery platform showcasing global cinema using
            TMDB API, built with Expo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="border border-purple-400 text-purple-300 hover:bg-purple-400/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
            <a
              href="https://github.com/karmsetu/rn-movie-app/"
              className=" flex items-center gap-3"
            >
              <Github size={20} />
              View Code
            </a>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
