import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchSuggestionProps {
  icon: typeof LucideIcon;
  title: string;
  subtitle?: string;
  isSelected?: boolean;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
}

export function SearchSuggestion({ 
  icon: Icon, 
  title, 
  subtitle, 
  isSelected, 
  onMouseDown,
  onMouseEnter 
}: SearchSuggestionProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer rounded-md transition-all duration-200",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "hover:scale-[1.02] active:scale-[0.98]",
        isSelected && "bg-neutral-100 dark:bg-neutral-700",
        "group"
      )}
      onMouseDown={onMouseDown}
    >
      <div className={cn(
        "flex-shrink-0 p-2 rounded-md",
        "bg-neutral-50 dark:bg-neutral-800",
        "group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700",
        "transition-colors duration-200"
      )}>
        <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}