import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AudioPlayer } from "@/components/audio-player";
import { Type, Settings } from "lucide-react";

interface MuseHeaderProps {
  name: string;
  title: string;
  avatarUrl?: string;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onConfigClick: () => void;
  audioUrl: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onPlayStateChange: (playing: boolean) => void;
}

export function MuseHeader({ 
  name, 
  title, 
  avatarUrl, 
  fontSize, 
  onFontSizeChange, 
  onConfigClick,
  audioUrl,
  isPlaying,
  isMuted,
  onToggleMute,
  onPlayStateChange
}: MuseHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{name}</h1>
          <Badge variant="secondary" className="text-xs w-fit">
            {title}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <AudioPlayer
          audioUrl={audioUrl}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onPlayStateChange={onPlayStateChange}
        />
        <Button variant="ghost" size="sm" onClick={onConfigClick}>
          <Settings className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          <Slider
            value={[fontSize]}
            onValueChange={(value) => onFontSizeChange(value[0])}
            max={18}
            min={12}
            step={1}
            className="w-20"
          />
          <span className="text-xs text-muted-foreground w-8">{fontSize}px</span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}