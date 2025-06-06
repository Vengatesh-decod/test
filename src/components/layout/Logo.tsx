'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group" aria-label="CryptoPunks Home">
      <motion.svg
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Abstract pixelated shape */}
        <rect x="20" y="20" width="20" height="20" fill="url(#logoGradient)" />
        <rect x="40" y="20" width="20" height="20" fill="hsl(var(--primary))" />
        <rect x="60" y="20" width="20" height="20" fill="url(#logoGradient)" opacity="0.7" />
        
        <rect x="20" y="40" width="20" height="20" fill="hsl(var(--accent))" />
        <rect x="40" y="40" width="20" height="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
        <rect x="60" y="40" width="20" height="20" fill="hsl(var(--primary))" opacity="0.8"/>
        
        <rect x="20" y="60" width="20" height="20" fill="url(#logoGradient)" opacity="0.6"/>
        <rect x="40" y="60" width="20" height="20" fill="hsl(var(--accent))" opacity="0.9"/>
        <rect x="60" y="60" width="20" height="20" fill="url(#logoGradient)" />
      </motion.svg>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="font-headline text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
      >
        CryptoPunks
      </motion.span>
    </Link>
  );
}
