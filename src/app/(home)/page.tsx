import { BlogList } from '@/components/blog-card';
import { ConnectSection } from '@/components/connect-section';
import { ProjectCard } from '@/components/project-card';
import { Underline } from '@/components/ui/underline';
import { getPosts, getProjects } from '@/lib/server/actions';
import HeroSection from './_components/hero-section';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const posts = await getPosts();
  const projects = await getProjects();
  return (
    <main className="space-y-20 md:space-y-32 pb-20">
      {/* HERO SECTION */}
      <HeroSection />
      {/* <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Greetings />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                I am{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400  to-cyan-400">
                  Karmsetu
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-muted-foreground">
                A web and mobile app developer
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl flex items-center justify-center border">
                <AssetLoader />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ABOUT SECTION */}
      <section className="container  px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold">About Me</h2>
            <Underline />
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              I&apos;m a self-taught web developer specializing in{' '}
              <strong>Next.js</strong> and the <strong>MERN stack</strong> for
              web development,
              <strong> React Native (Expo)</strong> for mobile app development,
              and <strong>browser extension development</strong>.
            </p>
            <p>
              I also create <strong>Python scripts</strong> to simplify and
              automate everyday tasks.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      {Array.isArray(projects) && projects?.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 mb-52">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-2 mb-12">
              <h2 className="text-3xl font-bold">My Projects</h2>
              <Underline />
            </div>

            <div className="grid grid-cols-1 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <ProjectCard {...project} isShowcase={true} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BLOG SECTION */}
      {Array.isArray(posts) && posts?.length > 0 && (
        <section className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-bold">Blogs</h2>
              <Underline />
              <p className="text-xl text-muted-foreground">
                Thoughts, tutorials, and insights from my development journey.
              </p>
            </div>
            <BlogList blogs={posts} />
          </div>
        </section>
      )}

      <Separator className=" my-4" />

      {/* CONNECT SECTION */}

      <ConnectSection />
    </main>
  );
}
