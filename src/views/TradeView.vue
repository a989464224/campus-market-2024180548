<script setup lang="ts">
import { ref } from 'vue'

interface GoodsItem {
  id: number
  title: string
  price: number
  desc: string
  tag: string
  seller: string
  time: string
}

const goodsList = ref<GoodsItem[]>([
  { id: 1, title: '高等数学（第七版）', price: 15, desc: '九成新，上册+下册', tag: '教材', seller: '张三', time: '2小时前' },
  { id: 2, title: '机械键盘 IKBC C87', price: 80, desc: '青轴，带背光，使用半年', tag: '数码', seller: '李四', time: '3小时前' },
  { id: 3, title: '宿舍用小台灯', price: 25, desc: 'LED 护眼，三档调光', tag: '生活', seller: '王五', time: '5小时前' },
  { id: 4, title: '四级词汇书', price: 8, desc: '星火英语，只写了几页', tag: '教材', seller: '赵六', time: '昨天' },
  { id: 5, title: '自行车 26寸', price: 200, desc: '凤凰牌，7成新，带锁', tag: '出行', seller: '孙七', time: '昨天' },
])

const tags = ref(['全部', '教材', '数码', '生活', '出行', '其他'])
const activeTag = ref('全部')

const filteredList = ref<GoodsItem[]>(goodsList.value)

function filterByTag(tag: string) {
  activeTag.value = tag
  if (tag === '全部') {
    filteredList.value = goodsList.value
  } else {
    filteredList.value = goodsList.value.filter(item => item.tag === tag)
  }
}
</script>

<template>
  <div class="trade-page">
    <h2 class="page-title">🛒 二手交易</h2>

    <!-- 标签筛选 -->
    <div class="tag-filter">
      <span
        v-for="tag in tags"
        :key="tag"
        class="filter-tag"
        :class="{ active: activeTag === tag }"
        @click="filterByTag(tag)"
      >
        {{ tag }}
      </span>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <div v-for="item in filteredList" :key="item.id" class="goods-card">
        <div class="card-header">
          <span class="tag">{{ item.tag }}</span>
          <span class="price">¥{{ item.price }}</span>
        </div>
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
        <div class="card-footer">
          <span class="seller">{{ item.seller }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
      </div>

      <div v-if="filteredList.length === 0" class="empty-tip">
        暂无相关商品
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

/* 标签筛选 */
.tag-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-tag {
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 20px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.filter-tag:hover {
  background: #e0e0e0;
}

.filter-tag.active {
  background: #2dd679;
  color: #fff;
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.goods-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tag {
  font-size: 11px;
  color: #34df62;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #e74c3c;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
}

.empty-tip {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}
</style>
