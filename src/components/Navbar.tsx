import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 15) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > prevScrollY) {
        setIsNavbarVisible(false);
        setIsMobileMenuOpen(false); // Auto-close menu on scroll down
      } else {
        setIsNavbarVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path: string) => {
    if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/services') {
      navigate('/services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/services') {
      return location.pathname.startsWith('/services') && !location.pathname.startsWith('/contact');
    }
    if (path === '/contact') {
      return location.pathname === '/contact';
    }
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 px-6 sm:px-10 py-5 sm:py-6 flex flex-row justify-between items-center bg-transparent transition-transform duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Brand Logo & Name (Left side) */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer focus:outline-none group"
        >
          <Logo size={36} className="group-hover:scale-105 transition-transform duration-300" />
          <span className="text-[20px] sm:text-[24px] tracking-tight text-white font-medium select-none">
            RenderX
          </span>
        </button>

        {/* Desktop Navigation (Right side) */}
        <nav className="hidden md:flex items-center gap-8 text-white">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative cursor-pointer text-xs sm:text-sm uppercase tracking-wider transition-colors py-2 px-1 ${
                  active ? 'text-cyan-400 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_1px_4px_rgba(34,211,238,0.5)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed top-[76px] inset-x-6 z-40 p-6 rounded-3xl border border-white/10 bg-neutral-950/90 backdrop-blur-xl flex flex-col gap-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(item.path);
                    }}
                    className={`text-left text-base font-semibold uppercase tracking-wider transition-colors py-2 border-b border-white/5 ${
                      active ? 'text-cyan-400' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
