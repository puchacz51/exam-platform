'use client';

import * as React from 'react';

import { ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const MultiSelect = ({
  options,
  value,
  onChange,
  onSearch,
  isLoading,
  placeholder = 'Select items...',
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);

  const handleInputChange = (query: string) => {
    setInputValue(query);
    onSearch?.(query);
  };

  const handleUnselect = (option: Option) => {
    onChange(value.filter((item) => item.value !== option.value));
  };

  // Filter out selected items from options
  const availableOptions = options.filter(
    (option) => !value.some((item) => item.value === option.value)
  );

  const displayedValue = showAll ? value : value.slice(0, 5);
  const hasMore = value.length > 5;

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="rounded-lg border bg-background p-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-medium text-muted-foreground">
              Selected • {value.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs hover:text-destructive"
              onClick={() => onChange([])}
            >
              Clear all
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <TooltipProvider delayDuration={150}>
                {displayedValue.map((item) => {
                  const [name, email] = item.label.split(' (');
                  return (
                    <Tooltip key={item.value}>
                      <TooltipTrigger asChild>
                        <div className="group relative flex h-7 items-center gap-1 rounded-md bg-accent/20 px-2 text-sm hover:bg-accent/30">
                          <span className="font-medium">{name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                            onClick={() => handleUnselect(item)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="flex flex-col gap-1 p-3"
                      >
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          {email?.replace(')', '')}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
            {hasMore && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-full text-xs text-muted-foreground hover:text-accent-foreground"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <div className="flex items-center gap-1">
                    Show less <ChevronUp className="h-3 w-3" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    Show {value.length - 5} more{' '}
                    <ChevronDown className="h-3 w-3" />
                  </div>
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'h-10 w-full justify-between',
              'bg-background hover:bg-accent/10',
              !value.length && 'text-muted-foreground'
            )}
          >
            <span className="truncate">
              {value.length > 0 ? `${value.length} selected` : placeholder}
            </span>
            <div className="ml-2 shrink-0 rounded-md bg-muted px-2 py-0.5 text-sm text-muted-foreground">
              {availableOptions.length}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0 shadow-lg"
          align="start"
        >
          <Command
            shouldFilter={false}
            className="border-none"
          >
            <CommandInput
              placeholder="Search..."
              value={inputValue}
              onValueChange={handleInputChange}
              className="border-none px-3 focus:ring-0"
            />
            <div className="scrollbar-thin scrollbar-thumb-accent max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : availableOptions.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  {inputValue
                    ? 'No results found.'
                    : 'No more items to select.'}
                </p>
              ) : (
                <div className="py-2">
                  {availableOptions.map((option) => {
                    const [name, email] = option.label.split(' (');
                    return (
                      <div
                        key={option.value}
                        className={cn(
                          'flex items-center justify-between px-3 py-2',
                          'cursor-pointer transition-colors',
                          'hover:bg-accent hover:text-accent-foreground'
                        )}
                        onClick={() => {
                          onChange([...value, option]);
                          setInputValue('');
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{name}</span>
                          <span className="text-xs text-muted-foreground">
                            {email?.replace(')', '')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
