import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  savePendingNote,
  removePendingNote,
  getAllPendingNotes,
} from "@/db/indexedDB";
import { syncPendingNotes } from "@/lib/retrySync";


type Status = "synced" | "saving" | "offline" | "error";
export function useNoteSync(noteId: string, initialContent: object) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<Status>("synced");

  // called whenever user updates the content
  const updateContent = useCallback(
    async (newValue: JSON) => {
      setContent(newValue);
      setStatus("saving");

      // save locally first
      await savePendingNote(noteId, newValue);

      try {
        const res = await axios.put(
          `http://localhost:4000/api/v1/update-note/${noteId}`,
          {
            content: JSON.stringify(content),
          }
        );

        if (res.status === 200) {
          await removePendingNote(noteId);
          setStatus("synced");
        }
      } catch (err) {
        if (!navigator.onLine) {
          setStatus("offline");
        } else {
          setStatus("error");
        }
      }
    },
    [noteId, content]
  );

  // load pending draft if exists on mount
  useEffect(() => {
    (async () => {
      const pending = await getAllPendingNotes();
      const existing = pending.find((item) => item.noteId === noteId);

      if (existing) {
        setContent(existing.content);
        setStatus(navigator.onLine ? "saving" : "offline");
      }
    })();
  }, [noteId]);


  useEffect(() => {
    // Try syncing immediately on mount
    syncPendingNotes();

    // Sync when coming online
    const onlineHandler = () => syncPendingNotes();
    window.addEventListener("online", onlineHandler);

    // Sync when user returns to tab
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        syncPendingNotes();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);


  return { content, updateContent, status };
}
