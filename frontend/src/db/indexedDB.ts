import Dexie, { Table } from "dexie";

export interface PendingNote {
  noteId: string;
  content: JSON;
  updatedAt: number;
}

export class NeurofyDB extends Dexie {
  pendingNotes!: Table<PendingNote, string>;

  constructor() {
    super("NeurofyDB");
    this.version(1).stores({
      pendingNotes: "noteId, updatedAt",
    });
  }
}

export const db = new NeurofyDB();

export async function savePendingNote(noteId: string, content: JSON) {
  await db.pendingNotes.put({
    noteId,
    content,
    updatedAt: Date.now(),
  });
}

export async function removePendingNote(noteId: string) {
  await db.pendingNotes.delete(noteId);
}

export async function getAllPendingNotes() {
  return await db.pendingNotes.toArray();
}
