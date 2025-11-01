// app/showcase/page.tsx
import { Metadata } from 'next';
import ShowcaseHero from './_components/showcase-hero';
import AppScreens from './_components/app-screens';
import FeatureShowcase from './_components/features';
import TechStack from './_components/tech-stack';
import ProjectInfo from './_components/project-info';

export const metadata: Metadata = {
  title: 'Movie Boy - Project Showcase',
  description:
    'A modern movie discovery app built with Next.js, TypeScript, and TMDB API',
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ShowcaseHero />
      <AppScreens />
      <FeatureShowcase />
      <TechStack />
      <ProjectInfo />
    </div>
  );
}
