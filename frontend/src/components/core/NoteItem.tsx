import { FileText, Circle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NoteItemProps {
  title: string
  description: string
  date: string
  isCompleted?: boolean
}

export function NoteItem({ title, description, date, isCompleted = false }: NoteItemProps) {
  return (
    <Card className="group cursor-pointer border-0 shadow-none hover:bg-accent/50 transition-colors duration-200">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex-shrink-0 mt-1">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {isCompleted && (
              <Badge variant="secondary" className="h-5 w-5 p-0 rounded-full">
                <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}