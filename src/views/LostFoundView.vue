<script setup lang="ts">
import { ref, computed } from 'vue'

interface LostItem {
  id: number
  image: string
  title: string
  type: 'lost' | 'found'
  desc: string
  location: string
  time: string
  contact: string
  views: number
}
const activeTab = ref<'all' | 'lost' | 'found'>('all')

const items: LostItem[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1605100809150-a60be93ba541?w=200&h=200&fit=crop', title: '拾到校园卡一张 信息工程学院', type: 'found', desc: '在图书馆三楼自习室捡到，信息工程学院 王XX 同学', location: '图书馆', time: '今天 10:30', contact: '微信：zhao_tx', views: 89 },
  { id: 2, image: 'https://images.unsplash.com/photo-1611689342795-612db4423949?w=200&h=200&fit=crop', title: '西门打印店附近丢失黑色耳机盒', type: 'lost', desc: 'AirPods Pro黑色保护壳，外壳有黄色小鸭子贴纸', location: '西门口打印店', time: '昨天 16:00', contact: '微信：chen_student', views: 215 },
  { id: 3, image: 'https://images.unsplash.com/photo-1589391886645-d6425f30ebcd?w=200&h=200&fit=crop', title: '图书馆丢失灰色保温杯 500ml', type: 'lost', desc: '象印牌灰色保温杯，杯身有轻微划痕，杯盖有姓名贴纸', location: '图书馆二楼', time: '昨天 14:00', contact: 'QQ：456789', views: 132 },
  { id: 4, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=200&h=200&fit=crop', title: '操场拾到钥匙一串 有U盘挂件', type: 'found', desc: '在操场跑道旁捡到，有3把钥匙和一个8G U盘挂件', location: '操场', time: '今天 08:15', contact: '微信：sunny_day', views: 56 },
  { id: 5, image: 'https://images.unsplash.com/photo-1590739220056-c55b0dd0ef0b?w=200&h=200&fit=crop', title: '教学楼A区丢失白色蓝牙耳机', type: 'lost', desc: '充电仓为白色，品牌JBL，左耳有轻微划痕', location: '教学楼A区301', time: '前天 15:00', contact: 'QQ：67890', views: 178 },
  { id: 6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', title: '二食堂拾到黑色双肩包', type: 'found', desc: '内有笔记本和课本，书上有名字但模糊不清', location: '二食堂', time: '今天 12:00', contact: '微信：helper_li', views: 94 },
  { id: 7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', title: '南门附近丢失红色运动手表', type: 'lost', desc: 'Amazfit运动手表，红色表带，表面有贴膜', location: '南门口', time: '3天前', contact: '微信：runner_wang', views: 243 },
  { id: 8, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop', title: '图书馆拾到雨伞一把 蓝色', type: 'found', desc: '蓝色折叠伞，伞柄有学校纪念品标志', location: '图书馆入口', time: '昨天 18:00', contact: 'QQ：345612', views: 45 },
]

const filteredItems = computed(() => {
  if (activeTab.value === 'all') return items
  return items.filter(item => item.type === activeTab.value)
})
</script>

<template>
  <div class="page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <span class="cur">失物招领</span>
    </div>
    <div class="page-header">
      <h1 class="page-title">🔍 失物招领</h1>
      <p class="page-subtitle">帮助同学们找回失物，传递校园温暖</p>
    </div>

    <div class="tab-bar">
      <span class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</span>
      <span class="tab" :class="{ active: activeTab === 'lost' }" @click="activeTab = 'lost'">寻物启事</span>
      <span class="tab" :class="{ active: activeTab === 'found' }" @click="activeTab = 'found'">失物招领</span>
      <router-link to="/publish" class="publish-link">+ 发布信息</router-link>
    </div>

    <div class="item-grid">
      <div v-for="item in filteredItems" :key="item.id" class="item-card">
        <img :src="item.image" :alt="item.title" class="item-img" />
        <div class="item-body">
          <div class="item-header">
            <el-tag size="small" :type="item.type === 'lost' ? 'danger' : 'warning'">
              {{ item.type === 'lost' ? '寻物' : '招领' }}
            </el-tag>
            <span class="item-time">{{ item.time }}</span>
          </div>
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-desc">{{ item.desc }}</p>
          <div class="item-footer">
            <span>📍 {{ item.location }}</span>
            <span>📞 {{ item.contact }}</span>
            <span>👁 {{ item.views }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more">
      <el-button size="large" plain>加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>
.page { /* full width */ }
.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #F3F4F6;
  border-radius: 10px;
  padding: 4px;
  align-items: center;
}
.tab {
  padding: 8px 20px;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
}
.tab.active {
  background: #fff;
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.publish-link {
  margin-left: auto;
  margin-right: 4px;
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  padding: 8px 16px;
}
.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.item-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 16px;
  padding: 16px;
  transition: all 0.2s;
}
.item-card:hover { box-shadow: var(--shadow-md); }
.item-img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.item-body { flex: 1; min-width: 0; }
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.item-time { font-size: 12px; color: var(--color-text-secondary); }
.item-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-desc {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item-footer {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.pagination-center { margin-top: 24px; justify-content: center; }
</style>
