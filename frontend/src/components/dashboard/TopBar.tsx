'use client'
import { Moon, Search, Sun } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

const TopBar = () => {
    const { theme, setTheme } = useTheme();
    return (
    <div className="fixed top-0 md:left-16 right-0 h-16 bg-background border-b border-border z-40 flex items-center justify-between px-3 md:px-6">
        <div className="relative w-full max-w-md min-w-0 flex-1 md:min-w-[30%] md:flex-none">
          <Search className="absolute left-3 top-1/2 lg:top-1/4 md:top-1/4 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search in your Neurofy"
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 w-full"
          />
        </div>
        
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="ml-2 flex-shrink-0"
        >
            {
            theme === 'light' 
            ? <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            : <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            }
            <span className="sr-only">Toggle theme</span>
        </Button>
    </div>
  )
}

export default TopBar