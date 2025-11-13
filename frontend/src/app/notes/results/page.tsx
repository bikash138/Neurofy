import { NoteItem } from "@/components/core/NoteItem"
import { Search } from "lucide-react"
import React from 'react'

const notesData = [
  {
    id: 1,
    title: "August list grocery",
    description: "Amazon",
    date: "Mon 8/4",
    isCompleted: true,
  },
  {
    id: 2,
    title: "June Grocery List",
    description: "Aashirvaad atta 17 × 215 = 3655",
    date: "Mon 8/4",
    isCompleted: true,
  },
  {
    id: 3,
    title: "May Grocery List",
    description: "Here is the summarized data from your May Grocery List, in bullet points:",
    date: "Mon 8/4",
    isCompleted: true,
  },
  {
    id: 4,
    title: "July Grocery List",
    description: "Ganesh atta: 10 × 210 = 2100",
    date: "Mon 8/4",
    isCompleted: true,
  },
]

const page = () => {
  return (
    <div className="pt-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 flex items-center px-6 py-4 border-b border-neutral-200">
        <Search className="h-6 w-6 text-muted-foreground mr-3" />
        <p className="text-base font-medium">Search Value</p>
      </div>
      <div className="space-y-1">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-foreground">Notes</h2>
        </div>
        
        <div className="space-y-3">
          {notesData.map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              description={note.description}
              date={note.date}
              isCompleted={note.isCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page