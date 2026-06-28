<script setup lang="ts">
import { ref } from 'vue'

interface GroupItem {
  id: number
  image: string
  title: string
  category: string
  price: number
  originalPrice: number
  currentCount: number
  targetCount: number
  desc: string
  initiator: string
  deadline: string
  location: string
}

const groups = ref<GroupItem[]>([
  { id: 1, image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=300&fit=crop', title: '东区食堂三楼拼奶茶 还差2人', category: '餐饮', price: 13.5, originalPrice: 18, currentCount: 3, targetCount: 5, desc: '喜茶多肉葡萄第二杯半价，人均只要13.5元！各自付款，到店一起下单即可。', initiator: '刘同学', deadline: '6月29日 18:00', location: '东区食堂三楼' },
  { id: 2, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop', title: '周五晚上拼车去高铁站 还差1人', category: '出行', price: 15, originalPrice: 28, currentCount: 3, targetCount: 4, desc: '周五（6月30日）晚7点出发，从学校南门到高铁站，滴滴拼车。', initiator: '周同学', deadline: '6月30日 17:00', location: '南门出发' },
  { id: 3, image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop', title: '拼单买水果 批发价更便宜', category: '购物', price: 22, originalPrice: 35, currentCount: 2, targetCount: 6, desc: '学校北门水果批发市场，6人拼单享批发价，苹果橙子芒果混拼。', initiator: '林同学', deadline: '7月1日 12:00', location: '北门水果市场' },
  { id: 4, image: 'https://images.unsplash.com/photo-1516214104703-d870798883c3?w=400&h=300&fit=crop', title: '周末拼羽毛球场地 2小时', category: '运动', price: 8, originalPrice: 15, currentCount: 3, targetCount: 4, desc: '学校体育馆羽毛球场地，4人拼2小时，AA制。水平不限，娱乐为主！', initiator: '赵同学', deadline: '6月29日 20:00', location: '体育馆羽毛球场' },
  { id: 5, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop', title: '拼购宿舍零食大礼包', category: '购物', price: 30, originalPrice: 48, currentCount: 5, targetCount: 8, desc: '网红零食大礼包8人团购价，10种零食组合，比单买便宜近一半。', initiator: '黄同学', deadline: '7月2日 18:00', location: '线上团购' },
  { id: 6, image: 'https://images.unsplash.com/photo-1529693662658-9c8704e5fb82?w=400&h=300&fit=crop', title: '拼打印复习资料 100页起', category: '学习', price: 5, originalPrice: 10, currentCount: 2, targetCount: 5, desc: '期末考试复习资料打印，5人以上拼单享半价，A4双面打印。', initiator: '郑同学', deadline: '6月30日 20:00', location: '西门打印店' },
])

function getProgress(item: GroupItem): number {
  return Math.round((item.currentCount / item.targetCount) * 100)
}
function getTagType(cat: string): '' | 'success' | 'warning' | 'danger' | 'info' {
  if (cat === '餐饮') return 'warning'
  if (cat === '出行') return ''
  if (cat === '购物') return 'success'
  if (cat === '运动') return 'info'
  return 'info'
}
</script>

<template>
  <div class="page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <span class="cur">拼单搭子</span>
    </div>
    <div class="page-header">
      <h1 class="page-title">👥 拼单搭子</h1>
      <p class="page-subtitle">找到志同道合的小伙伴，一起拼更划算</p>
    </div>

    <div class="group-grid">
      <div v-for="item in groups" :key="item.id" class="group-card">
        <img :src="item.image" :alt="item.title" class="group-img" />
        <div class="group-body">
          <div class="group-header">
            <el-tag size="small" :type="getTagType(item.category)">{{ item.category }}</el-tag>
            <span class="deadline">⏰ 截止 {{ item.deadline }}</span>
          </div>
          <h3 class="group-title">{{ item.title }}</h3>
          <p class="group-desc">{{ item.desc }}</p>
          <div class="progress-row">
            <el-progress :percentage="getProgress(item)" :stroke-width="10" :color="getProgress(item) >= 100 ? '#22C55E' : '#F59E0B'" style="flex:1;" />
            <span class="progress-text">{{ item.currentCount }}/{{ item.targetCount }}人</span>
          </div>
          <div class="group-footer">
            <div class="price-area">
              <span class="current-price">¥{{ item.price }}</span>
              <span class="original-price">¥{{ item.originalPrice }}</span>
              <span class="per-person">/人</span>
            </div>
            <div class="group-meta">
              <span>👤 {{ item.initiator }}</span>
              <span>📍 {{ item.location }}</span>
            </div>
          </div>
          <el-button type="primary" size="default" style="width:100%; margin-top:12px;" :disabled="item.currentCount >= item.targetCount">
            {{ item.currentCount >= item.targetCount ? '已成团' : '立即加入拼单' }}
          </el-button>
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
.group-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.group-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.25s;
}
.group-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.group-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.group-body { padding: 16px 18px; }
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.deadline { font-size: 12px; color: var(--color-text-secondary); }
.group-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.group-desc {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.progress-text {
  font-size: 12px;
  color: #9CA3AF;
  white-space: nowrap;
}
.group-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price-area { display: flex; align-items: baseline; gap: 6px; }
.current-price { font-size: 20px; font-weight: 700; color: #EF4444; }
.original-price { font-size: 12px; color: #bbb; text-decoration: line-through; }
.per-person { font-size: 12px; color: #9CA3AF; }
.group-meta { font-size: 11px; color: #9CA3AF; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.pagination-center { margin-top: 24px; justify-content: center; }
</style>
