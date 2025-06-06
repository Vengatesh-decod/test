
'use client';

import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export function LoadingScreen() {
  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      >
        CryptoPunks
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <LoadingSpinner size={48} />
      </motion.div>
    </motion.div>
  );
}
