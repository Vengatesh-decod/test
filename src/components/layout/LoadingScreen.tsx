
'use client';

import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export function LoadingScreen() {
  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }} // Ensure it's visible initially
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingSpinner size={64} />
    </motion.div>
  );
}
