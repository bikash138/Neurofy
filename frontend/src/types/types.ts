export interface NoteType {
  id: number;
  title: string;
  content: object;
  tags: string[];
  pinned: boolean;
  createdAt?: string;
  updatedAt: string;
}
export interface AllNotesProps {
  allNotes: NoteType[]
}
