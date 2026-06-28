<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', icon: '🏠', label: '首页' },
  { path: '/trade', icon: '🛒', label: '交易' },
  { path: '/publish', icon: '➕', label: '发布' },
  { path: '/message', icon: '💬', label: '消息' },
  { path: '/user', icon: '🦲', label: '我的' },
]
</script>

<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{
        active: route.path === item.path,
        'publish-btn': item.path === '/publish',
      }"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 6px 0 env(safe-area-inset-bottom, 6px);
  z-index: 100;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #32dc57;
}

.nav-item.active {
  color: #26da68;
}

.nav-icon {
  font-size: 22px;
}

.nav-label {
  font-size: 11px;
}

/* 发布按钮突出 */
.publish-btn .nav-icon {
  font-size: 28px;
  background: linear-gradient(135deg, #66eaaf, #4ba26b);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  box-shadow: 0 4px 12px rgba(72, 222, 164, 0.4);
}

.publish-btn.active .nav-icon {
  box-shadow: 0 4px 16px rgba(81, 235, 127, 0.6);
  transform: scale(1.08);
}
</style>
