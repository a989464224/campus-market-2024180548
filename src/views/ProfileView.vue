<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrades } from '@/api/trade'
import { getLostFounds } from '@/api/lostFound'
import { getGroupBuys } from '@/api/groupBuy'
import { getErrands } from '@/api/errand'

const stats = ref({ posts: 0, favs: 28, score: 96 })

onMounted(async () => {
  try {
    const [tRes, lRes, gRes, eRes] = await Promise.allSettled([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    let total = 0
    if (tRes.status === 'fulfilled') total += tRes.value.data.length
    if (lRes.status === 'fulfilled') total += lRes.value.data.length
    if (gRes.status === 'fulfilled') total += gRes.value.data.length
    if (eRes.status === 'fulfilled') total += eRes.value.data.length
    stats.value.posts = total
  } catch {
    // keep default on failure
  }
})

const activities = [
  { text: '你发布了二手商品"机械键盘 IKBC C87 青轴"', time: '2小时前', dot: 'active' },
  { text: '李同学收藏了你的商品', time: '1小时前', dot: 'active' },
  { text: '你与李同学在聊天中达成交易', time: '30分钟前', dot: 'active' },
  { text: '你的商品"高等数学第七版"已自动下架', time: '昨天', dot: 'warning' },
  { text: '你收藏了陈同学的失物招领信息', time: '昨天', dot: 'muted' },
]
</script>

<template>
  <div class="profile-page">
    <!-- 个人信息卡片 -->
    <div class="profile-header-card">
      <img src="https://ui-avatars.com/api/?name=Zhang+TX&background=059669&color=fff&size=176" alt="头像" class="profile-avatar" />
      <div class="profile-info">
        <div class="profile-name">张同学</div>
        <div class="profile-bio">计算机科学与技术学院 · 2023级 · 东校区</div>
        <div class="profile-tags">
          <el-tag size="small" type="success">信用优秀</el-tag>
          <el-tag size="small">已认证学生</el-tag>
          <el-tag size="small" type="warning">活跃用户</el-tag>
        </div>
      </div>
      <div class="profile-stats">
        <div class="p-stat"><div class="p-stat-num">{{ stats.posts }}</div><div class="p-stat-lbl">我的发布</div></div>
        <div class="p-stat"><div class="p-stat-num">{{ stats.favs }}</div><div class="p-stat-lbl">我的收藏</div></div>
        <div class="p-stat"><div class="p-stat-num">{{ stats.score }}</div><div class="p-stat-lbl">信用分</div></div>
      </div>
    </div>

    <!-- 功能区域 -->
    <div class="section-grid">
      <div class="menu-card">
        <h3>📋 我的内容</h3>
        <router-link to="/user" class="menu-item">
          <span class="mi-icon" style="background:#ECFDF5;">📦</span>
          <span class="mi-text"><div class="mi-title">我的发布</div><div class="mi-sub">管理已发布的信息</div></span>
          <span class="mi-arrow">→</span>
        </router-link>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#FFFBEB;">⭐</span>
          <span class="mi-text"><div class="mi-title">我的收藏</div><div class="mi-sub">查看收藏的商品和信息</div></span>
          <span class="mi-arrow">→</span>
        </a>
        <router-link to="/message" class="menu-item">
          <span class="mi-icon" style="background:#EFF6FF;">💬</span>
          <span class="mi-text"><div class="mi-title">我的消息</div><div class="mi-sub">查看与同学的聊天记录</div></span>
          <span class="mi-arrow">→</span>
        </router-link>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#FEF2F2;">📊</span>
          <span class="mi-text"><div class="mi-title">浏览历史</div><div class="mi-sub">最近看过的内容</div></span>
          <span class="mi-arrow">→</span>
        </a>
      </div>

      <div class="menu-card">
        <h3>⚙️ 账号管理</h3>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#F3F4F6;">⚙️</span>
          <span class="mi-text"><div class="mi-title">账号设置</div><div class="mi-sub">修改个人信息、密码、手机号</div></span>
          <span class="mi-arrow">→</span>
        </a>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#F3F4F6;">🔒</span>
          <span class="mi-text"><div class="mi-title">隐私设置</div><div class="mi-sub">管理谁可以看我的信息</div></span>
          <span class="mi-arrow">→</span>
        </a>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#F3F4F6;">🔔</span>
          <span class="mi-text"><div class="mi-title">消息通知</div><div class="mi-sub">设置消息提醒方式</div></span>
          <span class="mi-arrow">→</span>
        </a>
        <a href="#" class="menu-item" @click.prevent>
          <span class="mi-icon" style="background:#F3F4F6;">❓</span>
          <span class="mi-text"><div class="mi-title">帮助与反馈</div><div class="mi-sub">常见问题、意见反馈</div></span>
          <span class="mi-arrow">→</span>
        </a>
      </div>
    </div>

    <!-- 最近动态 -->
    <div class="activity-card">
      <h3>🕐 最近动态</h3>
      <div v-for="(a, idx) in activities" :key="idx" class="activity-item">
        <span class="act-dot" :class="a.dot"></span>
        <span>{{ a.text }}</span>
        <span class="act-time">{{ a.time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page { /* full width */ }
.profile-header-card { background: linear-gradient(135deg, #ECFDF5, #D1FAE5); border-radius: 16px; padding: 32px; margin-bottom: 24px; display: flex; gap: 24px; align-items: center; }
.profile-avatar { width: 88px; height: 88px; border-radius: 50%; border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover; }
.profile-info { flex: 1; }
.profile-name { font-size: 22px; font-weight: 700; color: var(--color-text-title); margin-bottom: 2px; }
.profile-bio { font-size: 13px; color: #6B7280; margin-bottom: 8px; }
.profile-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.profile-stats { display: flex; gap: 24px; }
.p-stat { text-align: center; }
.p-stat-num { font-size: 22px; font-weight: 700; color: #059669; }
.p-stat-lbl { font-size: 12px; color: #047857; }
.section-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
.menu-card { background: #fff; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); }
.menu-card h3 { font-size: 16px; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #F3F4F6; margin-bottom: 12px; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.15s; }
.menu-item:hover { background: #F9FAFB; }
.mi-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.mi-text { flex: 1; }
.mi-title { font-size: 14px; font-weight: 500; color: var(--color-text-title); }
.mi-sub { font-size: 12px; color: #9CA3AF; }
.mi-arrow { color: #D1D5DB; }
.activity-card { background: #fff; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); }
.activity-card h3 { font-size: 16px; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #F3F4F6; margin-bottom: 12px; }
.activity-item { padding: 10px 0; border-bottom: 1px solid #F9FAFB; font-size: 13px; color: #6B7280; display: flex; align-items: center; gap: 8px; }
.act-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; }
.act-dot.warning { background: #F59E0B; }
.act-dot.muted { background: #9CA3AF; }
.act-time { margin-left: auto; color: #9CA3AF; font-size: 12px; flex-shrink: 0; }
</style>
