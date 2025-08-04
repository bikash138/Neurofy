import { FileText, Mic, BookTemplate as FileTemplate, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { notes } from '@/lib/data';
import { motion } from 'framer-motion';

export function NotesDashboard() {
  return (
    <div className="px-6 py-6 space-y-6">
      {/* Create New Note Section */}
      

      {/* Notes List */}
      {/* <div className="space-y-3">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{note.title}</h4>
                        {note.source && (
                          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            {note.source}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {note.preview}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {note.timestamp}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
}