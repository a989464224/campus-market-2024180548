<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  name: '未登录用户',
  avatar: '🦲',
  school: 'XX大学',
})

const menuItems = ref([
  { icon: '📦', label: '我的发布', count: 3 },
  { icon: '❤️', label: '我的收藏', count: 5 },
  { icon: '📋', label: '我的订单', count: 2 },
  { icon: '🏃', label: '我的跑腿', count: 0 },
  { icon: '⚙️', label: '设置' },
  { icon: '❓', label: '帮助与反馈' },
])
</script>

<template>
  <div class="user-page">
    <h2 class="page-title">🦲 个人中心</h2>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <span class="user-avatar">{{ userInfo.avatar }}</span>
      <div class="user-info">
        <span class="user-name">{{ userInfo.name }}</span>
        <span class="user-school">{{ userInfo.school }}</span>
      </div>
      <span class="edit-btn">编辑</span>
    </div>

    <!-- 菜单列表 -->
    <div class="menu-list">
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="menu-item"
      >
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
        <span class="menu-right">
          <span v-if="item.count !== undefined && item.count > 0" class="menu-count">{{ item.count }}</span>
          <span class="menu-arrow">›</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

/* 用户卡片 */
.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #5ed895, #0dde60);
  color: #fff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
}

.user-avatar {
  font-size: 48px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
}

.user-school {
  font-size: 13px;
  opacity: 0.85;
}

.edit-btn {
  font-size: 13px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 菜单 */
.menu-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.15s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #fafafa;
}

.menu-icon {
  font-size: 20px;
}

.menu-label {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-count {
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.menu-arrow {
  font-size: 20px;
  color: #ccc;
}
</style>
