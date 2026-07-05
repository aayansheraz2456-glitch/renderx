import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroPage } from './components/HeroPage';
import { ServicesPage } from './components/ServicesPage';
import { SpecificServicePage } from './components/SpecificServicePage';
import { ContactPage } from './components/ContactPage';
import { motion, AnimatePresence } from 'motion/react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const isHero = location.pathname === '/';

  return (
    <div className="relative bg-neutral-950 text-white font-sans selection:bg-fuchsia-500/30 selection:text-white antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* Background glow styling */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

      {/* Persisted Navbar */}
      <Navbar />

      {/* Persisted Background Video with opacity transitions */}
      <div className={`transition-opacity duration-700 ${isHero ? 'opacity-100' : 'opacity-25'}`}>
        <BackgroundVideo />
        <div className="absolute inset-0 bg-neutral-950/60 lg:bg-neutral-950/45 pointer-events-none z-[1]" />
      </div>

      {/* Pages Router Container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HeroPage />
                </PageWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <PageWrapper>
                  <ServicesPage />
                </PageWrapper>
              }
            />
            <Route
              path="/services/:serviceId"
              element={
                <PageWrapper>
                  <SpecificServicePage />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <ContactPage />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
