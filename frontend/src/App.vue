<template>
  <div class="layout">
    <header class="layout__header">
      <h1>AI 灵代码平台</h1>
      <p>自然语言驱动的智能开发助手</p>
    </header>
    <main class="layout__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #1f2937, #111827);
  color: #f9fafb;
}

.layout__header {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.layout__main {
  flex: 1;
  padding: 2rem;
}
</style>
