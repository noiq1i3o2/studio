'use server';
/**
 * @fileOverview This file defines the DeenBuddyQuestionAnswering flow, which allows users to ask questions about Islam and receive answers based on relevant Islamic texts.
 *
 * @interface DeenBuddyQuestionAnsweringInput - Input for the DeenBuddyQuestionAnswering flow, containing the user's question.
 * @interface DeenBuddyQuestionAnsweringOutput - Output of the DeenBuddyQuestionAnswering flow, containing the AI's answer.
 * @function deenBuddyQuestionAnswering - The main function to ask questions and get answers about Islam.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeenBuddyQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The question about Islam the user wants to ask.'),
  language: z.string().describe('The language in which the answer should be provided.'),
});
export type DeenBuddyQuestionAnsweringInput = z.infer<typeof DeenBuddyQuestionAnsweringInputSchema>;

const DeenBuddyQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question about Islam.'),
});
export type DeenBuddyQuestionAnsweringOutput = z.infer<typeof DeenBuddyQuestionAnsweringOutputSchema>;

export async function deenBuddyQuestionAnswering(input: DeenBuddyQuestionAnsweringInput): Promise<DeenBuddyQuestionAnsweringOutput> {
  return deenBuddyQuestionAnsweringFlow(input);
}

const deenBuddyQuestionAnsweringPrompt = ai.definePrompt({
  name: 'deenBuddyQuestionAnsweringPrompt',
  input: {schema: DeenBuddyQuestionAnsweringInputSchema},
  output: {schema: DeenBuddyQuestionAnsweringOutputSchema},
  prompt: `You are Deen Buddy, a helpful AI assistant specialized in providing answers to questions about Islam. Your responses should be based on the Quran, Hadith, and the stories of the Prophets. Provide answers in {{{language}}}.\n\nUser Question: {{{question}}}`,
});

const deenBuddyQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'deenBuddyQuestionAnsweringFlow',
    inputSchema: DeenBuddyQuestionAnsweringInputSchema,
    outputSchema: DeenBuddyQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await deenBuddyQuestionAnsweringPrompt(input);
    return output!;
  }
);
