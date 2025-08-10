import { useState } from "react";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/ai-elements/prompt-input';
import type { ChatStatus } from 'ai';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  status?: ChatStatus;
}

export function ChatInput({ onSendMessage, disabled, status }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="border-t p-4 bg-background">
      <PromptInput onSubmit={handleSubmit} className="relative">
        <PromptInputTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          minHeight={60}
          maxHeight={120}
        />
        <PromptInputToolbar>
          <div /> {/* Empty div for left side */}
          <PromptInputSubmit
            disabled={!message.trim() || disabled}
            status={status}
            className="absolute right-1 bottom-1"
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}