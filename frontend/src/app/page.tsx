'use client'
import { NotesHeader } from "@/components/dashboard/NotesHeader";
import { StickyNotes } from "@/components/dashboard/StickyNotes";

export default function Home() {
  return (
    <>
      <div className="md:ml-16">
          <StickyNotes/>
      </div>
    </>
  );
}
