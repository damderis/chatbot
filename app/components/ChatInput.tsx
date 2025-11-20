'use client';

import React, { useState } from 'react';

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
    setInput('');
  };

  return (
    <div className="relative flex gap-2">
      <input
        className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500 shadow-sm placeholder-gray-500 transition-colors"
        value={input}
        placeholder="Describe your business idea..."
        onChange={event => setInput(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && !isLoading) {
            handleSend();
          }
        }}
        disabled={isLoading}
      />
      
      {isLoading ? (
        <button
          onClick={onStop}
          className="p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors min-w-[80px]"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px]"
        >
          Send
        </button>
      )}
    </div>
  );
}

