"use client";

import { useState, useEffect } from "react";
import { MuseHeader } from "@/components/muse-header";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { TypingIndicator } from "@/components/typing-indicator";
import { MuseConfigModal } from "@/components/muse-config-modal";
import { MuseStorage } from "@/lib/muse-storage";
import { OpenRouterService } from "@/lib/openrouter-service";
import { ElevenLabsService } from "@/lib/elevenlabs-service";
import { MuseConfig } from "@/types/muse";
import packageJson from "../../package.json";

interface Message {
  id: string;
  type: "user" | "muse";
  content: string;
  narration?: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fontSize, setFontSize] = useState(14);
  const [currentMuse, setCurrentMuse] = useState<MuseConfig | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize muse on component mount
    const muse = MuseStorage.initializeDefaultMuse();
    setCurrentMuse(muse);
    
    // Set welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "muse",
      content: `Welcome to our conversation! I'm ${muse.name}, your ${muse.title.toLowerCase()}. ${muse.description} What would you like to explore today?`,
      narration: "*settles gracefully into the conversation, eyes bright with curiosity*",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Cleanup audio URLs on unmount
  useEffect(() => {
    return () => {
      if (currentAudioUrl) {
        ElevenLabsService.cleanupAudioUrl(currentAudioUrl);
      }
    };
  }, [currentAudioUrl]);

  const handleSendMessage = async (content: string) => {
    if (!currentMuse || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add placeholder message that will be updated with streaming content
    const placeholderResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "muse",
      content: "",
      narration: "",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, placeholderResponse]);

    try {
      // API key is now hardcoded, proceed with real responses

      const result = await OpenRouterService.generateResponse(
        currentMuse,
        content,
        conversationHistory
      );

      // Update message with narration immediately
      setMessages(prev => prev.map(msg => 
        msg.id === placeholderResponse.id 
          ? { ...msg, narration: result.narration }
          : msg
      ));

      // Generate TTS for narration if voice ID is provided and not muted
      if (currentMuse.elevenlabsVoiceId && !isMuted && result.narration) {
        try {
          const audioBuffer = await ElevenLabsService.generateSpeech(
            result.narration,
            currentMuse.elevenlabsVoiceId
          );
          
          // Clean up previous audio URL
          if (currentAudioUrl) {
            ElevenLabsService.cleanupAudioUrl(currentAudioUrl);
          }
          
          const audioUrl = ElevenLabsService.createAudioUrl(audioBuffer);
          setCurrentAudioUrl(audioUrl);
        } catch (error) {
          console.error('TTS generation failed:', error);
          // Continue without audio - don't block the conversation
        }
      }

      // Stream the response content
      let accumulatedContent = "";
      for await (const chunk of result.response) {
        accumulatedContent += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === placeholderResponse.id 
            ? { ...msg, content: accumulatedContent }
            : msg
        ));
      }

      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: accumulatedContent }
      ]);

    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: placeholderResponse.id,
        type: "muse",
        content: "I apologize, but I'm having trouble connecting to the AI service right now. Please check your API key configuration and try again.",
        narration: "*looks concerned and slightly frustrated*",
        timestamp: new Date(),
      };

      setMessages(prev => prev.map(msg => 
        msg.id === placeholderResponse.id ? errorMessage : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = (config: MuseConfig) => {
    MuseStorage.saveMuseConfig(config);
    MuseStorage.setActiveMuseId(config.id);
    setCurrentMuse(config);
    
    // Reset conversation history when switching muses
    setConversationHistory([]);
    
    // Update welcome message with new muse
    const welcomeMessage: Message = {
      id: "welcome",
      type: "muse",
      content: `Hello! I'm ${config.name}, your ${config.title.toLowerCase()}. ${config.description} How can I assist you today?`,
      narration: "*adjusts to the new configuration with renewed purpose*",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  if (!currentMuse) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      <MuseHeader 
        name={currentMuse.name} 
        title={currentMuse.title} 
        avatarUrl={currentMuse.avatarUrl}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onConfigClick={() => setIsConfigModalOpen(true)}
        audioUrl={currentAudioUrl}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onPlayStateChange={setIsPlaying}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            type={message.type}
            content={message.content}
            narration={message.narration}
            avatarUrl={currentMuse.avatarUrl}
            name={currentMuse.name}
            fontSize={fontSize}
          />
        ))}
        {isLoading && (
          <TypingIndicator 
            avatarUrl={currentMuse.avatarUrl} 
            name={currentMuse.name} 
          />
        )}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isLoading} 
        status={isLoading ? 'streaming' : 'ready'}
      />

      <MuseConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={handleSaveConfig}
        initialConfig={currentMuse}
      />
      
      {/* Version number */}
      <div className="fixed bottom-2 right-2 text-xs text-muted-foreground opacity-50 pointer-events-none">
        v{packageJson.version}
      </div>
    </div>
  );
}
