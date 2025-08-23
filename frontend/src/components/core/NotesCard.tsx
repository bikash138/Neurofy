'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NoteType } from '@/types/types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Pin, MoreVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import axios from 'axios';
import { motion } from 'framer-motion';

const NotesCard = ({ note, deleteNote }: { note: NoteType, deleteNote: (noteId: number)=>void }) => {

  const [isPinning, setIsPinning] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPinned, setIsPinned] = useState(note.pinned)

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    editable: false,
    immediatelyRender: false,
  });

  const handlePin = async (noteId: number) => {
    setIsPinning(true)
    const payload = {
        noteId: noteId,
        pinned: !isPinned
    }
    console.log(payload)
    try{
        const response = await axios.put('http://localhost:4000/api/v1/mark-as-pinned', payload)
        if(!response.data?.success){
            throw new Error ('Cant pin')
        }
        setIsPinned(!isPinned)
        console.log(response.data.message)
    }catch(error){
        console.log(error)
        console.log("Something went wrong while pinning")
    }finally{
        setIsPinning(false)
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true)
    try{
        const response = await axios.delete('http://localhost:4000/api/v1/delete-note', { data: { noteId: note.id } })
        if(!response.data?.success){
            throw new Error ('Cant Delete')
        }
        console.log(response.data.message)
        deleteNote(note.id)
    }catch(error){
        console.log(error)
        console.log("Something went wrong while deleting")
    }finally{
        setIsDeleting(false)
    }
  };

  return (
    <Card
      className={cn(
        "relative bg-card dark:bg-card rounded-2xl border dark:border-zinc-700 border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[300px] group"
      )}
    >
      {/* Hover Icons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {/* Pin button and more icon only on hover */}
        <div className={cn(
          "flex items-center gap-2",
          !isPinned ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200" : ""
        )}>
          <button
            disabled={isPinning}
            onClick={() => handlePin(note.id)}
            className="hover-icon p-2 bg-transparent rounded-full"
          >
            <motion.span
              animate={isPinning ? { scale: 1.2, rotate: 20 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ display: "inline-block" }}
            >
              <Pin
                className={cn(
                  "w-6 h-6 transition-colors duration-200",
                  isPinned
                    ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400"
                    : "text-gray-400 fill-none dark:text-gray-500 dark:fill-none",
                  "hover:text-yellow-600 dark:hover:text-yellow-300"
                )}
                fill={isPinned ? "currentColor" : "none"}
                stroke="currentColor"
              />
            </motion.span>
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover-icon p-2 rounded-full">
                <MoreVertical className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 dark:text-gray-600" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-25 shadow-lg shadow-accent">
              <div className="flex flex-col gap-2 items-start">
                <button className=" text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                  Edit
                </button>
                <button disabled={isDeleting} onClick={handleDelete} className="hover-icon text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                  Delete
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <CardContent className="p-5 h-full">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">{note.title}</h3>
        <EditorContent editor={editor} className="text-sm text-gray-700 dark:text-gray-200" />
      </CardContent>
    </Card>
  );
};

export default NotesCard;