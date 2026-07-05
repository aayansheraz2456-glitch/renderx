import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ServiceSelector } from './ServiceSelector';

export function HeroPage() {
  const navigate = useNavigate();
  const { displayed, done } = useTypewriter("we render the\nfuture of digital.", 38, 600);

  const handleConfirmService = (service: string) => {
    const slug = service.toLowerCase().replace(/\s+/g, '-');
    navigate(`/services/${slug}`);
  };

  return (
    <main
      id="spade-hero"
      className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-screen pt-24 sm:pt-28 lg:pt-32 relative"
    >
      {/* Immersive ambient glows styled as hardware-friendly radial gradients (no slow blur filters) */}
      <motion.div
        animate={{
          x: [0, 45, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.6, 0.9, 0.6, 0.6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, rgba(217,70,239,0) 70%)',
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [0, -35, 45, 0],
          y: [0, 25, -35, 0],
          scale: [1, 0.9, 1.25, 1],
          opacity: [0.6, 0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0) 70%)',
        }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] pointer-events-none -z-10"
      />

      {/* Animated Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h1 className="text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(217,70,239,0.15)]">
            {displayed}
          </span>
          {!done && (
            <span className="inline-block w-[3px] h-[1em] bg-cyan-400 align-middle ml-[4px] animate-blink shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          )}
        </h1>
      </motion.div>

      {/* Animated Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full"
      >
        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-normal mb-14 max-w-2xl drop-shadow-xs">
          We craft immersive web experiences, high-production video stories, <br />
          tailored graphic branding, and autonomous AI system logic.
        </p>
      </motion.div>

      {/* Service selector */}
      <ServiceSelector onConfirm={handleConfirmService} />
    </main>
  );
}
