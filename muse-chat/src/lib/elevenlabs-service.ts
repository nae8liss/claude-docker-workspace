export interface VoiceOption {
  voice_id: string;
  name: string;
  category: string;
}

export class ElevenLabsService {
  private static getApiKey(): string {
    // Hardcoded API key for testing
    const apiKey = 'your-elevenlabs-key-here';
    return apiKey;
  }

  static async generateSpeech(text: string, voiceId: string): Promise<ArrayBuffer> {
    const apiKey = this.getApiKey();
    
    if (!text.trim()) {
      throw new Error('Text cannot be empty');
    }

    if (!voiceId) {
      throw new Error('Voice ID is required');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', response.status, errorText);
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  static async getVoices(): Promise<VoiceOption[]> {
    const apiKey = this.getApiKey();
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`);
      }

      const data = await response.json();
      return data.voices.map((voice: unknown) => {{
        const v = voice as { voice_id: string; name: string; category?: string };
          voice_id: v.voice_id,
          name: v.name,
          category: v.category || 'user'
        };
      });
    } catch (error) {
      console.error('Error fetching voices:', error);
      // Return some default voice options if API fails
      return [
        { voice_id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', category: 'premade' },
        { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', category: 'premade' },
        { voice_id: 'VR6AewLTigWG4xSOukaG', name: 'Antoni', category: 'premade' },
      ];
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      await this.getVoices();
      return true;
    } catch {
      return false;
    }
  }

  static createAudioUrl(audioBuffer: ArrayBuffer): string {
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  }

  static cleanupAudioUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}