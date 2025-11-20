'use client';

import React, { useRef, useEffect } from 'react';
import { UIMessage } from 'ai';
import SmoothMarkdown from './SmoothMarkdown';

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500 dark:text-gray-400 max-w-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Welcome to Business Validator AI</h3>
          <p className="text-sm">Start a conversation to validate your business idea, estimate costs, and plan marketing strategies.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex w-full ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[85%] rounded-xl px-5 py-3 shadow-sm ${
              message.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
            }`}
          >
            {message.role === 'user' ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.parts?.filter(p => p.type === 'text').map(p => p.type === 'text' ? p.text : '').join('')}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:p-0">
                <SmoothMarkdown 
                    content={message.parts?.filter(p => p.type === 'text').map(p => p.type === 'text' ? p.text : '').join('') || ''} 
                />
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Loading Indicator */}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className="flex w-full justify-start">
          <div className="rounded-xl bg-gray-100 dark:bg-gray-800 px-5 py-3 shadow-sm">
             <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
