import { useState } from 'react';
import { X, ArrowUp, MessageCircle, Plus, ChevronDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChatDrawer } from './ChatDrawer';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; text: string; isUser: boolean }>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "I'd be happy to help you with that! Let me analyze your notes and provide you with the information you're looking for.",
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="font-semibold">Neurofy</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="w-4 h-4" />
        </Button>
    </div>

    {/* Scrollable content area */}
    <div className="flex-1 overflow-y-auto">
        {/* Resume Last Chat Button */}
        <div className="p-4 border-b border-border">
        <Button variant="outline" className="w-full justify-start space-x-2">
            <ArrowUp className="w-4 h-4" />
            <span>Resume last chat</span>
        </Button>
        </div>

        {/* Ask About This Note Section */}
        <div className="p-4 space-y-4">
        <h3 className="font-semibold text-lg">Ask about this note</h3>
        
        {/* Quick Prompts */}
        <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
            Summarize this note
            </Button>
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
            What should I follow up on from this week?
            </Button>
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
            Give me an overview of my last 14 days
            </Button>
        </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4">
        {messages.map((msg) => (
            <div
            key={msg.id}
            className={cn(
                "flex",
                msg.isUser ? "justify-end" : "justify-start"
            )}
            >
            <div
                className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                msg.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
            >
                {msg.text}
            </div>
            </div>
        ))}
        </div>
    </div>

    {/* Message Input - Fixed at bottom with flexbox */}
    <div className="p-4 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2">
        <Input
            placeholder="Message your Mem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
        />
        <Button
            size="icon"
            variant="ghost"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="flex-shrink-0"
        >
            <Send className="w-4 h-4" />
        </Button>
        </div>
    </div>
    </div>
  );
}