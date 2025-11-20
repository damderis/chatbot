'use client';

import React from 'react';
import { MessageCircle, Moon, Sun, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ChatHeaderProps {
  onClear: () => void;
}

export default function ChatHeader({ onClear }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 p-4 backdrop-blur-sm transition-colors duration-200">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chat</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          aria-label="Clear chat"
          title="Clear chat"
        >
          <Trash2 className="h-5 w-5" />
        </button>

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
