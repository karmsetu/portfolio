// components/ProjectInfo.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Code, Database, Zap, Users, Smartphone } from 'lucide-react';

const stats = [
  { icon: Code, label: 'Frontend', value: 'Expo + TypeScript' },
  { icon: Database, label: 'Backend', value: 'Appwrite' },
  { icon: Zap, label: 'Performance', value: 'Expo Optimized' },
  { icon: Users, label: 'API', value: 'TMDB Integration' },
  { icon: Smartphone, label: 'Responsive', value: 'Mobile First' },
  { icon: Calendar, label: 'Built', value: '2024' },
];

export default function ProjectInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Project Details
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            A comprehensive movie discovery platform that showcases modern app
            development practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center"
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-purple-300 text-sm">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                About Movie Boy
              </h3>
              <p className="text-purple-200 leading-relaxed">
                Movie Boy is a modern web application that leverages the TMDB
                API to provide users with a comprehensive movie discovery
                experience. The app features advanced search capabilities,
                personalized watchlists, and real-time movie data.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-3">
                Key Achievements
              </h4>
              <ul className="text-purple-200 space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Built responsive design with Nativewind CSS and Moti
                  components
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Integrated multiple APIs including TMDB for real-time movie
                  data
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Implemented user wish-listing and personalized features
                </li>
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="border border-purple-400 text-purple-300 hover:bg-purple-400/10 px-6 py-3 rounded-full font-semibold transition-colors">
                <a href="https://github.com/karmsetu/rn-movie-app/">
                  GitHub Repository
                </a>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
