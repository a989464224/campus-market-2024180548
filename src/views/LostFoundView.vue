<script setup lang="ts">
import { ref } from 'vue'

interface LostItem {
  id: number
  title: string
  type: 'lost' | 'found'
  desc: string
  location: string
  time: string
  contact: string
}

const items = ref<LostItem[]>([
  { id: 1, title: '蓝色校园卡', type: 'found', desc: '在图书馆三楼捡到，姓名：张**', location: '图书馆', time: '今天 10:30', contact: 'QQ: 12345' },
  { id: 2, title: '黑色双肩包', type: 'lost', desc: '在食堂二楼丢失，内有笔记本和课本', location: '食堂', time: '昨天 12:00', contact: '微信: abc123' },
  { id: 3, title: '一串钥匙', type: 'found', desc: '在操场跑道旁捡到，有U盘挂件', location: '操场', time: '今天 08:15', contact: '电话: 138****' },
  { id: 4, title: '白色耳机', type: 'lost', desc: '无线蓝牙耳机，充电仓为白色', location: '教学楼A区', time: '前天 15:00', contact: 'QQ: 67890' },
])

const activeTab = ref<'all' | 'lost' | 'found'>('all')

const filteredItems = ref<LostItem[]>(items.value)

function switchTab(tab: 'all' | 'lost' | 'found') {
  activeTab.value = tab
  if (tab === 'all') {
    filteredItems.value = items.value
  } else {
    filteredItems.value = items.value.filter(item => item.type === tab)
  }
}
</script>

<template>
  <div class="lost-found-page">
    <h2 class="page-title">🔍 失物招领</h2>

    <!-- 标签切换 -->
    <div class="tab-bar">
      <span
        class="tab-item"
        :class="{ active: activeTab === 'all' }"
        @click="switchTab('all')"
      >全部</span>
      <span
        class="tab-item"
        :class="{ active: activeTab === 'lost' }"
        @click="switchTab('lost')"
      >寻物启事</span>
      <span
        class="tab-item"
        :class="{ active: activeTab === 'found' }"
        @click="switchTab('found')"
      >失物招领</span>
    </div>

    <!-- 列表 -->
    <div class="item-list">
      <div v-for="item in filteredItems" :key="item.id" class="item-card">
        <div class="card-header">
          <span class="type-badge" :class="item.type">
            {{ item.type === 'lost' ? '寻物' : '招领' }}
          </span>
          <span class="time">{{ item.time }}</span>
        </div>
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
        <div class="card-meta">
          <span>📍 {{ item.location }}</span>
          <span>📞 {{ item.contact }}</span>
        </div>
      </div>

      <div v-if="filteredItems.length === 0" class="empty-tip">
        暂无相关信息
      </div>
    </div>
  </div>
</template>

<style scoped>
.lost-found-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

/* 标签切换 */
.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  background: #f0f0f0;
  border-radius: 10px;
  padding: 4px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  user-select: none;
}

.tab-item.active {
  background: #fff;
  color: #667eea;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 列表 */
.item-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.type-badge {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.type-badge.lost {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.type-badge.found {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.time {
  font-size: 12px;
  color: #aaa;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
}

.empty-tip {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}
</style>
