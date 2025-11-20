import React from 'react';
import { Github, FileText, Clock } from 'lucide-react';

export default function SidePanel() {
  return (
    <div className="hidden md:flex md:w-1/3 flex-col bg-gray-50 dark:bg-gray-900 p-6 border-l border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Validator AI</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          Your professional AI consultant for validating business ideas, estimating costs, and planning marketing strategies.
        </p>
        <a
          href="https://github.com/damderis/chatbot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>View Source</span>
        </a>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            History
          </h3>
          
          {/* Future Implementation */}
          <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Chat history and saved reports will appear here in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
