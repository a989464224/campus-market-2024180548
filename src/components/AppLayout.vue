<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNav from './AppNav.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="app-main">
      <RouterView />
    </main>

    <AppNav />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fb;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 80px;
  overflow-y: auto;
}
</style>
