'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect } from 'react';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

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

  return (
    <div className="flex flex-col w-full h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Business Validator AI</h1>
      
      <MessageList messages={messages} isLoading={isLoading} />

      <ChatInput 
        isLoading={isLoading} 
        onSend={handleSend} 
        onStop={stop} 
      />
    </div>
  );
}
