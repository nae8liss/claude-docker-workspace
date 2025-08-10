export interface MuseConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  systemPrompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  elevenlabsVoiceId: string;
  narrationLength: 'short' | 'medium' | 'long';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ElevenlabsVoice {
  voice_id: string;
  name: string;
  category: string;
}

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
}