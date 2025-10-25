import { ProjectCard } from '@/components/project-card';
import { prisma as db } from '@/lib/db';
import { Rocket } from 'lucide-react';

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!projects?.length) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-muted/50">
              <Rocket className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Projects Coming Soon
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I&apos;m currently working on some exciting projects. Stay tuned
              for updates!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                My Projects
              </h1>
            </div>
          </div>

          {/* Animated Projects Grid */}
          <div className="grid gap-10">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                <ProjectCard {...project} isShowcase={false} />
              </div>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-20 pt-8 border-t">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {projects.length}
              </span>{' '}
              project{projects.length !== 1 ? 's' : ''} and counting...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
