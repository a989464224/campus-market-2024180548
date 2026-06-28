<script setup lang="ts">
import { ref } from 'vue'

interface Post {
  id: number
  image: string
  title: string
  type: string
  status: string
  statusType: '' | 'success' | 'warning' | 'danger' | 'info'
  desc: string
  time: string
  views: number
  favs: number
  price: number
}

const activeTab = ref('all')
const posts = ref<Post[]>([
  { id: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop', title: '机械键盘 IKBC C87 青轴', type: '二手交易', status: '展示中', statusType: 'success', desc: '使用半年，青轴手感极佳，配件齐全', time: '2小时前', views: 356, favs: 12, price: 120 },
  { id: 2, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop', title: '《软件工程导论》第六版', type: '二手交易', status: '展示中', statusType: 'success', desc: '计算机学院必修教材，笔记整洁几乎全新', time: '3天前', views: 89, favs: 5, price: 25 },
  { id: 3, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop', title: 'LED护眼台灯 三档调光', type: '二手交易', status: '已售出', statusType: 'info', desc: '欧普照明，触控开关', time: '1周前', views: 234, favs: 8, price: 35 },
  { id: 4, image: 'https://images.unsplash.com/photo-1611689342795-612db4423949?w=200&h=200&fit=crop', title: '西门打印店丢失黑色耳机盒', type: '失物招领', status: '寻找中', statusType: 'danger', desc: 'AirPods Pro黑色保护壳，有黄色鸭子贴纸', time: '1天前', views: 215, favs: 8, price: 0 },
  { id: 5, image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop', title: '东区食堂三楼拼奶茶', type: '拼单搭子', status: '拼单中', statusType: 'warning', desc: '喜茶多肉葡萄第二杯半价', time: '6小时前', views: 67, favs: 3, price: 13 },
])

function editPost(post: Post) { alert('编辑：' + post.title) }
function offlinePost(post: Post) { alert('已下架：' + post.title) }
function deletePost(post: Post) { alert('已删除：' + post.title) }
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
        <p class="page-subtitle">管理你发布的所有信息，共 <b>12</b> 条</p>
      </div>
      <router-link to="/publish"><el-button type="primary">发布新信息</el-button></router-link>
    </div>

    <el-tabs v-model="activeTab" style="margin-bottom:16px;">
      <el-tab-pane label="全部 (12)" name="all" />
      <el-tab-pane label="二手交易 (5)" name="trade" />
      <el-tab-pane label="失物招领 (2)" name="lost" />
      <el-tab-pane label="拼单搭子 (3)" name="group" />
      <el-tab-pane label="跑腿委托 (2)" name="task" />
    </el-tabs>

    <div>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <img :src="post.image" :alt="post.title" class="post-thumb" />
        <div class="post-body">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-desc">{{ post.desc }}</div>
          <div class="post-meta">
            <el-tag size="small" :type="post.statusType">{{ post.status }}</el-tag>
            <span>🕐 {{ post.time }}</span>
            <span>👁 {{ post.views }} 浏览</span>
            <span>⭐ {{ post.favs }} 收藏</span>
          </div>
        </div>
        <div class="post-right">
          <span v-if="post.price" class="post-price">¥{{ post.price }}</span>
          <span v-else class="post-free">免费</span>
          <div class="post-actions">
            <el-button size="small" @click="editPost(post)">编辑</el-button>
            <el-button size="small" type="warning" v-if="post.status === '展示中'" @click="offlinePost(post)">下架</el-button>
            <el-button size="small" type="danger" @click="deletePost(post)">删除</el-button>
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
.user-page { /* full width */ }
.post-card { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: var(--shadow-sm); margin-bottom: 12px; display: flex; gap: 16px; align-items: flex-start; }
.post-thumb { width: 100px; height: 100px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.post-body { flex: 1; min-width: 0; }
.post-title { font-size: 15px; font-weight: 600; color: var(--color-text-title); margin-bottom: 4px; }
.post-desc { font-size: 12px; color: #9CA3AF; margin-bottom: 8px; }
.post-meta { display: flex; gap: 16px; font-size: 12px; color: #9CA3AF; align-items: center; flex-wrap: wrap; }
.post-right { text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.post-price { font-size: 18px; font-weight: 700; color: #EF4444; }
.post-free { font-size: 14px; font-weight: 600; color: var(--color-primary); }
.post-actions { display: flex; gap: 6px; }
.pagination-center { margin-top: 24px; justify-content: center; }
</style>
