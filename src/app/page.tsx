'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { getAllAvatars } from '@/data/avatars';
import type { Avatar } from '@/types/avatar';
import { AvatarGrid } from '@/components/avatars/AvatarGrid';
import { AvatarFilter } from '@/components/avatars/AvatarFilter';
import { motion, AnimatePresence } from 'framer-motion';

const allAvatars = getAllAvatars();

export default function HomePage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortOrder, setSortOrder] = useState<string>('name-asc');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = useCallback((type: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value === 'all' ? '' : value,
    }));
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortOrder(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    // Optionally reset sort order as well
    // setSortOrder('name-asc'); 
  }, []);

  const filteredAndSortedAvatars = useMemo(() => {
    let result = [...allAvatars];

    // Apply filters
    Object.entries(filters).forEach(([type, value]) => {
      if (value) {
        result = result.filter((avatar) =>
          avatar.traits.some((trait) => trait.type === type && trait.value === value)
        );
      }
    });

    // Apply sorting
    switch (sortOrder) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rarity-desc':
        result.sort((a, b) => (b.rarityScore || 0) - (a.rarityScore || 0));
        break;
      case 'rarity-asc':
        result.sort((a, b) => (a.rarityScore || 0) - (b.rarityScore || 0));
        break;
      default:
        break;
    }
    return result;
  }, [filters, sortOrder]);

  if (!mounted) {
    // Basic loading state or skeleton for SSR hydration mismatch avoidance
    return (
      <div className="space-y-8">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md h-40 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow-md aspect-square animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2">
        Explore the Punks
      </h1>
      
      <AvatarFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(filters) + sortOrder} // Re-trigger animation on filter/sort change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AvatarGrid avatars={filteredAndSortedAvatars} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
