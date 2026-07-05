import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string; // Tailwind gradient classes, e.g. "from-fuchsia-500/20 to-cyan-500/20"
}

export function ProjectCard({ title, category, description, tags, gradient }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [, setHovered] = useState(false);

  // Motion values for normalized cursor positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics configuration
  const springConfig = { damping: 20, stiffness: 180, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Increased rotation sensitivity (limits set to 22deg for more visible reaction)
  const rotateX = useTransform(springY, [-0.5, 0.5], [22, -22]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);

  // Glare position maps mapped to springs
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="w-full"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="glass-panel glass-panel-hover relative w-full h-[320px] rounded-3xl p-6 overflow-hidden flex flex-col justify-between cursor-pointer group"
      >
        {/* Reflective light glare effect */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
          className="absolute inset-0 pointer-events-none z-10"
        />

        {/* Ambient background glow matching the category theme */}
        <div className={`absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br ${gradient} opacity-20 blur-3xl rounded-full transition-all duration-500 group-hover:scale-125 group-hover:opacity-30`} />

        {/* Top Label & Title */}
        <div className="z-10 flex flex-col gap-1.5" style={{ transform: 'translateZ(20px)' }}>
          <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
            {category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
            {title}
          </h3>
        </div>

        {/* Bottom Description & Tags */}
        <div className="z-10 flex flex-col gap-4" style={{ transform: 'translateZ(10px)' }}>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-white/5 border border-white/10 text-neutral-300 transition-colors group-hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
