"use client";
import { ChatPanel } from "@/components/core/ChatPanel";
import { useState, useEffect } from "react";
import { useChatContext } from "@/app/ChatPanelContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isChatOpen, setIsChatOpen } = useChatContext();
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if screen is desktop size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="md:ml-16 mt-16 p-3 h-[calc(100vh-4rem)] overflow-hidden">
      <div className="flex h-full max-h-full overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Desktop Chat Panel - Persistent across all pages */}
        {isChatOpen && isDesktop && (
          <div className="w-[400px] ml-2 bg-background border rounded-md flex-shrink-0 overflow-y-auto">
            <ChatPanel
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}