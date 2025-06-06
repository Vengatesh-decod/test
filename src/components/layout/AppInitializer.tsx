
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './LoadingScreen';

interface AppInitializerProps {
  children: ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time. In a real app, you might wait for
    // specific data or assets to load.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust duration as needed (e.g., 1500ms = 1.5s)

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Content fades in after loading screen starts to fade out
          className="flex flex-col min-h-screen" // This ensures the main content structure is maintained
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
