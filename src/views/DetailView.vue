<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const goodsId = route.params.id as string

const activeImg = ref(0)
const isFav = ref(false)

const images = [
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541140532154-b024eff23d07?w=800&h=500&fit=crop',
]

const relatedItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop', title: '24寸显示器 AOC IPS屏', price: 380 },
  { id: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', title: 'Sony WH-1000XM4 耳机', price: 850 },
  { id: 3, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', title: 'MacBook Pro 2022 13寸', price: 5800 },
  { id: 4, image: 'https://images.unsplash.com/photo-1616628188502-413f14e86b6c?w=400&h=300&fit=crop', title: '全新未拆封保温杯', price: 28 },
]

function toggleFav() {
  isFav.value = !isFav.value
}
function handleContact() {
  alert('已跳转到聊天页面（演示）')
}
</script>

<template>
  <div class="detail-page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link to="/category">二手交易</router-link><span class="sep">/</span>
      <router-link to="/category">数码产品</router-link><span class="sep">/</span>
      <span class="cur">商品详情</span>
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <!-- 图片展示 -->
        <div class="img-gallery">
          <img :src="images[activeImg]" alt="商品图片" class="img-main" />
          <div class="img-thumbs">
            <img v-for="(img, idx) in images" :key="idx" :src="img"
                 :class="{ active: activeImg === idx }"
                 class="img-thumb" @click="activeImg = idx" />
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="info-card-main">
          <div class="detail-tags">
            <el-tag type="success">九成新</el-tag>
            <el-tag>数码产品</el-tag>
            <el-tag type="warning">可小刀</el-tag>
          </div>
          <h1>机械键盘 IKBC C87 青轴 白色背光</h1>
          <div class="detail-meta">
            <span>🕐 2026年6月28日 14:32</span>
            <span>👁 356 次浏览</span>
            <span>⭐ 12 人收藏</span>
            <span>📍 西校区 3号宿舍楼</span>
          </div>
          <div class="detail-price">¥120<span class="original">¥299</span></div>

          <div class="action-bar">
            <el-button type="primary" size="large" @click="handleContact">联系卖家</el-button>
            <el-button size="large" @click="toggleFav">{{ isFav ? '已收藏' : '收藏商品' }}</el-button>
            <el-button size="large" type="danger" plain>举报</el-button>
          </div>

          <div class="divider"></div>
          <h3>📋 商品描述</h3>
          <div class="desc-text">
            <p>IKBC C87 机械键盘，Cherry MX 青轴，白色背光。</p>
            <p>使用半年左右，平时主要码代码用，手感依旧清脆。键盘外观无明显划痕，键帽无打油，背光全亮无坏灯。</p>
            <p>配件齐全：原装数据线、拔键器、说明书、包装盒都在。</p>
            <p>因换了无线的键盘故出，诚心要可小刀。西校区宿舍面交，可现场试手感。</p>
          </div>

          <div class="divider"></div>
          <h3>📌 交易信息</h3>
          <div class="trade-info">
            <span>💰 价格：¥120（可小刀）</span>
            <span>📦 成色：九成新</span>
            <span>📍 交易地点：西校区</span>
            <span>💳 交易方式：面交 / 微信 / 支付宝</span>
          </div>
        </div>
      </div>

      <!-- 右侧信息栏 -->
      <div class="detail-sidebar">
        <div class="seller-card">
          <div class="seller-header">
            <img src="https://ui-avatars.com/api/?name=Li+TX&background=10B981&color=fff&size=112" alt="卖家头像" class="seller-avatar" />
            <div class="seller-info">
              <div class="seller-name">李同学</div>
              <div class="seller-badge">✅ 已认证 · 信用良好</div>
            </div>
          </div>
          <div class="seller-stats">
            <div class="s-stat"><div class="val">23</div><div class="lbl">发布</div></div>
            <div class="s-stat"><div class="val">98%</div><div class="lbl">好评率</div></div>
            <div class="s-stat"><div class="val">15</div><div class="lbl">成交</div></div>
            <div class="s-stat"><div class="val">3h</div><div class="lbl">回复</div></div>
          </div>
        </div>

        <div class="safety-notice">
          <strong>⚠️ 交易安全提醒</strong><br />
          请选择校内公共场所进行面交<br />
          大额交易建议使用平台担保支付<br />
          谨防先款后货等诈骗行为
        </div>
      </div>
    </div>

    <!-- 相关推荐 -->
    <div class="related-section">
      <div class="section-header">
        <h3>相关推荐</h3>
        <router-link to="/category" class="view-all">查看更多 →</router-link>
      </div>
      <div class="card-grid-4">
        <router-link v-for="item in relatedItems" :key="item.id" :to="`/detail/${item.id}`" class="related-card">
          <img :src="item.image" :alt="item.title" />
          <div class="related-body">
            <div class="related-title">{{ item.title }}</div>
            <div class="related-price">¥{{ item.price }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page { /* full width */ }

.img-gallery { background: #fff; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 20px; }
.img-main { width: 100%; height: 420px; object-fit: cover; border-radius: 10px; }
.img-thumbs { display: flex; gap: 10px; margin-top: 12px; }
.img-thumb { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent; opacity: 0.7; transition: all 0.2s; }
.img-thumb:hover, .img-thumb.active { border-color: var(--color-primary); opacity: 1; }

.info-card-main { background: #fff; border-radius: 14px; padding: 24px; box-shadow: var(--shadow-sm); }
.detail-tags { margin-bottom: 12px; display: flex; gap: 8px; }
.info-card-main h1 { font-size: 22px; font-weight: 700; color: var(--color-text-title); margin-bottom: 12px; }
.detail-meta { display: flex; gap: 20px; margin-bottom: 16px; font-size: 13px; color: #6B7280; flex-wrap: wrap; }
.detail-price { font-size: 32px; font-weight: 800; color: #EF4444; margin-bottom: 20px; }
.detail-price .original { font-size: 16px; color: #9CA3AF; text-decoration: line-through; margin-left: 10px; font-weight: 400; }
.action-bar { display: flex; gap: 10px; margin-bottom: 20px; }
.divider { border-top: 1px solid #F3F4F6; margin: 20px 0; }
.desc-text { font-size: 14px; color: #4B5563; line-height: 1.8; }
.desc-text p { margin-bottom: 8px; }
h3 { font-size: 16px; font-weight: 600; color: var(--color-text-title); margin-bottom: 10px; }
.trade-info { display: flex; gap: 20px; font-size: 14px; color: #4B5563; flex-wrap: wrap; }

/* 侧边栏 */
.seller-card { background: #fff; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 16px; }
.seller-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.seller-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
.seller-info { flex: 1; }
.seller-name { font-size: 16px; font-weight: 600; color: var(--color-text-title); }
.seller-badge { font-size: 12px; color: var(--color-primary); margin-top: 2px; }
.seller-stats { display: flex; gap: 20px; }
.s-stat { text-align: center; }
.s-stat .val { font-size: 16px; font-weight: 700; color: var(--color-text-title); }
.s-stat .lbl { font-size: 11px; color: #9CA3AF; }
.safety-notice { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 10px; padding: 14px 16px; font-size: 12px; color: #92400E; line-height: 1.6; }

/* 相关推荐 */
.related-section { margin-top: 32px; }
.related-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); text-decoration: none; color: inherit; transition: all 0.2s; display: block; }
.related-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.related-card img { width: 100%; height: 160px; object-fit: cover; }
.related-body { padding: 12px 14px; }
.related-title { font-size: 14px; font-weight: 600; color: var(--color-text-title); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.related-price { font-size: 16px; font-weight: 700; color: #EF4444; }
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.section-header h3 { font-size: 18px; font-weight: 700; color: var(--color-text-title); margin-bottom: 0; }
.view-all { font-size: 13px; color: var(--color-primary); font-weight: 500; }
</style>
