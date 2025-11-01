// components/AppScreens.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import searchImgage from '@/assets/images/search.jpg';
import detailsImgage from '@/assets/images/details.jpg';
import profileImage from '@/assets/images/wishlist.jpg';

const screens = [
  {
    title: 'Movie Search',
    description: 'Advanced search functionality with real-time results',
    features: ['TMDB Integration', 'Real-time filtering', 'Smart suggestions'],
    image: searchImgage.src,
  },
  {
    title: 'Movie Details',
    description: 'Comprehensive movie information and ratings',
    features: ['Detailed overview', 'Cast information', 'User ratings'],
    image: detailsImgage.src,
  },
  {
    title: 'User Profile',
    description: 'Personalized watchlist and preferences',
    features: ['Bookmark movies', 'Watch history', 'Personal ratings'],
    image: profileImage.src,
  },
] as const;

export default function AppScreens() {
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
            App Experience
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Clean, intuitive interface designed for movie enthusiasts to
            discover and explore global cinema
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {screens.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Mock Phone */}
              <div className="relative bg-slate-900 rounded-[2rem] p-4 border-2 border-purple-500/30 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                {/* Phone notch */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-lg z-10 border-b border-x border-purple-500/20" />

                {/* Screen content */}
                <div className="relative mt-6 bg-gradient-to-br from-purple-900/20 to-slate-800 rounded-2xl h-full overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                  {/* Mock app content */}
                  <div className=" relative z-10 ">
                    <picture>
                      <img
                        src={screen.image}
                        alt={`title-image`}
                        className="object-fill rounded-lg"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </div>

              {/* Screen info */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {screen.title}
                </h3>
                <p className="text-purple-200 mb-3">{screen.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {screen.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
