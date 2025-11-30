'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}