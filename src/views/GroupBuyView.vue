<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'

const groups = ref<GroupBuyItem[]>([])
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const res = await getGroupBuys()
    groups.value = res.data
  } catch {
    groups.value = []
  }
})

function progressPercent(item: GroupBuyItem): number {
  return Math.round((item.currentCount / item.targetCount) * 100)
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h1>👥 拼单搭子</h1>
      <p>找到志同道合的小伙伴，一起拼更划算。</p>
    </div>

    <EmptyState
      v-if="groups.length === 0"
      text="暂无拼单信息"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in groups"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <div class="group-footer">
            <span class="count">{{ item.currentCount }}/{{ item.targetCount }} 人</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercent(item) + '%' }" />
            </div>
            <span class="status-tag" :class="item.status">
              {{ item.status === 'open' ? '拼单中' : item.status === 'closed' ? '已截止' : '已完成' }}
            </span>
            <button class="favorite-btn" @click="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'groupBuy',
              title: item.title,
              description: item.description,
              location: item.location
            })">
              {{ favoriteStore.isFavorite('groupBuy', item.id) ? '已收藏' : '收藏' }}
            </button>
          </div>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-title);
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.group-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.count {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s;
}

.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  white-space: nowrap;
}

.status-tag.closed {
  background: #fef2f2;
  color: #ef4444;
}

.status-tag.done {
  background: #f0fdf4;
  color: #16a34a;
}

.favorite-btn {
  margin-left: 8px;
  border: none;
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
  font-size: 12px;
  white-space: nowrap;
}
</style>
