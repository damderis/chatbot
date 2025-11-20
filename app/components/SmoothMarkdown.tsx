'use client';

import { useState, useEffect, useRef, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SmoothMarkdownProps {
  content: string;
}

const SmoothMarkdown = memo(({ content }: SmoothMarkdownProps) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const contentRef = useRef(content);
  const indexRef = useRef(0);

  // Update ref when content prop changes (from streaming)
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const interval = setInterval(() => {
      const target = contentRef.current;
      const currentIdx = indexRef.current;
      
      if (currentIdx < target.length) {
        // Add next character
        setDisplayedContent((prev) => prev + target.charAt(currentIdx));
        indexRef.current += 1;
      } else if (currentIdx > target.length) {
        // If target shrunk (reset/error), reset
        setDisplayedContent(target);
        indexRef.current = target.length;
      }
    }, 10); // Adjust speed here (10ms per char)

    return () => clearInterval(interval);
  }, []);

  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
        li: ({children}) => <li className="mb-1">{children}</li>,
        a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{children}</a>,
        code: ({className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !String(children).includes('\n');
            return (
              <code 
                  className={`${isInline ? 'bg-gray-700 px-1 py-0.5 rounded text-sm' : 'block bg-gray-900 p-2 rounded text-sm overflow-x-auto my-2'} font-mono`} 
                  {...props}
              >
                  {children}
              </code>
            )
        }
      }}
    >
      {displayedContent}
    </ReactMarkdown>
  );
});

SmoothMarkdown.displayName = 'SmoothMarkdown';

export default SmoothMarkdown;

