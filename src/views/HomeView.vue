<script setup lang="ts">
import { ref, computed } from 'vue'

interface FeedItem {
  id: number
  type: string
  image: string
  title: string
  tag: string
  tagType: '' | 'success' | 'warning' | 'danger' | 'info'
  desc: string
  publisher: string
  time: string
  location: string
  views: number
  price: number
  status?: string
  link: string
}

const searchText = ref('')
const searchCampus = ref('all')
const activeTab = ref('all')

const allItems: FeedItem[] = [
  {
    id: 1, type: 'trade',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop',
    title: '《软件工程导论》第六版 九成新',
    tag: '教材', tagType: 'success',
    desc: '计算机学院必修课教材，只用了一学期，笔记整洁，几乎全新。可小刀，东区宿舍面交。',
    publisher: '张同学', time: '12分钟前', location: '东校区', views: 128,
    price: 25, link: '/detail/1'
  },
  {
    id: 2, type: 'trade',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop',
    title: '机械键盘 IKBC C87 青轴 白色背光',
    tag: '数码', tagType: '',
    desc: '使用半年，青轴手感极佳，带白色背光，配件齐全。毕业出清，诚心要可议价。',
    publisher: '李同学', time: '28分钟前', location: '西校区', views: 356,
    price: 120, link: '/detail/2'
  },
  {
    id: 3, type: 'lost',
    image: 'https://images.unsplash.com/photo-1605100809150-a60be93ba541?w=200&h=200&fit=crop',
    title: '拾到校园卡一张 信息工程学院',
    tag: '拾物', tagType: 'warning',
    desc: '在图书馆三楼自习室捡到校园卡，信息工程学院 王XX 同学，请失主尽快联系认领。',
    publisher: '赵同学', time: '1小时前', location: '图书馆', views: 89,
    price: 0, link: '/lost-found'
  },
  {
    id: 4, type: 'lost',
    image: 'https://images.unsplash.com/photo-1611689342795-612db4423949?w=200&h=200&fit=crop',
    title: '西门打印店附近丢失黑色耳机盒',
    tag: '失物', tagType: 'danger',
    desc: 'AirPods Pro 黑色保护壳，里面有耳机，大约是昨天下午4点左右丢失，耳机盒上有卡通贴纸。',
    publisher: '陈同学', time: '2小时前', location: '西门口', views: 215,
    price: 0, status: '急寻', link: '/lost-found'
  },
  {
    id: 5, type: 'group',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop',
    title: '东区食堂三楼拼奶茶 还差2人',
    tag: '餐饮', tagType: 'warning',
    desc: '喜茶新出的多肉葡萄，第二杯半价！一起拼更划算，人均省8元。',
    publisher: '刘同学', time: '45分钟前', location: '东区食堂', views: 67,
    price: 18, link: '/group-buy'
  },
  {
    id: 6, type: 'group',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop',
    title: '周五晚上拼车去高铁站 还差1人',
    tag: '出行', tagType: '',
    desc: '周五（6月30日）晚7点出发，从学校南门到高铁站，滴滴拼车，预计人均15元。',
    publisher: '周同学', time: '2小时前', location: '南门', views: 143,
    price: 15, link: '/group-buy'
  },
  {
    id: 7, type: 'task',
    image: 'https://images.unsplash.com/photo-1580677616215-fa3e10a45eae?w=200&h=200&fit=crop',
    title: '求帮取快递到6栋宿舍 酬谢5元',
    tag: '代取', tagType: 'danger',
    desc: '菜鸟驿站有两个快递，一个中号纸箱和一个文件袋，送到6栋宿舍楼下即可。',
    publisher: '吴同学', time: '3小时前', location: '菜鸟驿站→6栋', views: 92,
    price: 5, link: '/errand'
  },
  {
    id: 8, type: 'task',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop',
    title: '代买晚餐 二食堂麻辣烫 酬谢8元',
    tag: '代购', tagType: '',
    desc: '帮忙去二食堂打包一份麻辣烫（微辣、多放豆皮），送到13栋宿舍楼下。',
    publisher: '郑同学', time: '4小时前', location: '二食堂→13栋', views: 178,
    price: 8, link: '/errand'
  },
  {
    id: 9, type: 'trade',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop',
    title: '24寸显示器 AOC IPS屏 九成新',
    tag: '数码', tagType: '',
    desc: 'AOC 24B1XH，23.8英寸 IPS 窄边框，1080P，买了不到半年，配件包装齐全。',
    publisher: '林同学', time: '5小时前', location: '北校区', views: 456,
    price: 380, link: '/detail/9'
  },
  {
    id: 10, type: 'trade',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop',
    title: '宿舍用小台灯 LED护眼三档调光',
    tag: '生活', tagType: 'success',
    desc: '欧普照明LED台灯，三档色温可调，触控开关，只用了一个学期，非常实用。',
    publisher: '黄同学', time: '6小时前', location: '南校区', views: 234,
    price: 35, link: '/detail/10'
  },
]

const filteredItems = computed(() => {
  if (activeTab.value === 'all') return allItems
  return allItems.filter(item => item.type === activeTab.value)
})

function goTo(url: string) {
  window.location.href = url
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="hero-text">
        <h2>📢 校园生活，轻松交易</h2>
        <p>二手教材、失物招领、拼单搭子、跑腿委托 — 一站式校园服务平台</p>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-num">1,286</div>
          <div class="hero-stat-lbl">今日在线商品</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-num">5,420</div>
          <div class="hero-stat-lbl">累计成交</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-num">3,860</div>
          <div class="hero-stat-lbl">注册用户</div>
        </div>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-row">
        <el-input
          v-model="searchText"
          placeholder="搜索商品、失物、拼单、跑腿..."
          size="large"
          clearable
          style="flex:1"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="searchCampus" placeholder="全部校区" size="large" style="width:140px">
          <el-option label="全部校区" value="all" />
          <el-option label="东校区" value="east" />
          <el-option label="西校区" value="west" />
          <el-option label="南校区" value="south" />
          <el-option label="北校区" value="north" />
        </el-select>
        <el-button type="primary" size="large">搜索</el-button>
      </div>
    </div>

    <!-- 分类入口 -->
    <div class="section-header">
      <h3>服务分类</h3>
      <router-link to="/category" class="view-all">查看全部 →</router-link>
    </div>
    <div class="category-entry">
      <router-link to="/category" class="cat-card">
        <div class="cat-icon" style="background:#ECFDF5; color:#10B981;">🛒</div>
        <div class="cat-name">二手交易</div>
        <div class="cat-hint">教材 · 数码 · 生活</div>
      </router-link>
      <router-link to="/lost-found" class="cat-card">
        <div class="cat-icon" style="background:#EFF6FF; color:#3B82F6;">🔍</div>
        <div class="cat-name">失物招领</div>
        <div class="cat-hint">丢失 · 拾到</div>
      </router-link>
      <router-link to="/group-buy" class="cat-card">
        <div class="cat-icon" style="background:#FFFBEB; color:#F59E0B;">👥</div>
        <div class="cat-name">拼单搭子</div>
        <div class="cat-hint">奶茶 · 拼车 · 团购</div>
      </router-link>
      <router-link to="/errand" class="cat-card">
        <div class="cat-icon" style="background:#FEF2F2; color:#EF4444;">🏃</div>
        <div class="cat-name">跑腿委托</div>
        <div class="cat-hint">代取 · 代送 · 代办</div>
      </router-link>
    </div>

    <!-- 内容标签切换 -->
    <div class="section-header">
      <h3>最新发布</h3>
    </div>
    <div class="tab-row">
      <span class="tab-item" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</span>
      <span class="tab-item" :class="{ active: activeTab === 'trade' }" @click="activeTab = 'trade'">二手交易</span>
      <span class="tab-item" :class="{ active: activeTab === 'lost' }" @click="activeTab = 'lost'">失物招领</span>
      <span class="tab-item" :class="{ active: activeTab === 'group' }" @click="activeTab = 'group'">拼单搭子</span>
      <span class="tab-item" :class="{ active: activeTab === 'task' }" @click="activeTab = 'task'">跑腿委托</span>
    </div>

    <!-- 信息流 -->
    <div class="feed-list">
      <router-link
        v-for="item in filteredItems"
        :key="item.id"
        :to="item.link"
        class="feed-card"
      >
        <img :src="item.image" :alt="item.title" class="feed-thumb" />
        <div class="feed-body">
          <div class="feed-title">
            {{ item.title }}
            <el-tag size="small" :type="item.tagType">{{ item.tag }}</el-tag>
          </div>
          <div class="feed-desc">{{ item.desc }}</div>
          <div class="feed-meta">
            <span>{{ item.publisher }}</span>
            <span>{{ item.time }}</span>
            <span>📍 {{ item.location }}</span>
            <span>👁 {{ item.views }}</span>
          </div>
        </div>
        <div class="feed-right">
          <span class="feed-price" :class="{ free: item.price === 0 }">
            {{ item.price === 0 ? '免费' : '¥' + item.price }}
          </span>
          <el-tag v-if="item.status" size="small" type="warning">{{ item.status }}</el-tag>
        </div>
      </router-link>
    </div>

    <!-- 加载更多 -->
    <div class="load-more">
      <el-button size="large" plain>加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  /* full width within app-main */
}

.hero-banner {
  background: linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 50%, #D1FAE5 100%);
  border-radius: 16px;
  padding: 32px 40px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}
.hero-banner::after {
  content: '';
  position: absolute;
  right: -20px;
  top: -20px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
  border-radius: 50%;
}
.hero-text h2 {
  font-size: 22px;
  font-weight: 700;
  color: #065F46;
  margin-bottom: 6px;
  position: relative;
  z-index: 1;
}
.hero-text p {
  font-size: 14px;
  color: #047857;
  position: relative;
  z-index: 1;
}
.hero-stats {
  display: flex;
  gap: 32px;
  position: relative;
  z-index: 1;
}
.hero-stat {
  text-align: center;
}
.hero-stat-num {
  font-size: 28px;
  font-weight: 800;
  color: #059669;
}
.hero-stat-lbl {
  font-size: 12px;
  color: #047857;
  margin-top: 2px;
}

/* 搜索栏 */
.search-section {
  background: #fff;
  border-radius: 14px;
  padding: 20px 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 28px;
}
.search-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* 分类入口 */
.category-entry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}
.cat-card {
  background: #fff;
  border-radius: 14px;
  padding: 24px 16px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.25s;
  text-decoration: none;
  display: block;
}
.cat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.cat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  font-size: 26px;
}
.cat-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 4px;
}
.cat-hint {
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* section header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-title);
}
.view-all {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 500;
}

/* 标签切换 */
.tab-row {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #F3F4F6;
}
.tab-item {
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}
.tab-item:hover { color: var(--color-primary); }
.tab-item.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

/* 信息流 */
.feed-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.feed-card {
  background: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
}
.feed-card:hover {
  box-shadow: var(--shadow-md);
}
.feed-thumb {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.feed-body {
  flex: 1;
  min-width: 0;
}
.feed-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-title);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.feed-desc {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.feed-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.feed-right {
  text-align: right;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.feed-price {
  font-size: 20px;
  font-weight: 700;
  color: #EF4444;
}
.feed-price.free {
  color: var(--color-primary);
}

.pagination-center {
  margin-top: 24px;
  justify-content: center;
}
</style>
