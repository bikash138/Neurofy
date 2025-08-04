import { Card, CardContent } from '@/components/ui/card';
import { stickyNotes } from '@/lib/data';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function StickyNotes() {
  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">
          OTHERS
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}