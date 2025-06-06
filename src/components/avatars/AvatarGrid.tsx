'use client';

import type { Avatar } from '@/types/avatar';
import { AvatarCard } from './AvatarCard';
import { AnimatePresence, motion } from 'framer-motion';

interface AvatarGridProps {
  avatars: Avatar[];
}

export function AvatarGrid({ avatars }: AvatarGridProps) {
  if (avatars.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No avatars match your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {avatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AvatarCard avatar={avatar} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
