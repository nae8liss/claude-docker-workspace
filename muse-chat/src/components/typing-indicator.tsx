import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  avatarUrl?: string;
  name: string;
}

export function TypingIndicator({ avatarUrl, name }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 mb-4">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
        <span className="text-sm text-muted-foreground italic">thinking...</span>
      </div>
    </div>
  );
}