import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { syncPendingNotes } from "@/lib/retrySync";
import {
  savePendingNote,
  removePendingNote,
  getAllPendingNotes,
} from "@/db/indexedDB";

type Status = "synced" | "saving" | "offline" | "error";

export function useNoteSync(
  noteId: string,
  initialTitle: string,
  initialContent: object
) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState<Status>("synced");

  const updateContent = useCallback(
    async (newTitle: string, newValue: JSON) => {
      setContent(newValue);
      setTitle(newTitle);
      setStatus("saving");

      //Now save to indexedDB first
      await savePendingNote(noteId, newTitle, newValue);

      //Now try to sync with the server
      try {
        console.log("Called the update API")
        const res = await axios.put(
          `http://localhost:4000/api/v1/update-note/${noteId}`,
          {
            title: newTitle,
            content: newValue,
          }
        );
        //If server send success message then remove the note from the indexedDB
        if (res.status === 200) {
          await removePendingNote(noteId);
          setStatus("synced");
        }
      } catch (error) {
        if (!navigator.onLine) {
          setStatus("offline");
        } else {
          setStatus("error");
        }
        console.log(error);
      }
    },
    [noteId]
  );

  // load pending draft if exists on mount
  useEffect(() => {
    (async () => {
      const pending = await getAllPendingNotes();
      const existing = pending.find((item) => item.noteId === noteId);

      if (existing) {
        setTitle(existing.title);
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
