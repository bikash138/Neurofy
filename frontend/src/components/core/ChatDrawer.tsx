'use client'
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChatPanel } from './ChatPanel';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function ChatDrawer({ isOpen, onClose, onOpen }: ChatDrawerProps) {
  return (
    <div className=""> {/* Only show on mobile */}
      <Drawer open={isOpen} onOpenChange={(open) => open ? onOpen() : onClose()}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="h-[85vh]">
          {/* <DrawerHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <DrawerTitle>Chat with Mem</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader> */}
          
          {/* ChatPanel content */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel isOpen={isOpen} onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}