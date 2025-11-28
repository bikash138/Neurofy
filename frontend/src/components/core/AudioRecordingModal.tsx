"use client";
import { Mic, Play, Square, Trash2, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AudioRecordingModal({ open, onClose }: Props) {
  if (!open) return null;

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const chunks = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [seconds, setSeconds] = useState(0);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Cleanup function to stop tracks and revoke URL
  useEffect(() => {
    return () => {
      cleanupStream();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl, cleanupStream]);

  const handleClose = () => {
    cleanupStream();
    onClose();
  };

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (!timeRef.current) return;
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  const formatTime = () => {
    const m = String(minutes).padStart(2, "0");
    const s = String(displaySeconds).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);

      chunks.current = [];

      recorder.ondataavailable = (e) => chunks.current.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        chunks.current = [];
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setAudioBlob(null);
      startTimer();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Error accessing microphone");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    stopTimer();
    setIsRecording(false);
  };

  const discardRecording = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    resetTimer();
  };

  const saveRecording = async () => {
    if (!audioBlob) return;
    setIsUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/upload-voice-note",
        {
          userId: "cme06ihw800007kz87xrbn7xw",
        }
      );
      if (!response.data?.success) {
        throw new Error(response.data.message);
      }
      const { preSignedUrl, permanentUrl } = response.data;
      await axios.put(preSignedUrl, audioBlob, {
        headers: {
          "Content-Type": "audio/webm",
        },
      });

      // Save to Database
      const dbResponse = await axios.post(
        "http://localhost:4000/api/v1/create-voice-note",
        {
          title: "Untitled",
          url: permanentUrl, 
          pinned: false,
        }
      );

      if (!dbResponse.data?.success) {
        throw new Error("Failed to save note to database");
      }

      toast.success("Audio uploaded successfully");
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while uploading the audio");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={!isUploading ? handleClose : undefined}
    >
      <div
        className="bg-background border border-border rounded-xl shadow-2xl w-[24rem] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Voice Note</h3>
          </div>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            onClick={handleClose}
            disabled={isUploading}
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-6">
          {/* Visualizer / Status */}
          <div className="relative flex items-center justify-center w-32 h-32">
            {isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500/20"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            <div
              className={cn(
                "relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                isRecording
                  ? "bg-red-500 text-white shadow-red-500/50 shadow-lg"
                  : audioBlob
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : isRecording ? (
                <div className="w-8 h-8 rounded-sm bg-white animate-pulse" />
              ) : audioBlob ? (
                <Play className="w-8 h-8 ml-1" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </div>
          </div>

          {/* Timer & Status Text */}
          <div className="text-center space-y-1">
            <div className="text-3xl font-mono font-medium tracking-wider tabular-nums">
              {formatTime()}
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {isUploading
                ? "Uploading..."
                : isRecording
                ? "Recording..."
                : audioBlob
                ? "Review Recording"
                : "Ready to Record"}
            </p>
          </div>

          {/* Audio Player (Review Mode) */}
          {audioUrl && !isRecording && !isUploading && (
            <div className="w-full bg-muted/50 rounded-lg p-2">
              <audio controls src={audioUrl} className="w-full h-8" />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-3 w-full">
            {!isRecording && !audioBlob && (
              <Button
                className="w-full"
                size="lg"
                onClick={startRecording}
                disabled={isUploading}
              >
                <Mic className="w-4 h-4 mr-2" /> Start Recording
              </Button>
            )}

            {isRecording && (
              <Button
                variant="destructive"
                className="w-full"
                size="lg"
                onClick={stopRecording}
              >
                <Square className="w-4 h-4 mr-2 fill-current" /> Stop Recording
              </Button>
            )}

            {!isRecording && audioBlob && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={discardRecording}
                  disabled={isUploading}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Discard
                </Button>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={saveRecording}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" /> Save Note
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
