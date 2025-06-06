'use client';

import type { Avatar } from '@/types/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AvatarCardProps {
  avatar: Avatar;
}

export function AvatarCard({ avatar }: AvatarCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={`/avatars/${avatar.id}`} className="block h-full">
        <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/50 transition-shadow duration-300 ease-in-out bg-card">
          <CardHeader className="p-4">
            <CardTitle className="font-headline text-lg truncate text-primary-foreground">{avatar.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 aspect-square relative flex-grow">
            <Image
              src={avatar.imageUrl}
              alt={avatar.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-ai-hint="pixel art"
            />
          </CardContent>
          <CardFooter className="p-4 flex flex-wrap gap-2">
            {avatar.traits.slice(0, 2).map((trait) => ( // Show first 2 traits for brevity
              <Badge key={`${trait.type}-${trait.value}`} variant="secondary" className="text-xs">
                {trait.value}
              </Badge>
            ))}
            {avatar.traits.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
