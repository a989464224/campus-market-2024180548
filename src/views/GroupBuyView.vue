<script setup lang="ts">
import { ref } from 'vue'

interface GroupItem {
  id: number
  title: string
  price: number
  originalPrice: number
  currentCount: number
  targetCount: number
  desc: string
  initiator: string
  deadline: string
}

const groups = ref<GroupItem[]>([
  { id: 1, title: '奶茶拼单 第二杯半价', price: 12, originalPrice: 18, currentCount: 3, targetCount: 5, desc: '学校门口奶茶店，满5杯享优惠', initiator: '小明', deadline: '今天 18:00' },
  { id: 2, title: '水果拼单 满减优惠', price: 25, originalPrice: 35, currentCount: 2, targetCount: 4, desc: '新鲜水果拼单，4人成团享满减', initiator: '小红', deadline: '明天 12:00' },
  { id: 3, title: '打印纸团购', price: 15, originalPrice: 22, currentCount: 8, targetCount: 10, desc: 'A4打印纸500张/包，10人团购价', initiator: '小刚', deadline: '后天 20:00' },
])

function getProgress(item: GroupItem): number {
  return Math.round((item.currentCount / item.targetCount) * 100)
}
</script>

<template>
  <div class="group-buy-page">
    <h2 class="page-title">👥 拼团</h2>

    <div class="group-list">
      <div v-for="item in groups" :key="item.id" class="group-card">
        <div class="card-header">
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="price-area">
            <span class="current-price">¥{{ item.price }}</span>
            <span class="original-price">¥{{ item.originalPrice }}</span>
          </div>
        </div>
        <p class="card-desc">{{ item.desc }}</p>

        <!-- 进度条 -->
        <div class="progress-section">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: getProgress(item) + '%' }"
            ></div>
          </div>
          <span class="progress-text">
            {{ item.currentCount }}/{{ item.targetCount }}人
          </span>
        </div>

        <div class="card-footer">
          <span class="initiator">发起人：{{ item.initiator }}</span>
          <span class="deadline">截止：{{ item.deadline }}</span>
        </div>

        <button class="join-btn" :disabled="item.currentCount >= item.targetCount">
          {{ item.currentCount >= item.targetCount ? '已成团' : '立即参团' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-buy-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.group-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.group-card {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.price-area {
  text-align: right;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
  display: block;
}

.original-price {
  font-size: 12px;
  color: #bbb;
  text-decoration: line-through;
}

.card-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
}

/* 进度条 */
.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 12px;
}

.join-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.join-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.join-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
