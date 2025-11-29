'use client'
import { MessageSquare, Moon, Search, Sun, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useChatContext } from '@/app/ChatPanelContextProvider';
import { ChatDrawer } from '../core/ChatDrawer';
import AddNoteButton from '../ui/AddNoteButton';
import { SearchBar } from '../core/SearchBar';

const TopBar = () => {
    const { theme, setTheme } = useTheme();
    const { isChatOpen, setIsChatOpen, toggleChat } = useChatContext();
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
      const checkScreenSize = () => {
        setIsDesktop(window.innerWidth >= 768); // md breakpoint
      };
  
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    return (
    <div className="fixed top-0 left-0 md:left-16 right-0 h-16 bg-background border-b border-border flex items-center justify-between gap-x-2 z-40 px-3 md:px-6">

      {/* Profile Button for Smaller Screen */}
      <div className='block md:hidden'>
        <div className='flex items-center'>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full w-10 h-10 bg-background text-foreground"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md min-w-0 flex-1 md:min-w-[30%] md:flex-none">
        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search in your Neurofy"
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 w-full"
        /> */}
        <SearchBar/>
      </div>
      
      {/* Icon Section */}
      <div className='flex gap-2'>
        <AddNoteButton className='md:hidden block'/>
        {
          isDesktop 
          ? (
          <Button 
            variant={isChatOpen ? "default": "outline"} 
            size="icon" 
            onClick={toggleChat}
            className="hidden md:flex items-center gap-1 md:w-auto md:px-3"
          >
            <MessageSquare className="w-4 h-4" />
            <span className='hidden md:inline'>Chat</span>
          </Button>
          )
          : (
            <ChatDrawer
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              onOpen={() => setIsChatOpen(true)}
            />
          )
        }
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex-shrink-0"
        >
            {
            theme === 'light' 
            ? <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            : <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            }
            <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  )
}

export default TopBar