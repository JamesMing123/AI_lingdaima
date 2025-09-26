import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TaskItem } from '../types/task';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<TaskItem[]>([]);
  const creatorVisible = ref(false);

  function openCreator() {
    creatorVisible.value = true;
  }

  function closeCreator() {
    creatorVisible.value = false;
  }

  function append(task: TaskItem) {
    tasks.value.unshift(task);
  }

  return {
    tasks,
    creatorVisible,
    openCreator,
    closeCreator,
    append
  };
});
