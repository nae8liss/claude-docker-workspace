import { createOpenAI } from '@ai-sdk/openai';
import { streamText, generateText } from 'ai';
import { MuseConfig } from '@/types/muse';
import { NARRATION_LENGTHS } from './constants';

export interface StreamResponse {
  narration: string;
  response: AsyncIterable<string>;
}

export class OpenRouterService {
  private static getApiKey(): string {
    // Hardcoded API key for testing
    const apiKey = 'sk-or-v1-your-openrouter-key-here';
    return apiKey;
  }

  private static getClient() {
    return createOpenAI({
      apiKey: this.getApiKey(),
      baseURL: 'https://openrouter.ai/api/v1',
    });
  }

  private static buildSystemPrompt(muse: MuseConfig, userMessage: string): string {
    const narrationLength = NARRATION_LENGTHS.find(n => n.value === muse.narrationLength);
    const maxNarrationChars = narrationLength?.maxChars || 100;

    return `${muse.systemPrompt}

IMPORTANT RESPONSE FORMAT:
You must respond in exactly this format:

[NARRATION: A brief first-person action or emotional response in italics, max ${maxNarrationChars} characters]

[RESPONSE: Your main detailed response to the user]

The narration should be a short, atmospheric description of your reaction (e.g., "*leans forward with curiosity*", "*pauses thoughtfully*", "*eyes light up with understanding*").

The response should be your full, thoughtful reply to: "${userMessage}"`;
  }

  static async generateResponse(
    muse: MuseConfig,
    userMessage: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
  ): Promise<StreamResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(muse, userMessage);
      
      // Build messages array with conversation history
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ] as const;

      const client = this.getClient();

      // First, generate a quick narration response
      const narrationResult = await generateText({
        model: client(muse.model),
        messages: messages as Parameters<typeof generateText>[0]['messages'],
        temperature: Math.min(muse.temperature + 0.2, 1.0) // Slightly more creative for narration
      });

      // Extract narration from response
      const narrationMatch = narrationResult.text.match(/\[NARRATION: (.*)\]/);
      const narration = narrationMatch ? narrationMatch[1].replace(/\*/g, '').trim() : '*thinks quietly*';

      // Then stream the full response
      const streamResult = await streamText({
        model: client(muse.model),
        messages: [
          ...messages,
          { role: 'assistant', content: `[NARRATION: ${narration}]` },
          { role: 'user', content: 'Now provide your detailed response:' }
        ] as Parameters<typeof streamText>[0]['messages'],
        temperature: muse.temperature
      });

      return {
        narration,
        response: streamResult.textStream
      };
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to generate response. Please check your API key and try again.');
    }
  }

  static async testConnection(apiKey: string): Promise<boolean> {
    try {
      const client = createOpenAI({
        apiKey,
        baseURL: 'https://openrouter.ai/api/v1',
      });

      await generateText({
        model: client('openai/gpt-4o-mini'),
        messages: [{ role: 'user', content: 'Test' }] as Parameters<typeof generateText>[0]['messages']
      });
      return true;
    } catch {
      return false;
    }
  }
}