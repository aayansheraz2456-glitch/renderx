import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ServiceSelectorProps {
  onConfirm: (selectedService: string) => void;
}

export function ServiceSelector({ onConfirm }: ServiceSelectorProps) {
  const [service, setService] = useState<string | null>(null);
  const options = [
    'Web Development',
    'Video Editing',
    'Graphic Designing',
    'AI Automations'
  ];

  const toggleService = (option: string) => {
    if (service === option) {
      setService(null);
    } else {
      setService(option);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-medium tracking-tight mb-2 text-white">
        What sort of service?
      </h2>
      <p className="opacity-70 text-neutral-300 mb-8 text-sm">
        Select a service to get started
      </p>

      {/* Service Pills Container */}
      <div className="flex flex-wrap gap-3 mb-8">
        {options.map((option) => {
          const isActive = service === option;
          return (
            <motion.button
              key={option}
              onClick={() => toggleService(option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer transition-all duration-200 select-none ${
                isActive
                  ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 text-white border border-fuchsia-500/50 shadow-md shadow-fuchsia-500/5'
                  : 'bg-neutral-900/60 text-neutral-300 border border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0, width: 0 }}
                    animate={{ scale: 1, opacity: 1, width: 'auto' }}
                    exit={{ scale: 0, opacity: 0, width: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex items-center"
                  >
                    <Check size={14} className="stroke-[3] text-cyan-400" />
                  </motion.span>
                )}
              </AnimatePresence>
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Status Banner */}
      <div className="min-h-[72px] flex items-center">
        <AnimatePresence mode="wait">
          {service === null ? null : (
            <motion.div
              key="banner"
              initial={{ height: 0, opacity: 0, y: 10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="overflow-hidden w-full"
            >
              <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-row justify-between items-center shadow-lg shadow-fuchsia-500/2">
                <div className="flex flex-col gap-1 pr-4">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                    Selected Service
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white">
                    Ready to inquire about:{' '}
                    <span className="font-semibold text-fuchsia-300">
                      {service}
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => onConfirm(service)}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors uppercase text-[11px] sm:text-xs font-bold tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2.5 rounded-xl cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Let's Go
                  <span className="text-sm">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
