<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { getTrades, type TradeItem } from '@/api/trade'

const trades = ref<TradeItem[]>([])
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const res = await getTrades()
    trades.value = res.data
  } catch {
    trades.value = []
  }
})
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h1>🛒 二手交易</h1>
      <p>浏览同学发布的闲置物品，发现校园内的实用好物。</p>
    </div>

    <EmptyState
      v-if="trades.length === 0"
      text="暂无二手交易信息"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in trades"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.category"
        :location="item.location"
        :time="item.publishTime"
      >
        <template #footer>
          <strong class="price">￥{{ item.price }}</strong>
          <span class="condition">{{ item.condition }}</span>
          <span class="status">{{ item.status === 'open' ? '在售' : item.status === 'closed' ? '已下架' : '已售出' }}</span>
          <button class="favorite-btn" @click="favoriteStore.toggleFavorite({
            id: item.id,
            type: 'trade',
            title: item.title,
            description: item.description,
            location: item.location
          })">
            {{ favoriteStore.isFavorite('trade', item.id) ? '已收藏' : '收藏' }}
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

.price {
  font-size: 18px;
  font-weight: 700;
  color: #EF4444;
}

.condition {
  margin-left: 12px;
  color: #6b7280;
}

.status {
  margin-left: auto;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f0fdf4;
  color: #16a34a;
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
