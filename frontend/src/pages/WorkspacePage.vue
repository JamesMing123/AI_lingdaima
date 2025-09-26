<template>
  <section class="workspace">
    <ConversationPanel class="workspace__panel" />
    <aside class="workspace__sidebar">
      <TaskList />
      <SessionList />
    </aside>
  </section>
</template>

<script setup lang="ts">
import ConversationPanel from '../components/ConversationPanel.vue';
import TaskList from '../components/TaskList.vue';
import SessionList from '../components/SessionList.vue';
</script>

<style scoped>
.workspace {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
}

.workspace__panel {
  min-height: 70vh;
}

.workspace__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 960px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}
</style>
