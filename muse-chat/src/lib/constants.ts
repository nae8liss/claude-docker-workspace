import { ModelOption } from '@/types/muse';

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    maxTokens: 4096
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    maxTokens: 4096
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    maxTokens: 4096
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    maxTokens: 4096
  }
];

export const NARRATION_LENGTHS = [
  { value: 'short', label: 'Short (20-50 characters)', maxChars: 50 },
  { value: 'medium', label: 'Medium (50-100 characters)', maxChars: 100 },
  { value: 'long', label: 'Long (100-150 characters)', maxChars: 150 }
] as const;

export const DEFAULT_MUSE_CONFIG = {
  name: 'Aria',
  title: 'Creative Muse',
  description: 'A thoughtful and inspiring creative companion',
  systemPrompt: 'You are a creative and inspiring muse. Always respond with both a brief narration (action/emotion in first person) and then a thoughtful, engaging response.',
  model: 'openai/gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 1000,
  elevenlabsVoiceId: '',
  narrationLength: 'medium' as const
};