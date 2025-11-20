'use client';

import React, { useEffect, useRef } from 'react';
import SmoothMarkdown from './SmoothMarkdown';
import { UIMessage } from 'ai';

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to track content length for scroll effect
  const messagesLength = messages.map(m => m.content || '').join('').length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, messagesLength]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 rounded border border-gray-700 bg-gray-900 mb-4">
        <div className="text-gray-500 text-center">
          <p className="mb-2">Start a conversation to validate your business idea.</p>
          <p className="text-sm">I can help with cost estimation, revenue potential, and marketing strategy.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 rounded border border-gray-700 bg-gray-900 flex flex-col">
      {messages.map((message, index) => (
        <div key={index} className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 ml-auto text-white' : 'bg-gray-800 mr-auto text-gray-100'} max-w-[85%] shadow-md`}>
           {message.role === 'user' ? (
              <div className="whitespace-pre-wrap">
                {message.parts?.filter(p => p.type === 'text').map(p => p.type === 'text' ? p.text : '').join('')}
              </div>
           ) : (
              <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:p-0">
                <SmoothMarkdown 
                    content={message.parts?.filter(p => p.type === 'text').map(p => p.type === 'text' ? p.text : '').join('') || ''} 
                />
              </div>
           )}
        </div>
      ))}
      
      {/* Loading / Thinking Indicator */}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="bg-gray-800 mr-auto p-3 rounded-lg max-w-[85%] shadow-md flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="text-gray-400 text-sm ml-2">Analyzing...</span>
          </div>
      )}
    </div>
  );
}

