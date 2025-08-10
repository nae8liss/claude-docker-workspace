import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ChatMessageProps {
  type: "user" | "muse";
  content: string;
  narration?: string;
  avatarUrl?: string;
  name?: string;
  fontSize?: number;
}

export function ChatMessage({ type, content, narration, avatarUrl, name, fontSize = 14 }: ChatMessageProps) {
  if (type === "user") {
    return (
      <div className="flex justify-end mb-4">
        <Card className="max-w-[80%] bg-primary text-primary-foreground">
          <CardContent className="p-3">
            <p style={{ fontSize: `${fontSize}px` }}>{content}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={avatarUrl} alt={name || "Muse"} />
        <AvatarFallback>{(name || "M").charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        {narration && (
          <p className="italic text-muted-foreground mb-2 font-medium" style={{ fontSize: `${fontSize}px` }}>
            {narration}
          </p>
        )}
        <Card className="max-w-[90%]">
          <CardContent className="p-3">
            <div 
              className="prose prose-sm dark:prose-invert max-w-none"
              style={{ fontSize: `${fontSize}px` }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-2 last:mb-0 ml-4">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-2 last:mb-0 ml-4">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                  code: ({ children, ...props }) => (
                    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono" {...props}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto mb-2">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-muted pl-4 italic mb-2">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}