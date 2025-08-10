"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onPlayStateChange: (playing: boolean) => void;
}

export function AudioPlayer({
  audioUrl,
  isPlaying: _isPlaying,
  isMuted,
  onToggleMute,
  onPlayStateChange
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl || isMuted) return;

    const playAudio = async () => {
      try {
        audio.src = audioUrl;
        await audio.play();
        onPlayStateChange(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        onPlayStateChange(false);
      }
    };

    const handleEnded = () => {
      onPlayStateChange(false);
    };

    audio.addEventListener('ended', handleEnded);
    
    if (audioUrl && !isMuted) {
      playAudio();
    }

    return () => {
      audio.removeEventListener('ended', handleEnded);
      if (audio.src) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audioUrl, isMuted, onPlayStateChange]);

  return (
    <>
      <audio ref={audioRef} preload="none" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleMute}
        className="opacity-60 hover:opacity-100"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </>
  );
}