<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <h1 class="app-title">🏫 校园二手市场</h1>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <nav class="bottom-nav">
      <router-link to="/home" class="nav-item" :class="{ active: route.path === '/home' }">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">首页</span>
      </router-link>
      <router-link to="/list" class="nav-item" :class="{ active: route.path === '/list' }">
        <span class="nav-icon">📋</span>
        <span class="nav-label">列表</span>
      </router-link>
      <router-link to="/publish" class="nav-item publish-btn" :class="{ active: route.path === '/publish' }">
        <span class="nav-icon">➕</span>
        <span class="nav-label">发布</span>
      </router-link>
      <router-link to="/message" class="nav-item" :class="{ active: route.path === '/message' }">
        <span class="nav-icon">💬</span>
        <span class="nav-label">消息</span>
      </router-link>
      <router-link to="/profile" class="nav-item" :class="{ active: route.path === '/profile' }">
        <span class="nav-icon">👤</span>
        <span class="nav-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
/* ===== 全局重置 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6fa;
}

/* ===== 顶部标题栏 ===== */
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

/* ===== 主内容区 ===== */
.app-main {
  flex: 1;
  padding: 16px;
  padding-bottom: 80px; /* 为底部导航留空间 */
  overflow-y: auto;
}

/* ===== 底部导航栏 ===== */
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
  color: #667eea;
}

.nav-item.active {
  color: #667eea;
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
  background: linear-gradient(135deg, #66eaaf 0%, #4ba26b 100%);
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
