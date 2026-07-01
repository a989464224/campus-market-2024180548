<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import { getTrades, type TradeItem } from '@/api/trade'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import { getErrands, type ErrandItem } from '@/api/errand'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])

onMounted(async () => {
  try {
    const [tRes, lRes, gRes, eRes] = await Promise.allSettled([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    if (tRes.status === 'fulfilled') trades.value = tRes.value.data
    if (lRes.status === 'fulfilled') lostFounds.value = lRes.value.data
    if (gRes.status === 'fulfilled') groupBuys.value = gRes.value.data
    if (eRes.status === 'fulfilled') errands.value = eRes.value.data
  } catch {
    // keep empty arrays on failure
  }
})

const myTrades = computed(() => {
  return trades.value.filter((item) => item.publisher === userStore.displayName)
})

const myLostFounds = computed(() => {
  return lostFounds.value.filter((item) => item.publisher === userStore.displayName)
})

const myGroupBuys = computed(() => {
  return groupBuys.value.filter((item) => item.publisher === userStore.displayName)
})

const myErrands = computed(() => {
  return errands.value.filter((item) => item.publisher === userStore.displayName)
})

const totalMyPosts = computed(() => {
  return myTrades.value.length + myLostFounds.value.length + myGroupBuys.value.length + myErrands.value.length
})

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }
  return map[type] || '校园信息'
}
</script>

<template>
  <section class="page">
    <!-- 用户资料卡片 -->
    <div class="profile-card">
      <img v-if="userStore.currentUser.avatar" :src="userStore.currentUser.avatar" :alt="userStore.displayName" class="avatar-img" />
      <div v-else class="avatar">
        {{ userStore.displayName.slice(0, 1) }}
      </div>

      <div>
        <h1>{{ userStore.displayName }}</h1>
        <p>{{ userStore.userDescription }}</p>
        <p>{{ userStore.currentUser.bio }}</p>
      </div>
    </div>

    <!-- 我的收藏 -->
    <div class="panel">
      <h2>我的收藏</h2>

      <EmptyState
        v-if="favoriteStore.favorites.length === 0"
        text="暂无收藏内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in favoriteStore.favorites"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="getTypeLabel(item.type)"
          :location="item.location"
        >
          <template #footer>
            <button class="remove-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">
              取消收藏
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <!-- 我的发布 -->
    <div class="panel">
      <h2>我的发布</h2>
      <p class="hint">
        本模块用于展示当前用户发布过的信息。Day5 阶段可先完成结构展示，后续可继续与接口数据联动。
      </p>

      <EmptyState
        v-if="totalMyPosts === 0"
        text="暂无发布内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in myTrades"
          :key="`trade-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="`二手交易 · ${item.category}`"
          :location="item.location"
          :time="item.publishTime"
        >
          <template #footer>
            <strong class="my-price">￥{{ item.price }}</strong>
            <span class="my-status">{{ item.status === 'open' ? '在售' : item.status === 'closed' ? '已下架' : '已售出' }}</span>
          </template>
        </ItemCard>
      </div>

      <nav class="nav-links">
        <router-link to="/user">查看全部发布记录 →</router-link>
        <router-link to="/publish">发布新信息 →</router-link>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card,
.panel {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eff6ff;
  color: #2563eb;
  font-size: 28px;
  font-weight: 700;
  flex-shrink: 0;
}

.avatar-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
}

.profile-card p,
.hint {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.favorite-list {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.remove-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}

.my-price {
  font-size: 18px;
  font-weight: 700;
  color: #EF4444;
}

.my-status {
  margin-left: 12px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f0fdf4;
  color: #16a34a;
}

.nav-links {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: var(--color-primary);
  font-weight: 500;
  font-size: 14px;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
