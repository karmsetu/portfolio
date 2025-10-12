// components/project-card.tsx

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  role: string;
  tools: string[];
  summary: string;
  outcome: string;
  imageUrl: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  caseStudyUrl?: string | null;
}

export function ProjectCard({
  title,
  role,
  tools,
  summary,
  outcome,
  imageUrl,
  githubUrl,
  liveUrl,
  caseStudyUrl,
}: ProjectCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border-2 bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20
                 flex flex-col lg:flex-row h-full"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image container - Full width on mobile, 40% on desktop */}
      <div className="relative lg:w-2/5 h-48 lg:h-auto overflow-hidden">
        <Image
          src={imageUrl || 'https://placehold.co/600x400'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          {liveUrl && (
            <Button
              size="sm"
              className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content container - Full width on mobile, 60% on desktop */}
      <div className="flex flex-col lg:w-3/5">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{role}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary transition-all duration-300 flex-shrink-0" />
          </div>
        </CardHeader>

        <CardContent className="pb-4 space-y-4 flex-grow">
          {/* Tools badges */}
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-xs transform transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {tool}
              </Badge>
            ))}
          </div>

          {/* Problem/Solution Summary */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground/80">
              Challenge & Solution
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>

          {/* Outcome */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground/80">
              Outcome
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {outcome}
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex-shrink-0">
          <div className="flex gap-3 w-full">
            {githubUrl && (
              <Button variant="ghost" size="sm" className="flex-1" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button size="sm" className="flex-1" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Site
                </a>
              </Button>
            )}
            {caseStudyUrl && !liveUrl && (
              <Button size="sm" className="flex-1" asChild>
                <a
                  href={caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Case Study
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
