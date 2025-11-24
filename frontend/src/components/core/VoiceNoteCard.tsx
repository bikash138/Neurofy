'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceNoteCardProps {
  audioUrl?: string; // URL to the audio file
  totalDuration?: number; // Total duration in seconds (optional, can be derived from metadata)
  timestamp?: string; // Time sent (e.g. "20:30")
}

const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({
  audioUrl,
  totalDuration,
  timestamp = "20:30",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  const [duration, setDuration] = useState(totalDuration || 0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock waveform bars (static for now, could be dynamic if we analyze audio data)
  const [bars] = useState(() => Array.from({ length: 40 }, () => Math.floor(Math.random() * 40) + 10));

  // Format time helper (MM:SS)
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Cleanup on unmount only
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const initializeAudio = () => {
    if (audioRef.current || !audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    });

    // If we didn't have a duration prop, update it now
    audio.addEventListener('loadedmetadata', () => {
        if (!totalDuration) {
            setDuration(audio.duration);
        }
    });
  };

  const togglePlay = () => {
    if (!audioUrl) return;

    // Lazy init: Create audio object only on first play
    if (!audioRef.current) {
      initializeAudio();
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={cn(
        "w-full max-w-md p-4 rounded-2xl border shadow-sm transition-all duration-300 select-none",
        "bg-card dark:bg-card border-gray-200 dark:border-zinc-700 hover:shadow-md"
    )}>
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={!audioUrl}
          className={cn(
            "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors",
            "bg-primary/10 text-primary hover:bg-primary/20",
            !audioUrl && "opacity-50 cursor-not-allowed"
          )}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Waveform & Progress */}
        <div className="flex-1 flex flex-col justify-center h-10 relative">
            <div className="flex items-center gap-[3px] h-full overflow-hidden items-end">
                {bars.map((height, index) => {
                    const barProgress = (index / bars.length) * 100;
                    const isPlayed = barProgress < progress;
                    return (
                        <div
                            key={index}
                            className={cn(
                                "w-[3px] rounded-full transition-colors duration-200",
                                isPlayed ? "bg-primary" : "bg-muted-foreground/30"
                            )}
                            style={{ height: `${height}%` }}
                        />
                    );
                })}
            </div>
        </div>
      </div>

      {/* Footer: Duration & Timestamp */}
      <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 px-1">
        <span>{formatTime(isPlaying ? currentTime : duration)}</span>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

export default VoiceNoteCard;
