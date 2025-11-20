# Business Validator AI

A Next.js-based AI chatbot designed to act as a professional business consultant. It helps users validate business ideas, estimate costs, and plan marketing strategies through an iterative, conversational interface.

## Features

- **Iterative Consulting**: The AI provides concise feedback and asks guiding questions instead of overwhelming you with information.
- **Smooth Streaming**: Features a custom "typewriter" effect for a natural reading experience.
- **Modern UI**: A clean, split-panel interface with a dark mode toggle and maroon accent theme.
- **Markdown Support**: Renders tables, lists, and code blocks cleanly.
- **Persistence**: Saves your conversation history locally so you don't lose your progress on refresh.
- **Control**: Includes a "Stop" button to interrupt long generations and a "Clear" button to reset the conversation.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI SDK**: Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/google`)
- **Model**: Google Gemini 2.5 Flash
- **Styling**: Tailwind CSS + `next-themes`
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed.
- A Google AI Studio API Key.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd my-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your Google API key:
    ```env
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/page.tsx`: Main controller component.
- `app/api/chat/route.ts`: Server-side API route for handling AI streaming and system prompts.
- `app/components/`:
  - `ChatInput.tsx`: Input field with Send/Stop functionality.
  - `ChatMessages.tsx`: Renders the chat history with smooth streaming.
  - `ChatPanel.tsx`: Container for the main chat interface.
  - `SidePanel.tsx`: Contextual sidebar with app info and history placeholders.
  - `LayoutSplit.tsx`: Responsive split-screen layout.
  - `SmoothMarkdown.tsx`: Custom component for smooth text rendering.

## Documentation

For a deep dive into the technical implementation, see [docs/TECHNICAL_IMPLEMENTATION.md](docs/TECHNICAL_IMPLEMENTATION.md).
