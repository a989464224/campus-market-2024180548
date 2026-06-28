<script setup lang="ts">
import { ref } from 'vue'

interface CategoryItem {
  name: string
  icon: string
  path: string
  color: string
}

const categories = ref<CategoryItem[]>([
  { name: '二手交易', icon: '🛒', path: '/trade', color: '#667eea' },
  { name: '失物招领', icon: '🔍', path: '/lost-found', color: '#27ae60' },
  { name: '拼团', icon: '👥', path: '/group-buy', color: '#e67e22' },
  { name: '跑腿', icon: '🏃', path: '/errand', color: '#e74c3c' },
])

const recentItems = ref([
  { id: 1, title: '高等数学（第七版）', price: 15, tag: '教材', type: 'trade' },
  { id: 2, title: '机械键盘 IKBC C87', price: 80, tag: '数码', type: 'trade' },
  { id: 3, title: '校园卡找主人', price: 0, tag: '失物', type: 'lost-found' },
  { id: 4, title: '拼单奶茶 第二杯半价', price: 12, tag: '拼团', type: 'group-buy' },
])
</script>

<template>
  <div class="home-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        class="search-input"
        placeholder="搜索商品、失物、拼团…"
      />
    </div>

    <!-- 分类入口 -->
    <section class="section">
      <h3 class="section-title">服务分类</h3>
      <div class="category-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.name"
          :to="cat.path"
          class="category-card"
          :style="{ backgroundColor: cat.color + '15', borderColor: cat.color + '30' }"
        >
          <span class="category-icon">{{ cat.icon }}</span>
          <span class="category-name" :style="{ color: cat.color }">{{ cat.name }}</span>
        </router-link>
      </div>
    </section>

    <!-- 最新发布 -->
    <section class="section">
      <h3 class="section-title">最新发布</h3>
      <div class="item-list">
        <div v-for="item in recentItems" :key="item.id" class="item-card">
          <div class="item-header">
            <span class="item-tag">{{ item.tag }}</span>
            <span class="item-price" v-if="item.price > 0">¥{{ item.price }}</span>
            <span class="item-price free" v-else>免费</span>
          </div>
          <h4 class="item-title">{{ item.title }}</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 600px;
  margin: 0 auto;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 10px 18px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.search-icon {
  font-size: 18px;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.search-input::placeholder {
  color: #bbb;
}

/* 分类区域 */
.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: 12px;
  border: 1px solid;
  text-decoration: none;
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-2px);
}

.category-icon {
  font-size: 28px;
  margin-bottom: 6px;
}

.category-name {
  font-size: 13px;
  font-weight: 500;
}

/* 最新发布 */
.item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.item-tag {
  font-size: 11px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.item-price {
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
}

.item-price.free {
  color: #27ae60;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
</style>
