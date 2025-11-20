# Technical Implementation Guide

This document provides a deep dive into the technical architecture and implementation details of the Business Validator AI chatbot.

## Architecture Overview

The application is built using **Next.js 15** (App Router) and leverages the **Vercel AI SDK** for handling streaming chat responses. It follows a component-based architecture adhering to SOLID principles.

### Key Technologies
- **Framework**: Next.js 15
- **AI Integration**: Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Styling**: Tailwind CSS
- **Markdown Rendering**: `react-markdown` with `remark-gfm`
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`) + LocalStorage

## Component Structure

The application logic is decoupled into specialized components to enforce the Single Responsibility Principle (SRP).

### 1. `app/page.tsx` (Controller)
Acts as the composition root. It:
- Initializes the `useChat` hook from Vercel AI SDK.
- Manages persistence of chat history to `localStorage`.
- Composes the `MessageList` and `ChatInput` components.
- Handles the `sendMessage` and `stop` actions.

### 2. `app/components/MessageList.tsx` (View)
Responsible solely for rendering the list of chat messages.
- Handles auto-scrolling to the bottom when new messages arrive.
- Renders user messages as plain text.
- Renders assistant messages using the `SmoothMarkdown` component.
- Displays the "Analyzing..." loading indicator.

### 3. `app/components/ChatInput.tsx` (Input)
Manages the input field state and user interaction.
- Handles text input changes.
- Toggles between "Send" and "Stop" buttons based on the `isLoading` prop.
- Triggers the `onSend` or `onStop` callbacks provided by the parent.

### 4. `app/components/SmoothMarkdown.tsx` (UX Enhancement)
A custom component designed to solve the "fast streaming" visual issue.
- **Problem**: LLM streams often arrive in large chunks, making text appear to "jump" or flash.
- **Solution**: Implements a client-side "typewriter" effect.
- **Mechanism**: 
  - Accepts the full `content` string as a prop.
  - Uses a `setInterval` loop (10ms) to incrementally append characters to a local `displayedContent` state.
  - If the content updates (stream continues), the target length increases, and the typer catches up.
  - Renders the output using `ReactMarkdown` for proper formatting (tables, code blocks, bolding).

## API Route (`app/api/chat/route.ts`)

Handles the server-side communication with the LLM (Google Gemini).

### System Prompt Engineering
The system prompt is engineered for an "Iterative Business Consultant" persona.
- **Goal**: Avoid overwhelming users with massive text walls.
- **Strategy**: 
  - Force concise initial responses.
  - Mandate "permission marketing" (asking before explaining complex topics).
  - Enforce structured data (bullet points, headings).

### Streaming
- Uses `streamText` from the AI SDK to stream responses directly to the client.
- Converts messages using `convertToModelMessages` to ensure format compatibility.

## Persistence
- **Method**: `localStorage`
- **Key**: `chat_history`
- **Logic**: 
  - On mount: Checks for existing history and hydrates the `messages` state.
  - On update: Saves the current `messages` array to storage whenever it changes.

## Future Enhancement Opportunities
- **Database Integration**: Replace `localStorage` with Supabase or Postgres for cross-device sync.
- **Multi-Session Support**: Add a sidebar to switch between different chat sessions/business ideas.
- **Export Functionality**: Allow users to export the conversation as a PDF or Markdown business plan.

