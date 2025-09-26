import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { ref, computed } from 'vue';
import { StreamingClient } from '../services/api/streaming-client';
import type { ChatMessage, ConversationSession } from '../types/conversation';

export const useConversationStore = defineStore('conversation', () => {
  const client = new StreamingClient();
  const connectionState = ref({ ready: false });
  const messages = ref<ChatMessage[]>([]);
  const sessions = ref<ConversationSession[]>([]);
  const activeSessionId = ref<string>('');

  client.on('open', () => {
    connectionState.value.ready = true;
  });

  client.on('message', (payload) => {
    messages.value.push({
      id: nanoid(),
      role: payload.role,
      content: payload.content
    });
  });

  client.on('history', (payload) => {
    sessions.value = payload.sessions;
  });

  function sendMessage(content: string) {
    messages.value.push({ id: nanoid(), role: 'user', content });
    client.send({ type: 'prompt', content });
  }

  function runTest(content: string) {
    client.send({ type: 'test', content });
  }

  function loadSession(sessionId: string) {
    activeSessionId.value = sessionId;
    client.send({ type: 'loadSession', sessionId });
  }

  function fetchSessions() {
    client.send({ type: 'listSessions' });
  }

  const messageCount = computed(() => messages.value.length);

  return {
    connectionState,
    messages,
    sessions,
    activeSessionId,
    messageCount,
    sendMessage,
    runTest,
    loadSession,
    fetchSessions
  };
});
