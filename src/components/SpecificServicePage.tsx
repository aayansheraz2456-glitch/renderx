import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { Layers, Zap, Award, Cpu } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
}

export function SpecificServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();



  // Map service slug to service details
  const servicesMap: Record<
    string,
    {
      title: string;
      icon: React.ReactNode;
      description: string;
      tags: string[];
      gradientClass: string;
    }
  > = {
    'web-development': {
      title: 'Web Development',
      icon: <Layers className="w-8 h-8 text-fuchsia-400" />,
      description: 'We build blazing-fast, modern web applications using cutting-edge technologies like React, Next.js, and WebGL. Our designs are highly interactive, responsive, and performance-optimized.',
      tags: ['Next.js', 'React', 'WebGL', 'Three.js', 'Tailwind CSS', 'TypeScript'],
      gradientClass: 'from-fuchsia-400 to-purple-400'
    },
    'video-editing': {
      title: 'Video Editing',
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      description: 'Cinematic visual storytelling. We edit commercials, social media campaigns, and high-production content with smooth pacing, custom transitions, sound design, and professional color grading.',
      tags: ['Premiere Pro', 'After Effects', 'VFX', 'Color Grading', 'Sound Design', 'Storyboarding'],
      gradientClass: 'from-purple-400 to-pink-400'
    },
    'graphic-designing': {
      title: 'Graphic Designing',
      icon: <Award className="w-8 h-8 text-cyan-400" />,
      description: 'Branding that stands out. We create unique logos, comprehensive brand identity guides, digital templates, and UX/UI wireframes designed to capture and hold your audience’s attention.',
      tags: ['Figma', 'Illustrator', 'Photoshop', 'Branding', 'UI/UX Design', 'Typography'],
      gradientClass: 'from-cyan-400 to-blue-400'
    },
    'ai-automations': {
      title: 'AI Automations',
      icon: <Cpu className="w-8 h-8 text-teal-400" />,
      description: 'Supercharge your operations. We develop customized AI integrations, automated customer workflows, intelligence scraping, and LLM-powered systems to optimize your team’s efficiency.',
      tags: ['GPT-4', 'LangChain', 'Python', 'FastAPI', 'Automation', 'Workflow Logic'],
      gradientClass: 'from-teal-400 to-cyan-400'
    }
  };

  const allProjects: Project[] = [
    {
      id: 1,
      title: 'Stripe-like Glassmorphic Dashboard',
      category: 'Web Development',
      description: 'A premium, highly animated financial platform featuring real-time WebGL analytics charts, custom ledger grids, and smooth state updates.',
      tags: ['React', 'WebGL', 'Tailwind', 'Framer Motion'],
      gradient: 'from-fuchsia-500/20 to-purple-500/20'
    },
    {
      id: 2,
      title: 'Decentralized Crypto Asset Portal',
      category: 'Web Development',
      description: 'Next-generation asset management portal with secure wallet connections, smooth token swap interfaces, and 3D visualizers.',
      tags: ['Next.js', 'Web3', 'TypeScript', 'Tailwind'],
      gradient: 'from-cyan-500/20 to-teal-500/20'
    },
    {
      id: 3,
      title: 'Cyberpunk Apparel Promo Reel',
      category: 'Video Editing',
      description: 'High-energy visual promo incorporating fast-paced pacing, glowing holographic overlays, custom kinetic type, and stylized SFX.',
      tags: ['Premiere Pro', 'After Effects', 'VFX', 'SFX'],
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 4,
      title: 'Cinematic AI Explainer Commercial',
      category: 'Video Editing',
      description: 'Clean explainer video utilizing vector animations and smooth transitions to illustrate modern cargo delivery automation.',
      tags: ['Motion Graphics', 'Sound Design', 'After Effects'],
      gradient: 'from-teal-500/20 to-cyan-500/20'
    },
    {
      id: 5,
      title: 'Aura Skincare Brand System',
      category: 'Graphic Designing',
      description: 'Complete visual identity overhaul featuring premium packaging, modern minimalist typography guidelines, and responsive logo variations.',
      tags: ['Illustrator', 'Figma', 'Branding', 'Design System'],
      gradient: 'from-pink-500/20 to-purple-500/20'
    },
    {
      id: 6,
      title: 'Vortex Dark UI Token Library',
      category: 'Graphic Designing',
      description: 'A comprehensive dark-themed glassmorphic component layout library utilized by multiple enterprise teams.',
      tags: ['Figma', 'UI/UX', 'Component Library'],
      gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 7,
      title: 'Echo Customer Care Agent',
      category: 'AI Automations',
      description: 'An autonomous customer support agent integrating GPT-4, semantic database vectors, and dynamic API execution pipelines.',
      tags: ['LangChain', 'Node.js', 'OpenAI', 'Pinecone'],
      gradient: 'from-blue-500/20 to-teal-500/20'
    },
    {
      id: 8,
      title: 'Automatic Workflow Synthesizer',
      category: 'AI Automations',
      description: 'A python-driven background engine mapping customer support emails, Slack reminders, and CRM ledger logs seamlessly.',
      tags: ['Python', 'FastAPI', 'Automation', 'Airflow'],
      gradient: 'from-teal-500/20 to-fuchsia-500/20'
    }
  ];

  const currentService = servicesMap[serviceId || ''] || servicesMap['web-development'];

  // Filter projects by current service category
  const filteredProjects = allProjects.filter(
    (project) => project.category.toLowerCase() === currentService.title.toLowerCase()
  );

  // Scroll to section if specified in URL query parameters
  const scrollParam = searchParams.get('scroll') || '';
  useEffect(() => {
    if (scrollParam) {
      setTimeout(() => {
        const element = document.getElementById(scrollParam);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollParam, serviceId]);



  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col gap-24 relative z-10 text-white">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/services')}
          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>←</span> Back to Services
        </button>
      </div>

      {/* Service Details Section */}
      <section id="services" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 w-fit">
              {currentService.icon}
            </div>
            <span className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${currentService.gradientClass} bg-clip-text text-transparent`}>
              Service Overview
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {currentService.title} Services.
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            {currentService.description}
          </p>
        </div>

        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentService.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Specific Projects Section */}
      <section id="projects" className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-lg">
          <span className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${currentService.gradientClass} bg-clip-text text-transparent`}>
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Our {currentService.title} Projects.
          </h2>
        </div>

        {/* Projects Grid (Only matching current category) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              tags={project.tags}
              gradient={project.gradient}
            />
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="pt-12 border-t border-white/10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          <span className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${currentService.gradientClass} bg-clip-text text-transparent`}>
            Start Your Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let's build a new <br /> {currentService.title} solution.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Ready to collaborate on {currentService.title}? Click below to send over your scope and specs on our dedicated inquiry desk, and we will set up a sync call.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/contact?service=${serviceId}`)}
          className={`cursor-pointer px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest text-neutral-950 bg-gradient-to-r ${currentService.gradientClass} shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all duration-300`}
        >
          Get In Touch &rarr;
        </motion.button>
      </section>
    </div>
  );
}
