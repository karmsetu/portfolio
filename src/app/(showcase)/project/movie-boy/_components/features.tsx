// components/showcase/FeatureShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Star, Bookmark, Globe, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Advanced Search',
    description:
      'Powerful search with filters by genre, year, rating, and language',
  },
  {
    icon: Star,
    title: 'Trendiest Movies',
    description:
      'Real-time ratings from TMDB and user search integration using Appwrite',
  },
  {
    icon: Bookmark,
    title: 'Watchlist',
    description: 'Save movies to your personal watchlist with cloud sync',
  },
  {
    icon: Globe,
    title: 'Global Cinema',
    description: 'Discover movies from around the world in multiple languages',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Live updates from TMDB API with trending and latest movies',
  },
  {
    icon: Users,
    title: 'User Profiles',
    description: 'Personalized experience with viewing history and preferences',
  },
];

export default function FeatureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            Key Features
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Designed to provide the best movie discovery experience with modern
            features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600/20 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-purple-200 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
