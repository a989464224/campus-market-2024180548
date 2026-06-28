<script setup lang="ts">
import { ref } from 'vue'

interface Goods {
  id: number
  title: string
  price: number
  desc: string
  tag: string
}

const goodsList = ref<Goods[]>([
  { id: 1, title: '高等数学（第七版）', price: 15, desc: '九成新，上册+下册', tag: '教材' },
  { id: 2, title: '机械键盘 IKBC C87', price: 80, desc: '青轴，带背光，使用半年', tag: '数码' },
  { id: 3, title: '宿舍用小台灯', price: 25, desc: 'LED 护眼，三档调光', tag: '生活' },
  { id: 4, title: '四级词汇书', price: 8, desc: '星火英语，只写了几页', tag: '教材' },
  { id: 5, title: '自行车 26寸', price: 200, desc: '凤凰牌，7成新，带锁', tag: '出行' },
])
</script>

<template>
  <div class="list-page">
    <h2 class="page-title">📋 商品列表</h2>

    <div class="goods-card" v-for="item in goodsList" :key="item.id">
      <div class="card-header">
        <span class="tag">{{ item.tag }}</span>
        <span class="price">¥{{ item.price }}</span>
      </div>
      <h3 class="card-title">{{ item.title }}</h3>
      <p class="card-desc">{{ item.desc }}</p>
      <router-link :to="`/detail/${item.id}`" class="card-link">
        查看详情 →
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.list-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.goods-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
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
  color: #667eea;
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

.card-link {
  font-size: 13px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.card-link:hover {
  text-decoration: underline;
}
</style>
