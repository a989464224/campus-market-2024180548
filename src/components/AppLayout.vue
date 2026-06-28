<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer-inner">
        <span>© 2026 校园轻集市 · Campus Light Market</span>
        <span>高校校园生活服务平台 | 二手交易 · 失物招领 · 拼单搭子 · 跑腿委托</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
}

.app-main {
  flex: 1;
  max-width: var(--content-max-width);
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.app-footer {
  background: var(--color-bg-white);
  border-top: 1px solid var(--color-border);
  padding: 16px 0;
  margin-top: 40px;
}

.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>
