<script setup lang="ts">
interface StatItem {
  label: string
  value: number | string
  icon: string
  color: string
}

const stats: StatItem[] = [
  { label: '在售商品', value: 128, icon: '📦', color: '#667eea' },
  { label: '今日新增', value: 23, icon: '🆕', color: '#27ae60' },
  { label: '累计成交', value: 1876, icon: '🤝', color: '#e67e22' },
  { label: '活跃用户', value: 356, icon: '👥', color: '#e74c3c' },
]
</script>

<template>
  <div class="board-page">
    <h2 class="page-title">📊 数据看板</h2>

    <div class="stats-grid">
      <div
        class="stat-card"
        v-for="s in stats"
        :key="s.label"
        :style="{ borderTopColor: s.color }"
      >
        <span class="stat-icon">{{ s.icon }}</span>
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  border-top: 4px solid #36dc7e;
  padding: 20px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  display: block;
}

.stat-label {
  font-size: 13px;
  color: #37d07c;
  margin-top: 4px;
}
</style>
