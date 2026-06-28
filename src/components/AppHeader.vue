<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitleMap: Record<string, string> = {
  '/': '🏫 校园二手市场',
  '/trade': '🛒 二手交易',
  '/lost-found': '🔍 失物招领',
  '/group-buy': '👥 拼团',
  '/errand': '🏃 跑腿',
  '/publish': '📝 发布信息',
  '/message': '💬 消息',
  '/user': '🦲 个人中心',
}

const title = computed(() => pageTitleMap[route.path] || '校园二手市场')
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #66eaaf 0%, #4ba26b 100%);
  color: #fff;
  text-align: center;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.app-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
