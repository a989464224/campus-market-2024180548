<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const userStore = useUserStore()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/category', label: '分类浏览' },
  { path: '/publish', label: '发布信息' },
  { path: '/message', label: '消息' },
  { path: '/profile', label: '个人中心' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="header-logo">
        <span class="logo-icon">🏫</span>
        <span class="logo-text">校园轻集市</span>
      </router-link>

      <nav class="header-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <router-link to="/profile" class="user-mini">
          <span>{{ userStore.displayName }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  max-width: var(--content-max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.logo-text {
  letter-spacing: 1px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-body);
  transition: all 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  background: var(--color-bg);
  color: var(--color-primary);
}

.nav-link.active {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-mini {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: background 0.15s;
}

.user-mini:hover {
  background: var(--color-bg);
}
</style>
