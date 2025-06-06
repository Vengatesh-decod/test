
import { getAvatarById } from '@/data/avatars';
import { generateAvatarDescription } from '@/ai/flows/generate-avatar-description';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

interface AvatarDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: AvatarDetailPageProps): Promise<Metadata> {
  const avatar = getAvatarById(params.id);
  if (!avatar) {
    return {
      title: 'Avatar Not Found',
    };
  }
  return {
    title: `${avatar.name} | CryptoPunks`,
    description: `Details for ${avatar.name}, including traits and AI-generated description.`,
  };
}

export default async function AvatarDetailPage({ params }: AvatarDetailPageProps) {
  const avatar = getAvatarById(params.id);

  if (!avatar) {
    return (
      <div className="text-center py-20">
        <h1 className="font-headline text-3xl mb-4">Avatar Not Found</h1>
        <p className="text-muted-foreground mb-6">The avatar you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>
      </div>
    );
  }

  const traitsString = avatar.traits.map(t => `${t.type}: ${t.value}`).join(', ');
  let aiDescription = "Generating description...";
  let descriptionError = false;

  try {
    const aiResponse = await generateAvatarDescription({ avatarTraits: traitsString });
    aiDescription = aiResponse.description;
  } catch (error) {
    console.error("Failed to generate AI description for avatar", params.id, error);
    aiDescription = "Could not generate an AI description at this time. Please try again later.";
    descriptionError = true;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="outline" className="hover:bg-accent hover:text-accent-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square">
            <Image
              src={avatar.imageUrl}
              alt={avatar.name}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="pixel character"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-headline text-3xl lg:text-4xl text-primary">{avatar.name}</CardTitle>
              {avatar.rarityScore && (
                 <CardDescription className="text-sm text-muted-foreground">Rarity Score: {avatar.rarityScore}</CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="p-0 space-y-6 flex-grow">
              <div>
                <h3 className="font-headline text-lg mb-2 text-foreground">Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {avatar.traits.map((trait) => (
                    <Badge key={`${trait.type}-${trait.value}`} variant="secondary" className="px-3 py-1 text-sm">
                      <span className="font-semibold mr-1">{trait.type}:</span> {trait.value}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-headline text-lg mb-2 flex items-center text-foreground">
                  <Sparkles className="mr-2 h-5 w-5 text-accent" />
                  AI Generated Description
                </h3>
                <p className={`text-sm ${descriptionError ? 'text-destructive' : 'text-muted-foreground'} leading-relaxed`}>
                  {aiDescription}
                </p>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
