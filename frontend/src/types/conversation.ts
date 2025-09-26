export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ConversationSession {
  id: string;
  title: string;
  updatedAt: string;
}

export interface StreamingMessage {
  role: ChatMessage['role'];
  content: string;
}

export type StreamingEvent =
  | { type: 'prompt'; content: string }
  | { type: 'test'; content: string }
  | { type: 'loadSession'; sessionId: string }
  | { type: 'listSessions' };
