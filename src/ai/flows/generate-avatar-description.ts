'use server';

/**
 * @fileOverview An AI agent for generating descriptions of CryptoPunk avatars.
 *
 * - generateAvatarDescription - A function that generates a description for a given avatar.
 * - GenerateAvatarDescriptionInput - The input type for the generateAvatarDescription function.
 * - GenerateAvatarDescriptionOutput - The return type for the generateAvatarDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAvatarDescriptionInputSchema = z.object({
  avatarTraits: z
    .string()
    .describe('The traits and characteristics of the CryptoPunk avatar.'),
});
export type GenerateAvatarDescriptionInput = z.infer<typeof GenerateAvatarDescriptionInputSchema>;

const GenerateAvatarDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the CryptoPunk avatar based on its traits.'),
});
export type GenerateAvatarDescriptionOutput = z.infer<typeof GenerateAvatarDescriptionOutputSchema>;

export async function generateAvatarDescription(
  input: GenerateAvatarDescriptionInput
): Promise<GenerateAvatarDescriptionOutput> {
  return generateAvatarDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAvatarDescriptionPrompt',
  input: {schema: GenerateAvatarDescriptionInputSchema},
  output: {schema: GenerateAvatarDescriptionOutputSchema},
  prompt: `You are an expert in describing CryptoPunk avatars based on their traits.

  Given the following traits, generate a detailed and engaging description of the avatar.

  Traits: {{{avatarTraits}}}
  `,
});

const generateAvatarDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAvatarDescriptionFlow',
    inputSchema: GenerateAvatarDescriptionInputSchema,
    outputSchema: GenerateAvatarDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
