<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type TradeItem } from '@/api/trade'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import { getErrands, type ErrandItem } from '@/api/errand'

interface UnifiedPost {
  id: number
  title: string
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  typeLabel: string
  status: string
  statusType: '' | 'success' | 'warning' | 'danger' | 'info'
  desc: string
  time: string
  location: string
  price: number
}

const activeTab = ref('all')
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

const allPosts = computed<UnifiedPost[]>(() => {
  const result: UnifiedPost[] = []

  trades.value.forEach((item) => {
    result.push({
      id: item.id ?? 0,
      title: item.title,
      type: 'trade',
      typeLabel: '二手交易',
      status: item.status === 'open' ? '在售' : item.status === 'closed' ? '已下架' : '已售出',
      statusType: item.status === 'open' ? 'success' : 'info',
      desc: item.description,
      time: item.publishTime,
      location: item.location,
      price: item.price,
    })
  })

  lostFounds.value.forEach((item) => {
    result.push({
      id: item.id ?? 0,
      title: item.title,
      type: 'lostFound',
      typeLabel: '失物招领',
      status: item.status === 'open' ? '寻找中' : item.status === 'closed' ? '已结束' : '已完成',
      statusType: item.status === 'open' ? 'danger' : 'info',
      desc: item.description,
      time: item.eventTime,
      location: item.location,
      price: 0,
    })
  })

  groupBuys.value.forEach((item) => {
    result.push({
      id: item.id ?? 0,
      title: item.title,
      type: 'groupBuy',
      typeLabel: '拼单搭子',
      status: item.status === 'open' ? '拼单中' : item.status === 'closed' ? '已结束' : '已完成',
      statusType: item.status === 'open' ? 'warning' : 'info',
      desc: item.description,
      time: item.deadline,
      location: item.location,
      price: 0,
    })
  })

  errands.value.forEach((item) => {
    result.push({
      id: item.id ?? 0,
      title: item.title,
      type: 'errand',
      typeLabel: '跑腿委托',
      status: item.status === 'open' ? '待接单' : item.status === 'taken' ? '已接单' : '已完成',
      statusType: item.status === 'open' ? 'danger' : item.status === 'taken' ? 'warning' : 'success',
      desc: item.description,
      time: item.deadline,
      location: `${item.from} → ${item.to}`,
      price: item.reward,
    })
  })

  return result
})

const filteredPosts = computed(() => {
  if (activeTab.value === 'all') return allPosts.value
  return allPosts.value.filter((p) => p.type === activeTab.value)
})

const tradeCount = computed(() => allPosts.value.filter((p) => p.type === 'trade').length)
const lostFoundCount = computed(() => allPosts.value.filter((p) => p.type === 'lostFound').length)
const groupBuyCount = computed(() => allPosts.value.filter((p) => p.type === 'groupBuy').length)
const errandCount = computed(() => allPosts.value.filter((p) => p.type === 'errand').length)
</script>

<template>
  <div class="user-page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link to="/profile">个人中心</router-link><span class="sep">/</span>
      <span class="cur">我的发布</span>
    </div>

    <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <h1 class="page-title">📋 我的发布</h1>
        <p class="page-subtitle">管理你发布的所有信息，共 <b>{{ allPosts.length }}</b> 条</p>
      </div>
      <router-link to="/publish"><el-button type="primary">发布新信息</el-button></router-link>
    </div>

    <el-tabs v-model="activeTab" style="margin-bottom:16px;">
      <el-tab-pane :label="`全部 (${allPosts.length})`" name="all" />
      <el-tab-pane :label="`二手交易 (${tradeCount})`" name="trade" />
      <el-tab-pane :label="`失物招领 (${lostFoundCount})`" name="lostFound" />
      <el-tab-pane :label="`拼单搭子 (${groupBuyCount})`" name="groupBuy" />
      <el-tab-pane :label="`跑腿委托 (${errandCount})`" name="errand" />
    </el-tabs>

    <div v-if="filteredPosts.length === 0" class="empty-hint">
      暂无发布记录，<router-link to="/publish">去发布</router-link>
    </div>

    <div v-else>
      <div v-for="post in filteredPosts" :key="`${post.type}-${post.id}`" class="post-card">
        <div class="post-body">
          <div class="post-title">
            {{ post.title }}
            <el-tag size="small">{{ post.typeLabel }}</el-tag>
          </div>
          <div class="post-desc">{{ post.desc }}</div>
          <div class="post-meta">
            <el-tag size="small" :type="post.statusType">{{ post.status }}</el-tag>
            <span>🕐 {{ post.time }}</span>
            <span>📍 {{ post.location }}</span>
          </div>
        </div>
        <div class="post-right">
          <span v-if="post.price > 0" class="post-price">¥{{ post.price }}</span>
          <span v-else class="post-free">免费</span>
          <div class="post-actions">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-page { /* full width */ }
.post-card {
  background: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 12px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.post-body {
  flex: 1;
  min-width: 0;
}
.post-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.post-desc {
  font-size: 12px;
  color: #9CA3AF;
  margin-bottom: 8px;
}
.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #9CA3AF;
  align-items: center;
  flex-wrap: wrap;
}
.post-right {
  text-align: right;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.post-price {
  font-size: 18px;
  font-weight: 700;
  color: #EF4444;
}
.post-free {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}
.post-actions {
  display: flex;
  gap: 6px;
}

.empty-hint {
  text-align: center;
  padding: 48px 0;
  color: #9CA3AF;
  font-size: 15px;
}
.empty-hint a {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
