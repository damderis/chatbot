'use client';

import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { UIMessage } from 'ai';

interface ChatPanelProps {
  messages: UIMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
  onClear: () => void;
}

export default function ChatPanel({ messages, isLoading, onSend, onStop, onClear }: ChatPanelProps) {
  return (
    <div className="flex h-full w-full flex-col md:w-2/3 border-r border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <ChatHeader onClear={onClear} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput isLoading={isLoading} onSend={onSend} onStop={onStop} />
    </div>
  );
}
