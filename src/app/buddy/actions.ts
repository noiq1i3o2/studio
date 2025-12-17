'use server';

import { deenBuddyQuestionAnswering, DeenBuddyQuestionAnsweringInput } from '@/ai/flows/deen-buddy-question-answering';

export async function askDeenBuddy(input: DeenBuddyQuestionAnsweringInput): Promise<string> {
  try {
    const result = await deenBuddyQuestionAnswering(input);
    return result.answer;
  } catch (error) {
    console.error("Error in askDeenBuddy action:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
}
