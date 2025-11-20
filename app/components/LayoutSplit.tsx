import React from 'react';

interface LayoutSplitProps {
  children: React.ReactNode;
}

export default function LayoutSplit({ children }: LayoutSplitProps) {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-200">
      {children}
    </div>
  );
}
