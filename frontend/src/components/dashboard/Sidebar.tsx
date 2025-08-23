import { 
  FileText, 
  Search, 
  Mic, 
  Hash, 
  Zap, 
  Bell, 
  Clock, 
  User,
  Lightbulb,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AddNoteButton from '../ui/AddNoteButton';

const sidebarItems = [
  { icon: FileText, label: 'Notes', active: true },
  { icon: Plus, label: 'Plus' },
  { icon: Mic, label: 'Voice' },
  { icon: Hash, label: 'Tags' },
  { icon: Zap, label: 'Quick Capture' },
  { icon: Bell, label: 'Notifications' },
  { icon: Clock, label: 'Recent' },
  { icon: User, label: 'Profile' },
];

export function Sidebar() {

  return (
    <div className="hidden md:flex fixed left-0 z-40 top-0 h-screen w-16 bg-background border-r border-border flex-col items-center py-4 space-y-4">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-4">
        <Lightbulb className="w-5 h-5 text-primary-foreground" />
      </div>
      
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isPlus = item.label === 'Plus';
        return isPlus ? (
          <AddNoteButton key={index}/>
        ) : (
          <button
            key={index}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-accent",
              item.active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className='w-5 h-5'/>
          </button>
        )
      })}
    </div>
  );
}