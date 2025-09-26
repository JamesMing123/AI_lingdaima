<template>
  <section class="card">
    <header class="card__header">
      <h3>任务面板</h3>
      <button class="ghost" @click="openCreator">新建任务</button>
    </header>
    <ul class="card__body">
      <li v-for="task in tasks" :key="task.id" class="card__item">
        <h4>{{ task.title }}</h4>
        <p>{{ task.summary }}</p>
        <span class="status" :data-status="task.status">{{ labels[task.status] }}</span>
      </li>
      <li v-if="!tasks.length" class="empty">暂无任务，快通过自然语言生成一个吧。</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const labels = {
  pending: '待生成',
  generating: '生成中',
  reviewing: '待确认',
  done: '已完成'
} as const;

function openCreator() {
  taskStore.openCreator();
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
}

.status {
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}

.status[data-status='done'] {
  background: rgba(16, 185, 129, 0.1);
  color: #6ee7b7;
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
