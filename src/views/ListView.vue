<script setup lang="ts">
import { ref } from 'vue'

interface Goods { id: number; title: string; price: number; desc: string; tag: string }

const goodsList = ref<Goods[]>([
  { id: 1, title: '高等数学（第七版）', price: 15, desc: '九成新，上册+下册，计算机学院必修教材', tag: '教材' },
  { id: 2, title: '机械键盘 IKBC C87', price: 80, desc: '青轴，带背光，使用半年，配件齐全', tag: '数码' },
  { id: 3, title: '宿舍用小台灯', price: 25, desc: 'LED 护眼，三档调光，触控开关', tag: '生活' },
  { id: 4, title: '四级词汇书', price: 8, desc: '星火英语，只写了几页，几乎全新', tag: '教材' },
  { id: 5, title: '自行车 26寸', price: 200, desc: '凤凰牌，7成新，带锁，适合校内通勤', tag: '出行' },
  { id: 6, title: '床上书桌 折叠款', price: 45, desc: '免安装折叠款，带抽屉和手机支架', tag: '生活' },
  { id: 7, title: '考研英语真题 2024版', price: 12, desc: '做了前3套，后面全新，送解析视频', tag: '教材' },
  { id: 8, title: '蓝牙音箱 JBL GO3', price: 120, desc: '红色，防水便携，音质好，用了3个月', tag: '数码' },
])

function getTagType(tag: string): '' | 'success' | 'warning' | 'danger' | 'info' {
  if (tag === '教材') return 'success'
  if (tag === '数码') return ''
  if (tag === '生活') return 'warning'
  if (tag === '出行') return 'info'
  return 'info'
}
</script>

<template>
  <div class="list-page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <span class="cur">商品列表</span>
    </div>
    <div class="page-header">
      <h1 class="page-title">📋 商品列表</h1>
      <p class="page-subtitle">浏览所有二手商品，找到你需要的</p>
    </div>

    <div class="list-grid">
      <router-link v-for="item in goodsList" :key="item.id" :to="`/detail/${item.id}`" class="list-card">
        <div class="card-header">
          <el-tag size="small" :type="getTagType(item.tag)">{{ item.tag }}</el-tag>
          <span class="card-price">¥{{ item.price }}</span>
        </div>
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
        <span class="card-link">查看详情 →</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.list-page { /* full width */ }
.list-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.list-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: var(--shadow-sm); text-decoration: none; color: inherit; transition: all 0.2s; display: block; }
.list-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.card-price { font-size: 20px; font-weight: 700; color: #EF4444; }
.card-title { font-size: 16px; font-weight: 600; color: var(--color-text-title); margin-bottom: 6px; }
.card-desc { font-size: 13px; color: #6B7280; margin-bottom: 10px; }
.card-link { font-size: 13px; color: var(--color-primary); font-weight: 500; }
</style>
