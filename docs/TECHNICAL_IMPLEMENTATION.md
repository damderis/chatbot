# Technical Implementation Guide

This document provides a deep dive into the technical architecture and implementation details of the Business Validator AI chatbot.

## Architecture Overview

The application is built using **Next.js 15** (App Router) and leverages the **Vercel AI SDK** for handling streaming chat responses. It follows a component-based architecture adhering to SOLID principles.

### Key Technologies
- **Framework**: Next.js 15
- **AI Integration**: Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Styling**: Tailwind CSS + `next-themes` for Dark Mode
- **Icons**: `lucide-react`
- **Markdown Rendering**: `react-markdown` with `remark-gfm`
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`) + LocalStorage

## Component Structure

The application logic is decoupled into specialized components to enforce the Single Responsibility Principle (SRP).

### 1. `app/page.tsx` (Controller)
Acts as the composition root. It:
- Initializes the `useChat` hook from Vercel AI SDK.
- Manages persistence of chat history to `localStorage`.
- Composes the `LayoutSplit`, `ChatPanel`, and `SidePanel` components.
- Handles the `sendMessage` and `stop` actions.

### 2. `app/components/LayoutSplit.tsx` (Layout)
Handles the responsive split-screen layout.
- Displays side panel on desktop (`md:block`).
- Hides side panel on mobile (`hidden`).
- Manages background colors for light/dark modes.

### 3. `app/components/ChatPanel.tsx` (Container)
A structural component that organizes the main chat area.
- Contains `ChatHeader`, `ChatMessages`, and `ChatInput`.
- Passes props down to child components.

### 4. `app/components/ChatMessages.tsx` (View)
Responsible solely for rendering the list of chat messages.
- Handles auto-scrolling to the bottom when new messages arrive.
- Renders user messages as plain text.
- Renders assistant messages using the `SmoothMarkdown` component.
- Displays the "Analyzing..." loading indicator.

### 5. `app/components/ChatInput.tsx` (Input)
Manages the input field state and user interaction.
- Handles text input changes.
- Toggles between "Send" and "Stop" buttons based on the `isLoading` prop.
- Supports "Enter to Send" (without Shift).
- Retains input text after sending to help users track context.

### 6. `app/components/SidePanel.tsx` (Context)
Displays contextual information and metadata.
- Shows app description and GitHub link.
- Contains placeholders for future features like Saved Reports and Chat History.
- Responsive styling (hidden on mobile).

### 7. `app/components/SmoothMarkdown.tsx` (UX Enhancement)
A custom component designed to solve the "fast streaming" visual issue.
- **Problem**: LLM streams often arrive in large chunks, making text appear to "jump" or flash.
- **Solution**: Implements a client-side "typewriter" effect.
- **Mechanism**: 
  - Accepts the full `content` string as a prop.
  - Uses a `setInterval` loop (10ms) to incrementally append characters to a local `displayedContent` state.
  - Renders the output using `ReactMarkdown` for proper formatting.

## API Route (`app/api/chat/route.ts`)

Handles the server-side communication with the LLM (Google Gemini).

### System Prompt Engineering
The system prompt is engineered for an "Iterative Business Consultant" persona.
- **Goal**: Avoid overwhelming users with massive text walls.
- **Strategy**: 
  - Force concise initial responses.
  - Mandate "permission marketing" (asking before explaining complex topics).
  - Enforce structured data (bullet points, headings).

## Persistence
- **Method**: `localStorage`
- **Key**: `chat_history`
- **Logic**: 
  - On mount: Checks for existing history and hydrates the `messages` state.
  - On update: Saves the current `messages` array to storage whenever it changes.
  - Clear Chat: Removes the key from storage and resets state.

## Styling & Theming
- **Tailwind CSS**: Used for all styling.
- **Custom Colors**: Defined a Maroon (`#800000`) primary color in `globals.css`.
- **Dark Mode**: Implemented using `next-themes` with a custom toggle in `ChatHeader`.
  - Uses CSS variables for seamless theme switching.
  - Consistent dark mode support across all components.

## Future Enhancement Opportunities
- **Database Integration**: Replace `localStorage` with Supabase or Postgres for cross-device sync.
- **Multi-Session Support**: Add a sidebar to switch between different chat sessions/business ideas.
- **Export Functionality**: Allow users to export the conversation as a PDF or Markdown business plan.
