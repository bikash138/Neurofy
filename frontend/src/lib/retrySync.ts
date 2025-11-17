import axios from "axios";
import { getAllPendingNotes, removePendingNote } from "@/db/indexedDB";

export async function syncPendingNotes(backoff = 1000): Promise<void> {
  const pending = await getAllPendingNotes();
  if (pending.length === 0) return;
  console.log("Trying to Sync With backend");
  for (const note of pending) {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/update-note/${note.noteId}`,
        {
          content: note.content,
        }
      );

      if (res.status === 200) {
        await removePendingNote(note.noteId);
      }
    } catch (err) {
      if (!navigator.onLine) return; // offline, exit
      // server issue → retry with exponential backoff
      setTimeout(() => syncPendingNotes(backoff * 2), backoff);
      return;
    }
  }
}
