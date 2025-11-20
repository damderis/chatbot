'use client';

import React, { useState } from 'react';
import { ArrowUp, Square } from 'lucide-react';

interface ChatInputProps {
  isLoading: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
}

export default function ChatInput({ isLoading, onSend, onStop }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
  };

  return (
    <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-950 p-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="relative flex items-end gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-blue-500 transition-colors duration-200">
        <textarea
          className="flex-1 resize-none border-0 bg-transparent p-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none max-h-32 min-h-[44px]"
          placeholder="Type your message..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading) handleSend();
            }
          }}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <button
            onClick={onStop}
            className="mb-1 rounded-lg bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
            aria-label="Stop generation"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="mb-1 rounded-lg bg-primary p-2 text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
        AI can make mistakes. Please verify important information.
      </div>
    </div>
  );
}
