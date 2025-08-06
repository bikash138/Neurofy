"use client";
import { ChatPanel } from "@/components/core/ChatPanel";
import { StickyNotes } from "@/components/dashboard/StickyNotes";
import { useState, useEffect } from "react";
import { useChatContext } from "./ChatPanelContextProvider";

export default function Home() {
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
    <div>
      Landing Page
    </div>
  );
}

