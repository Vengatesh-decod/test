
'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  const dotVariants = {
    initial: { opacity: 0.2 },
    animate: { opacity: 1 },
  };

  const dotTransition = (delay: number) => ({
    duration: 0.6,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut",
    delay,
  });

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
        className="mt-4" // Added some margin top for spacing
      >
        <motion.svg
          width="64" // Increased size for better visibility
          height="20" // Adjusted height
          viewBox="0 0 64 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading animation"
        >
          <motion.rect
            x="4" // Adjusted x positions for new width
            y="5"
            width="12" // Made squares a bit bigger
            height="12"
            fill="hsl(var(--primary))"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={dotTransition(0)}
            rx="2" // Added rounded corners
          />
          <motion.rect
            x="26" // Adjusted x positions
            y="5"
            width="12"
            height="12"
            fill="hsl(var(--accent))" 
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={dotTransition(0.2)}
            rx="2"
          />
          <motion.rect
            x="48" // Adjusted x positions
            y="5"
            width="12"
            height="12"
            fill="hsl(var(--primary))"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={dotTransition(0.4)}
            rx="2"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
