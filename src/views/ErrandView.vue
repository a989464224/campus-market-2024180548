<script setup lang="ts">
import { ref } from 'vue'

interface ErrandItem {
  id: number
  title: string
  type: string
  reward: number
  desc: string
  location: string
  publisher: string
  time: string
  status: 'open' | 'taken'
}

const errands = ref<ErrandItem[]>([
  { id: 1, title: '帮忙取快递', type: '取件', reward: 5, desc: '中通快递，在学校快递站，取件码已发', location: '快递站', publisher: '小周', time: '30分钟前', status: 'open' },
  { id: 2, title: '代买早餐', type: '代购', reward: 3, desc: '食堂一楼买两个包子和一杯豆浆', location: '食堂', publisher: '小李', time: '1小时前', status: 'open' },
  { id: 3, title: '帮忙搬宿舍', type: '搬运', reward: 20, desc: '从5号楼搬到7号楼，东西不多', location: '宿舍区', publisher: '小张', time: '2小时前', status: 'taken' },
  { id: 4, title: '图书馆占座', type: '占座', reward: 2, desc: '明天早上帮忙占一个靠窗的位置', location: '图书馆', publisher: '小王', time: '3小时前', status: 'open' },
])
</script>

<template>
  <div class="errand-page">
    <h2 class="page-title">🏃 跑腿</h2>

    <div class="errand-list">
      <div v-for="item in errands" :key="item.id" class="errand-card">
        <div class="card-header">
          <div class="header-left">
            <span class="type-tag">{{ item.type }}</span>
            <h3 class="card-title">{{ item.title }}</h3>
          </div>
          <span class="reward">¥{{ item.reward }}</span>
        </div>
        <p class="card-desc">{{ item.desc }}</p>
        <div class="card-meta">
          <span>📍 {{ item.location }}</span>
          <span>🦲 {{ item.publisher }}</span>
          <span>🕐 {{ item.time }}</span>
        </div>
        <div class="card-actions">
          <span class="status" :class="item.status">
            {{ item.status === 'open' ? '待接单' : '已接单' }}
          </span>
          <button
            class="take-btn"
            :disabled="item.status === 'taken'"
          >
            {{ item.status === 'taken' ? '已被接' : '接单' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errand-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #38e141;
}

.errand-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.errand-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-tag {
  font-size: 11px;
  color: #e67e22;
  background: rgba(230, 126, 34, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.reward {
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
  white-space: nowrap;
}

.card-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.card-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
}

.status.open {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.status.taken {
  background: rgba(153, 153, 153, 0.1);
  color: #999;
}

.take-btn {
  padding: 6px 18px;
  border: none;
  border-radius: 6px;
  background: #667eea;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.take-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.take-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
