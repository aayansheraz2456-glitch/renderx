import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, Zap, Layers, Cpu } from 'lucide-react';

export function ServicesPage() {
  const navigate = useNavigate();

  const servicesList = [
    {
      id: 'Web Development',
      title: 'Web Development',
      icon: <Layers className="w-6 h-6 text-fuchsia-400" />,
      description: 'We build blazing-fast, modern web applications using cutting-edge tech like React, Next.js, and WebGL. Our designs are highly interactive, responsive, and performance-optimized.',
      tags: ['Next.js', 'React', 'WebGL', 'Three.js']
    },
    {
      id: 'Video Editing',
      title: 'Video Editing',
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      description: 'Cinematic visual storytelling. We edit commercials, social media campaigns, and high-production content with smooth pacing, custom transitions, sound design, and professional color grading.',
      tags: ['After Effects', 'Premiere Pro', 'VFX', 'Color Grading']
    },
    {
      id: 'Graphic Designing',
      title: 'Graphic Designing',
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      description: 'Branding that stands out. We create unique logos, comprehensive brand identity guides, digital templates, and UX/UI wireframes designed to capture and hold your audience’s attention.',
      tags: ['Figma', 'Illustrator', 'Branding', 'UI/UX']
    },
    {
      id: 'AI Automations',
      title: 'AI Automations',
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      description: 'Supercharge your operations. We develop customized AI integrations, automated customer workflows, intelligence scraping, and LLM-powered systems to optimize your team’s efficiency.',
      tags: ['GPT-4', 'LangChain', 'Python', 'Workflows']
    }
  ];

  const handleServiceClick = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/services/${slug}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col gap-16 relative z-10 text-white min-h-[calc(100vh-100px)] lg:min-h-screen justify-center">
      {/* Services Header */}
      <div className="max-w-2xl flex flex-col gap-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Our Agency Services
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]"
        >
          We turn bold ideas into digital masterpieces.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed"
        >
          Select a service card below to dive deep into our specialized workflows, check out our selected project showcases, or get in touch for custom inquiries.
        </motion.p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesList.map((service, index) => {
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleServiceClick(service.title)}
              className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden group cursor-pointer"
            >
              {/* Corner chevron icon indicating link */}
              <div className="absolute top-6 right-6 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                →
              </div>

              <div className="p-3 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
