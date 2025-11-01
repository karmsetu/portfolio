// pages/index.js
'use client';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import guess_pokemon_hidden from '@/assets/images/pokeapp/guess-pokemon-hidden.png';
import home from '@/assets/images/pokeapp/home.png';
import pokemon_battle_selection from '@/assets/images/pokeapp/pokemon-battle-selection.png';
import pokemon_detail from '@/assets/images/pokeapp/pokemon-detail.png';
import poke_quiz from '@/assets/images/pokeapp/poke-quiz.png';
import guess_pokemon_visible from '@/assets/images/pokeapp/guess-pokemon-visible.png';
import pokemon_battle from '@/assets/images/pokeapp/pokemon-battle.png';
import pokemon_type from '@/assets/images/pokeapp/pokemon-type.png';
import settings from '@/assets/images/pokeapp/settings.png';

const screenshots = [
  {
    id: 'home',
    name: 'Home Screen',
    src: home.src,
    description: 'Main hub with featured Pokémon and navigation',
  },
  {
    id: 'pokemon-detail',
    name: 'Pokémon Details',
    src: pokemon_detail.src,
    description: 'Detailed stats and information for each Pokémon',
  },
  {
    id: 'pokemon-type',
    name: 'Type Explorer',
    src: pokemon_type.src,
    description: 'Explore Pokémon by type with visual organization',
  },
  {
    id: 'pokemon-battle',
    name: 'Battle System',
    src: pokemon_battle.src,
    description: 'Engaging turn-based battle interface',
  },
  {
    id: 'pokemon-battle-selection',
    name: 'Team Selection',
    src: pokemon_battle_selection.src,
    description: 'Choose your team of 3 Pokémon for battle',
  },
  {
    id: 'poke-quiz',
    name: 'Pokémon Quiz',
    src: poke_quiz.src,
    description: 'Test your knowledge with type effectiveness quizzes',
  },
  {
    id: 'guess-pokemon-hidden',
    name: 'Guess the Pokémon',
    src: guess_pokemon_hidden.src,
    description: 'Challenge yourself to identify Pokémon from silhouettes',
  },
  {
    id: 'guess-pokemon-visible',
    name: 'Guess Result',
    src: guess_pokemon_visible.src,
    description: 'Reveal the Pokémon and your result',
  },
  {
    id: 'settings',
    name: 'App Settings',
    src: settings.src,
    description: 'Customize appearance and manage app data',
  },
];

export default function PokemonAppShowcase() {
  const [activeImage, setActiveImage] = useState<
    (typeof screenshots)[0] | null
  >(null);

  const features = [
    {
      title: 'Complete Pokédex',
      description:
        'Browse all Pokémon with detailed stats, abilities, and evolution chains',
      icon: '📚',
    },
    {
      title: 'Type Explorer',
      description:
        'Discover Pokémon by type with visual organization and relationships',
      icon: '🔍',
    },
    {
      title: 'Battle Simulator',
      description:
        'Engage in turn-based battles with team selection and move strategies',
      icon: '⚔️',
    },
    {
      title: 'Guess Game',
      description:
        'Test your knowledge by identifying Pokémon from silhouettes',
      icon: '🎮',
    },
    {
      title: 'Type Quiz',
      description: 'Learn type effectiveness through interactive quizzes',
      icon: '🧠',
    },
    {
      title: 'Dark Mode',
      description: 'Customizable appearance with dark mode support',
      icon: '🌙',
    },
  ];

  const technologies = [
    { name: 'Expo', description: 'Cross-platform development' },
    { name: 'React Native', description: 'Native mobile experience' },
    { name: 'TypeScript', description: 'Type-safe codebase' },
    { name: 'NativeWind', description: 'Tailwind CSS for React Native' },
    { name: 'PokeAPI', description: 'Comprehensive Pokémon data' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Head>
        <title>PokéApp - Pokémon Companion App</title>
        <meta
          name="description"
          content="A feature-rich Pokémon app built with Expo, React Native, and PokeAPI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">PokéApp</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your ultimate Pokémon companion, built with Expo, React Native,
              and PokeAPI
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg"
              >
                <a href="https://github.com/karmsetu/pokeapp">View on GitHub</a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg"
              >
                <a href="https://github.com/karmsetu/pokeapp">Download App</a>
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-pattern"></div>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Complete Pokémon Experience
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PokéApp brings the world of Pokémon to your mobile device with a
              beautiful, intuitive interface and all the features a Pokémon
              trainer could want. Built with modern technologies for a seamless
              experience.
            </p>
            <div className="flex justify-center flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            App Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            App Screenshots
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-100 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setActiveImage(screenshot)}
              >
                <div className=" relative bg-gray-200 flex items-center justify-center">
                  <picture>
                    <img src={screenshot.src} alt={screenshot.name} />
                  </picture>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {screenshot.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {screenshot.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for enlarged screenshot */}
      {activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{activeImage.name}</h3>
              <button
                onClick={() => setActiveImage(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-[9/16] max-h-[70vh] relative bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-gray-500">
                  Enlarged view of: {activeImage.name}
                </div>
              </div>
              <p className="mt-4 text-gray-600">{activeImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Catch &apos;Em All?
          </motion.h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">PokéApp</h3>
              <p className="text-gray-400 mt-2">
                Made by Karmsetu using PokeAPI
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/karmsetu/pokeapp"
                className="text-gray-400 hover:text-white transition"
              >
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              This app is not affiliated with Nintendo or The Pokémon Company.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
