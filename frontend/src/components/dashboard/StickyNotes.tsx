'use client';
import { motion } from 'framer-motion';
import NotesCard from '../core/NotesCard';
import VoiceNoteCard from '../core/VoiceNoteCard';
import { useRouter } from 'next/navigation';
import { AllNotesProps, NoteType } from '@/types/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function StickyNotes() {

  const fetchNotes = async () => {
    try{
      const response = await axios.get('http://localhost:4000/api/v1/get-all-note')
      const initialNotes: AllNotesProps['allNotes']= response.data?.allNotes
      console.log(initialNotes)
      setAllNotes(initialNotes)
    }catch(error){
      console.log(error)
      console.log("Failed to get all notes")
    }
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  const router = useRouter();
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const deleteNote = (noteId: number) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="pr-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">
          Your Neuros
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1 auto-rows-auto">
        {/* Demo Voice Note Card */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <VoiceNoteCard audioUrl={"https://dev-neurofy.t3.storage.dev/firstUser/voice-note/1763996331560.webm"}/>
        </motion.div>

        {allNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.02 }}
            className="group"
            onClick={(event) => {
              //eslint-disable-next-line
              //@ts-ignore
              if (event.target.closest('.hover-icon')) {
                event.stopPropagation();
              } else {
                router.push(`/notes/${note.id}`);
              }
            }}
          >
            <NotesCard note={note} deleteNote={deleteNote}/>
          </motion.div>
        ))}
      </div>
    </div>
  );
}