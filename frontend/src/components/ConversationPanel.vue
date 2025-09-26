<template>
  <div class="conversation">
    <header class="conversation__header">
      <h2>智能对话</h2>
      <span class="conversation__status" :class="{ 'conversation__status--connected': connection.ready }">
        {{ connection.ready ? '连接已建立' : '等待连接' }}
      </span>
    </header>
    <div class="conversation__body" ref="bodyEl">
      <article
        v-for="message in messages"
        :key="message.id"
        class="conversation__message"
        :class="`conversation__message--${message.role}`"
      >
        <h3>{{ message.role === 'user' ? '我' : 'AI' }}</h3>
        <p>{{ message.content }}</p>
      </article>
    </div>
    <form class="conversation__composer" @submit.prevent="emitSend">
      <textarea v-model="draft" placeholder="描述你的需求，例如“生成一个调用 LangChain4j 的 Java 服务”" />
      <div class="conversation__composer-actions">
        <button type="button" class="ghost" @click="emitRunTest">调试</button>
        <button type="submit">发送</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useConversationStore } from '../stores/conversation';

const conversation = useConversationStore();
const draft = ref('');
const bodyEl = ref<HTMLDivElement | null>(null);

const connection = conversation.connectionState;
const messages = conversation.messages;

function emitSend() {
  if (!draft.value.trim()) return;
  conversation.sendMessage(draft.value);
  draft.value = '';
}

function emitRunTest() {
  if (!draft.value.trim()) return;
  conversation.runTest(draft.value);
}

watch(
  () => messages.length,
  async () => {
    await nextTick();
    bodyEl.value?.scrollTo({ top: bodyEl.value.scrollHeight, behavior: 'smooth' });
  }
);
</script>

<style scoped>
.conversation {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(17, 24, 39, 0.6);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.conversation__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.conversation__status {
  font-size: 0.875rem;
  color: #fbbf24;
}

.conversation__status--connected {
  color: #34d399;
}

.conversation__body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conversation__message {
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(31, 41, 55, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.conversation__message--user {
  align-self: flex-end;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.conversation__composer {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

textarea {
  min-height: 120px;
  padding: 0.75rem 1rem;
  background: rgba(15, 23, 42, 0.8);
  color: #f3f4f6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  resize: vertical;
  outline: none;
}

.conversation__composer-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  color: #0f172a;
}

button.ghost {
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}
</style>
