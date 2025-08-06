import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StickyNote } from '@/lib/data';
interface NoteCardProps {
    note: StickyNote
}

const NotesCard = ({ note }: NoteCardProps) => {
  return (
    <>
        <Card className={cn(
            "rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[300px]",
            note.color,
            note.darkColor
        )}>
            <CardContent className="p-5 h-full">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">
                {note.title}
            </h3>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {note.content.map((line, lineIndex) => (
                <div 
                    key={lineIndex} 
                    className={cn(
                    "leading-relaxed",
                    line.startsWith('TOTAL') || line.includes('TOTAL') ? "font-bold" : "",
                    line === '' ? "h-2" : ""
                    )}
                >
                    {line || '\u00A0'}
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
    </>
  )
}

export default NotesCard