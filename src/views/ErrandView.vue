<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { getErrands, type ErrandItem } from '@/api/errand'

const errands = ref<ErrandItem[]>([])
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const res = await getErrands()
    errands.value = res.data
  } catch {
    errands.value = []
  }
})
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h1>🏃 跑腿委托</h1>
      <p>找同学帮忙跑个腿，解决临时小需求。</p>
    </div>

    <EmptyState
      v-if="errands.length === 0"
      text="暂无跑腿委托"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in errands"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :location="`${item.from} → ${item.to}`"
        :time="item.deadline"
      >
        <template #footer>
          <strong class="reward">￥{{ item.reward }}</strong>
          <span class="publisher">👤 {{ item.publisher }}</span>
          <span class="status-tag" :class="item.status">
            {{ item.status === 'open' ? '待接单' : item.status === 'taken' ? '已接单' : '已完成' }}
          </span>
          <button class="favorite-btn" @click="favoriteStore.toggleFavorite({
            id: item.id,
            type: 'errand',
            title: item.title,
            description: item.description,
            location: `${item.from} → ${item.to}`
          })">
            {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
          </button>
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

.reward {
  font-size: 18px;
  font-weight: 700;
  color: #EF4444;
}

.publisher {
  margin-left: 12px;
  color: #6b7280;
  font-size: 13px;
}

.status-tag {
  margin-left: auto;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f0fdf4;
  color: #16a34a;
}

.status-tag.taken {
  background: #eff6ff;
  color: #2563eb;
}

.status-tag.done {
  background: #f3f4f6;
  color: #9ca3af;
}

.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}
</style>
