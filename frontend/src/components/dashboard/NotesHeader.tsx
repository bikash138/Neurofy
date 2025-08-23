import { Search, ChevronDown, MoreHorizontal, FileText, Mic, Settings, BookTemplate as FileTemplate } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NotesHeader() {
  return (
    <div className="fixed left-16 right-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30">
      {/* Notes Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-semibold tracking-tight">📝 Notes</h1>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        {/* <div className="mt-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-fit grid-cols-3 bg-muted/50">
              <TabsTrigger value="all" className="px-6">All</TabsTrigger>
              <TabsTrigger value="created" className="px-6">Created by me</TabsTrigger>
              <TabsTrigger value="shared" className="px-6">Shared with me</TabsTrigger>
            </TabsList>
          </Tabs>
        </div> */}

        {/* Filters and Sort */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  # Collections <ChevronDown className="ml-1 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Collections</DropdownMenuItem>
                <DropdownMenuItem>Personal</DropdownMenuItem>
                <DropdownMenuItem>Work</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  🔍 Contains <ChevronDown className="ml-1 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Text</DropdownMenuItem>
                <DropdownMenuItem>Images</DropdownMenuItem>
                <DropdownMenuItem>Links</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  📅 Date <ChevronDown className="ml-1 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Today</DropdownMenuItem>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  👤 Edited by <ChevronDown className="ml-1 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Me</DropdownMenuItem>
                <DropdownMenuItem>Others</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  ✏️ Created by <ChevronDown className="ml-1 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Me</DropdownMenuItem>
                <DropdownMenuItem>Others</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Last modified <ChevronDown className="ml-1 w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last modified</DropdownMenuItem>
              <DropdownMenuItem>Created date</DropdownMenuItem>
              <DropdownMenuItem>Title</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='mt-4'>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Create a new note</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Blank Note</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <Mic className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Voice Note</span>
          </Button>
          
          <div className="space-y-1">
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start space-x-2 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
            >
              <FileTemplate className="w-4 h-4 text-muted-foreground" />
              <div className="text-left">
                <div className="text-sm font-medium">Untitled Template</div>
              </div>
            </Button>
            <p className="text-xs text-muted-foreground pl-2">Use template</p>
          </div>
          
          <div className="space-y-1">
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start space-x-2 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <div className="text-left">
                <div className="text-sm font-medium">Add a template</div>
              </div>
            </Button>
            <p className="text-xs text-muted-foreground pl-2">Format notes consistently</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}