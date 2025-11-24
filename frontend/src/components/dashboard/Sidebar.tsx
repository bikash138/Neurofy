"use client";
import {
  FileText,
  Mic,
  Hash,
  Zap,
  Bell,
  Clock,
  User,
  Lightbulb,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AddNoteButton from "../ui/AddNoteButton";
import AudioRecordingModal from "@/components/core/AudioRecordingModal";

const sidebarItems = [
  { icon: FileText, label: "Notes", active: true },
  { icon: Plus, label: "Plus" },
  { icon: Mic, label: "Voice" },
  { icon: Hash, label: "Tags" },
  { icon: Zap, label: "Quick Capture" },
  { icon: Bell, label: "Notifications" },
  { icon: Clock, label: "Recent" },
  { icon: User, label: "Profile" },
];

export function Sidebar() {
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  return (
    <div className="hidden md:flex fixed left-0 z-50 top-0 h-screen w-16 bg-background border-r border-border flex-col items-center py-4 space-y-4">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-4">
        <Lightbulb className="w-5 h-5 text-primary-foreground" />
      </div>

      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isPlus = item.label === "Plus";
        return isPlus ? (
          <AddNoteButton key={index} />
        ) : (
          <button
            key={index}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-accent",
              item.active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => {
              if (item.icon === Mic || item.label === "Voice") {
                setIsRecordingModalOpen(true);
              }
            }}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}

      <AudioRecordingModal
        open={isRecordingModalOpen}
        onClose={() => setIsRecordingModalOpen(false)}
      />
    </div>
  );
}
