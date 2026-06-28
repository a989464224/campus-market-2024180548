<script setup lang="ts">
import { ref } from 'vue'

interface GoodsItem {
  id: number
  image: string
  title: string
  price: number
  condition: string
  desc: string
  location: string
  time: string
  link: string
}

const searchText = ref('')
const filterCategory = ref('all')
const filterCampus = ref('all')
const filterPrice = ref('all')
const sortBy = ref('default')

const items: GoodsItem[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', title: '《软件工程导论》第六版', price: 25, condition: '九成新', desc: '计算机学院必修教材，笔记整洁几乎全新', location: '东校区', time: '12分钟前', link: '/detail/1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', title: '机械键盘 IKBC C87 青轴', price: 120, condition: '九成新', desc: '青轴手感极佳，白色背光，配件齐全', location: '西校区', time: '28分钟前', link: '/detail/2' },
  { id: 3, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop', title: '24寸显示器 AOC IPS屏', price: 380, condition: '九成新', desc: '23.8英寸窄边框，1080P高清，包装齐全', location: '北校区', time: '5小时前', link: '/detail/3' },
  { id: 4, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop', title: 'LED护眼台灯 三档调光', price: 35, condition: '全新', desc: '欧普照明，触控开关，三档色温可调', location: '南校区', time: '6小时前', link: '/detail/4' },
  { id: 5, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop', title: '宿舍用小冰箱 迷你型 20L', price: 200, condition: '八成新', desc: '20L容量，适合宿舍，制冷效果好，低噪音', location: '东校区', time: '8小时前', link: '/detail/5' },
  { id: 6, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', title: 'MacBook Pro 2022 13寸', price: 5800, condition: '九五新', desc: 'M2芯片/8G/256G，电池循环仅45次', location: '西校区', time: '1天前', link: '/detail/6' },
  { id: 7, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop', title: 'Nike 跑鞋 42码 只穿过两次', price: 150, condition: '九五新', desc: 'Nike Air Zoom Pegasus，买大了不合脚', location: '南校区', time: '1天前', link: '/detail/7' },
  { id: 8, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop', title: '考研数学复习全书 2025版', price: 18, condition: '九成新', desc: '只画了前两章，后面全新，送笔记', location: '北校区', time: '2天前', link: '/detail/8' },
  { id: 9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', title: 'Sony WH-1000XM4 头戴耳机', price: 850, condition: '九成新', desc: '降噪效果一流，佩戴舒适，箱说齐全', location: '东校区', time: '2天前', link: '/detail/9' },
  { id: 10, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop', title: '床上书桌 折叠款 带抽屉', price: 45, condition: '八成新', desc: '免安装折叠款，尺寸60x40cm', location: '西校区', time: '3天前', link: '/detail/10' },
  { id: 11, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop', title: '吉他 Yamaha F310 入门款', price: 350, condition: '八成新', desc: '弦距已调好，送调音器和教材', location: '南校区', time: '3天前', link: '/detail/11' },
  { id: 12, image: 'https://images.unsplash.com/photo-1616628188502-413f14e86b6c?w=400&h=300&fit=crop', title: '全新未拆封保温杯 500ml', price: 28, condition: '全新', desc: '304不锈钢，保温12小时', location: '北校区', time: '4天前', link: '/detail/12' },
]

function getConditionType(cond: string): '' | 'success' | 'info' {
  if (cond === '全新' || cond === '九五新') return 'success'
  if (cond === '九成新') return ''
  return 'info'
}
</script>

<template>
  <div class="trade-page">
    <!-- 面包屑 -->
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <span class="cur">二手交易</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">🛒 二手交易</h1>
      <p class="page-subtitle">发现校园好物，让闲置物品找到新主人</p>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-input v-model="searchText" placeholder="搜索商品关键词..." size="default" clearable style="width:260px">
        <template #prefix><el-icon><Search /></el-icon></template>
      </el-input>
      <el-select v-model="filterCategory" placeholder="商品分类" size="default" style="width:130px">
        <el-option label="全部分类" value="all" />
        <el-option label="教材教辅" value="book" />
        <el-option label="数码产品" value="digital" />
        <el-option label="生活用品" value="life" />
        <el-option label="运动户外" value="sport" />
        <el-option label="服装饰品" value="cloth" />
        <el-option label="其他" value="other" />
      </el-select>
      <el-select v-model="filterCampus" placeholder="所在校区" size="default" style="width:130px">
        <el-option label="全部校区" value="all" />
        <el-option label="东校区" value="east" />
        <el-option label="西校区" value="west" />
        <el-option label="南校区" value="south" />
        <el-option label="北校区" value="north" />
      </el-select>
      <el-select v-model="filterPrice" placeholder="价格区间" size="default" style="width:140px">
        <el-option label="全部价格" value="all" />
        <el-option label="50元以下" value="0-50" />
        <el-option label="50-100元" value="50-100" />
        <el-option label="100-300元" value="100-300" />
        <el-option label="300元以上" value="300+" />
      </el-select>
      <div class="sort-options">
        <span class="sort-opt active">默认排序</span>
        <span class="sort-opt">最新发布</span>
        <span class="sort-opt">价格从低到高</span>
        <span class="sort-opt">价格从高到低</span>
      </div>
    </div>

    <!-- 结果统计 -->
    <div class="result-header">
      <span class="result-count">共找到 <b>24</b> 件商品</span>
    </div>

    <!-- 商品网格 -->
    <div class="item-grid">
      <router-link v-for="item in items" :key="item.id" :to="item.link" class="item-card">
        <div class="card-img-wrap">
          <img :src="item.image" :alt="item.title" />
          <span class="img-tag">
            <el-tag size="small" :type="getConditionType(item.condition)">{{ item.condition }}</el-tag>
          </span>
        </div>
        <div class="card-body">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-desc">{{ item.desc }}</div>
          <div class="card-footer">
            <span class="card-price">¥{{ item.price }}</span>
            <span class="card-meta">📍 {{ item.location }} · {{ item.time }}</span>
          </div>
        </div>
      </router-link>
    </div>

    <div class="load-more">
      <el-button size="large" plain>加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>
.trade-page {
  /* full width */
}

.filter-bar {
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.sort-options {
  display: flex;
  gap: 4px;
  margin-left: auto;
}
.sort-opt {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
}
.sort-opt:hover { color: var(--color-primary); }
.sort-opt.active {
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  font-weight: 500;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.result-count {
  font-size: 13px;
  color: var(--color-text-secondary);
}
.result-count b {
  color: var(--color-text-title);
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.item-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;
  display: block;
}
.item-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}
.card-img-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: #F9FAFB;
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.item-card:hover .card-img-wrap img {
  transform: scale(1.05);
}
.img-tag {
  position: absolute;
  top: 10px;
  left: 10px;
}
.card-body {
  padding: 14px 16px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #EF4444;
}
.card-meta {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.pagination-center {
  margin-top: 28px;
  justify-content: center;
}
</style>
