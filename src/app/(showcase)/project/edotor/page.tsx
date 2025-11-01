'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  CodeBracketIcon,
  CpuChipIcon,
  CommandLineIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export default function EdotorShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <CodeBracketIcon className="h-8 w-8" />,
      title: 'Intelligent Code Editor',
      description:
        'Powerful Monaco Editor with syntax highlighting, auto-completion, and intelligent code suggestions.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <CpuChipIcon className="h-8 w-8" />,
      title: 'AI-Powered Assistance',
      description:
        'Advanced AI coding assistant with comprehensive analysis, optimization, and debugging capabilities.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <CommandLineIcon className="h-8 w-8" />,
      title: 'WebContainer Integration',
      description:
        'Run Node.js applications directly in the browser with full terminal access and dependency management.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <CloudArrowUpIcon className="h-8 w-8" />,
      title: 'GitHub Integration',
      description:
        'Seamlessly work with your repositories and deploy directly from the editor.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Secure Authentication',
      description:
        'Multiple sign-in options with Auth.js ensuring your projects and data remain secure.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8" />,
      title: 'Template Library',
      description:
        'Quick start with pre-configured templates for React, Express, Next.js, and more.',
      color: 'from-rose-500 to-purple-500',
    },
  ];

  const techStack = [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'TypeScript', color: 'bg-blue-600 text-white' },
    { name: 'Prisma', color: 'bg-teal-600 text-white' },
    { name: 'Auth.js', color: 'bg-gray-800 text-white' },
    { name: 'MongoDB', color: 'bg-green-600 text-white' },
    { name: 'WebContainer', color: 'bg-amber-500 text-white' },
    { name: 'XTerm', color: 'bg-gray-700 text-white' },
    { name: 'Monaco Editor', color: 'bg-blue-700 text-white' },
    { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
    { name: 'Zod', color: 'bg-purple-700 text-white' },
    { name: 'Zustand', color: 'bg-amber-700 text-white' },
    { name: 'Ollama', color: 'bg-gray-900 text-white' },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold">EDOTOR</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
              <a href="https://github.com/karmsetu/edotor">Get Started</a>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-10 lg:mb-0"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Code With{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-poppins">
              EDOTOR is a powerful and intelligent code editor that enhances
              your coding experience with advanced AI features, seamless
              integration, and professional development tools.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center">
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Start Coding
              </button>
              <button className="px-8 py-3 bg-slate-800 rounded-lg font-medium hover:bg-slate-700 transition-all">
                <a href="https://github.com/karmsetu/edotor">
                  View Documentation
                </a>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 shadow-2xl">
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-sm">
                <div className="text-purple-400">function</div>
                <div className="text-blue-400 ml-4">welcomeToEdotor</div>
                <div className="text-gray-500 ml-4">{'{'}</div>
                <div className="text-green-400 ml-8">return</div>
                <div className="text-yellow-300 ml-12">
                  &quot;Build amazing things with AI&quot;
                </div>
                <div className="text-gray-500 ml-4">{'}'}</div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg"
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg"
            >
              <WrenchScrewdriverIcon className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to build, test, and deploy your applications
            with AI assistance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-${
                feature.color.split('-')[1]
              }-500 transition-all cursor-pointer ${
                activeFeature === index ? 'ring-2 ring-purple-500' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Modern Tech Stack</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built with cutting-edge technologies for optimal performance and
            developer experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-lg ${tech.color} font-medium`}
            >
              {tech.name}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Code with Intelligence?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers building amazing projects with
            EDOTOR&apos;s AI-powered editor
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition-all">
              <a href="https://github.com/karmsetu/edotor">
                Create Your First Project
              </a>
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-all">
              <a href="https://github.com/stackblitz/starters">
                Explore Templates
              </a>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
            <span className="text-lg font-bold">EDOTOR</span>
          </div>
          <span>
            Made by{' '}
            <a href="https://github.com/karmsetu" className="font-bold">
              karmsetu
            </a>
          </span>
          <div className="text-gray-400">
            © 2025 EDOTOR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
