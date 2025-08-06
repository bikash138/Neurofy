'use client'
import { stickyNotes } from '@/lib/data';
import { motion } from 'framer-motion';
import NotesCard from '../core/NotesCard';
import Link from 'next/link';

export function StickyNotes() {
  return (
    <div className="pr-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">
          Your Neuros
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stickyNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Link href={`/notes/${note.id}`}>
              <NotesCard note={note} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}