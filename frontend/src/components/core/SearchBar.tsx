import { useState, useCallback, KeyboardEvent } from 'react';
import React from 'react';
import { Search, FileText, Calendar, User, Settings, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchSuggestion } from '@/components/core/SearchSuggestion';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface SearchResult {
  id: number;
  type?: 'document' | 'calendar' | 'person' | 'settings' | 'tag';
  title: string;
  subtitle?: string;
}



const getIconForType = (type: SearchResult['type']) => {
  switch (type) {
    case 'document': return FileText;
    case 'calendar': return Calendar;
    case 'person': return User;
    case 'settings': return Settings;
    case 'tag': return Hash;
    default: return FileText;
  }
};

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/v1/search', {searchQuery})
      const searchResults = response.data.result
      //@ts-ignore
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Perform search when debounced query changes
  React.useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    console.log('Selected:', result);
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow for suggestion clicks
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
          <Input
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search your content..."
            className={cn(
              "pl-12 pr-4 py-4 text-base border-0 focus:ring-0 focus:outline-none",
              "bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
              "text-neutral-900 dark:text-neutral-100"
            )}
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

      {/* Search Suggestions */}
      {isOpen && results.length > 0 && (
        <Card className={cn(
          "absolute top-full left-0 right-0 mt-2 z-50",
          "bg-white dark:bg-neutral-900",
          "border border-neutral-200 dark:border-neutral-800",
          "shadow-lg dark:shadow-neutral-900/20",
          "animate-in fade-in-0 slide-in-from-top-2 duration-200",
          "max-h-96 overflow-y-auto"
        )}>
          <div className="p-2">
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 px-3 py-2 uppercase tracking-wider">
              Suggestions
            </div>
            <div className="space-y-1">
              {results.map((result, index) => (
                <SearchSuggestion
                  key={result.id}
                  icon={getIconForType(result.type)}
                  title={result.title}
                  subtitle={result.subtitle}
                  isSelected={index === selectedIndex}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* No Results */}
      {isOpen && results.length === 0 && query.trim() && !isLoading && (
        <Card className={cn(
          "absolute top-full left-0 right-0 mt-2 z-50",
          "bg-white dark:bg-neutral-900",
          "border border-neutral-200 dark:border-neutral-800",
          "shadow-lg dark:shadow-neutral-900/20",
          "animate-in fade-in-0 slide-in-from-top-2 duration-200"
        )}>
          <div className="p-6 text-center">
            <Search className="h-8 w-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-2" />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              No results found for "{query}"
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}