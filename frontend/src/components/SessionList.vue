<template>
  <section class="card">
    <header class="card__header">
      <h3>对话记录</h3>
      <button class="ghost" @click="refresh">刷新</button>
    </header>
    <ul class="card__body">
      <li
        v-for="session in sessions"
        :key="session.id"
        class="card__item"
        :class="{ active: session.id === activeSessionId }"
        @click="activate(session.id)"
      >
        <h4>{{ session.title }}</h4>
        <p>{{ session.updatedAt }}</p>
      </li>
      <li v-if="!sessions.length" class="empty">暂无对话记录。</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useConversationStore } from '../stores/conversation';

const store = useConversationStore();
const { sessions, activeSessionId } = storeToRefs(store);

function activate(id: string) {
  store.loadSession(id);
}

function refresh() {
  store.fetchSessions();
}
</script>

<style scoped>
.card {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
}

.card__header {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.card__body {
  list-style: none;
  margin: 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(30, 41, 59, 0.8);
  cursor: pointer;
}

.card__item.active {
  border: 1px solid rgba(59, 130, 246, 0.4);
}

button.ghost {
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
  border-radius: 999px;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.empty {
  text-align: center;
  color: rgba(226, 232, 240, 0.6);
}
</style>
