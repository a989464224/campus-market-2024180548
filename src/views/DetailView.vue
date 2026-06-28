<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const goodsId = route.params.id as string
</script>

<template>
  <div class="detail-page">
    <router-link to="/list" class="back-link">← 返回列表</router-link>
    <h2 class="page-title">📦 商品详情</h2>
    <div class="detail-card">
      <p class="detail-info"><strong>商品 ID：</strong>{{ goodsId }}</p>
      <p class="detail-hint">（此处将根据 ID 加载具体商品数据）</p>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 600px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  font-size: 14px;
  color: #38cd42;
  text-decoration: none;
  margin-bottom: 16px;
}

.back-link:hover {
  text-decoration: underline;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1dbe4d;
}

.detail-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.detail-info {
  font-size: 16px;
  color: #31b45c;
  margin-bottom: 8px;
}

.detail-hint {
  font-size: 13px;
  color: #32bf6d;
}
</style>
