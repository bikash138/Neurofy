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

export interface VoiceNoteType {
  id: string;
  title: string;
  url: string;
  pinned: boolean;
}
export interface VoiceNotesProps {
  voiceNotes: VoiceNoteType[]
}
