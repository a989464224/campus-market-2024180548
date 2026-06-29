<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'

const items = ref<LostFoundItem[]>([])

onMounted(async () => {
  try {
    const res = await getLostFounds()
    items.value = res.data
  } catch {
    items.value = []
  }
})
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h1>🔍 失物招领</h1>
      <p>帮助同学们找回失物，传递校园温暖。</p>
    </div>

    <EmptyState
      v-if="items.length === 0"
      text="暂无失物招领信息"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '寻物' : '招领'"
        :location="item.location"
        :time="item.eventTime"
      >
        <template #footer>
          <span class="item-name">📦 {{ item.itemName }}</span>
          <span class="contact">📞 {{ item.contact }}</span>
          <span class="status-tag" :class="item.status">
            {{ item.status === 'open' ? '进行中' : item.status === 'closed' ? '已结束' : '已完成' }}
          </span>
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

.item-name {
  color: #4b5563;
  font-size: 13px;
}

.contact {
  margin-left: 16px;
  color: #6b7280;
  font-size: 13px;
}

.status-tag {
  margin-left: auto;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
}

.status-tag.closed {
  background: #f3f4f6;
  color: #9ca3af;
}

.status-tag.done {
  background: #f0fdf4;
  color: #16a34a;
}
</style>
