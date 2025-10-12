'use client';
import { BlogList } from '@/components/blog-card';
import { ConnectSection } from '@/components/connect-section';
import Greetings from '@/components/greetings';
import { ProjectCard } from '@/components/project-card';

export default function Home() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      role: 'Full Stack Developer',
      tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Prisma'],
      summary:
        'Built a scalable e-commerce solution with real-time inventory management and secure payment processing to solve the challenge of handling high traffic volumes during sales events.',
      outcome:
        'Increased conversion rate by 35% and reduced cart abandonment by 28% through optimized performance and user experience improvements.',
      imageUrl: '/images/ecommerce-project.jpg',
      githubUrl: 'https://github.com/username/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.vercel.app',
    },
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      content:
        'Learn how to build modern web applications with Next.js and React...',
      time: '2024-01-15',
      slug: 'getting-started-with-nextjs',
    },
    {
      id: '2',
      title: 'Mastering Tailwind CSS',
      content:
        'Advanced techniques and best practices for using Tailwind CSS in your projects...',
      time: '2024-01-10',
      slug: 'mastering-tailwind-css',
    },
  ];

  return (
    <main className="">
      {/* HERO */}
      <section className=" grid sm:grid-cols-2 h-full mx-auto">
        <div className="flex flex-col p-8 pt-20 h-auto">
          <Greetings />
          <h1 className="sm:text-6xl text-5xl">
            I am{' '}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emarald-500 to-cyan-400">
              Karmsetu
            </span>
          </h1>
          <p className="font-semibold text-3xl">A web dev</p>
        </div>
        <div className="">
          {/* <Bird /> */}
          something awesome
          {/* <Globe /> */}
        </div>
      </section>

      {/* About Me */}
      <section className="h-full border border-red-400 p-8 mx-auto">
        <h3 className="font-bold text-3xl ">About Me</h3>
        <div className="w-36 h-1 bg-gradient-to-r from-blue-400 via-emarald-500 to-cyan-400  rounded-full mb-8"></div>

        <p>
          I&apos;m a self-taught web developer working with Next.js and MERN
          stack for web development, React Native (Expo) for mobile app
          development, and browser extension development.
        </p>
        <p>
          I also create Python scripts to simplify and automate everyday tasks.
        </p>
      </section>

      {/* Projects */}
      <section className="">
        <div className="min-h-screen  py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className=" mb-12">
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                My Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl ">
                A collection of projects I&apos;ve worked on.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">List Layout</h2>
        <BlogList blogs={blogPosts} />
      </section>

      {/* Connect */}
      <div className="min-h-screen bg-background">
        <ConnectSection />
      </div>
    </main>
  );
}
