'use client';

import React, { useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import LayoutSplit from './components/LayoutSplit';
import ChatPanel from './components/ChatPanel';
import SidePanel from './components/SidePanel';

export default function Page() {
  // useChat handles the streaming state
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, [setMessages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async (message: string) => {
    try {
      await sendMessage({
          role: 'user',
          parts: [{ type: 'text', text: message }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  };

  return (
    <LayoutSplit>
      <ChatPanel 
        messages={messages} 
        isLoading={isLoading} 
        onSend={handleSend} 
        onStop={stop}
        onClear={handleClear}
      />
      <SidePanel />
    </LayoutSplit>
  );
}
