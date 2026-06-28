<script setup lang="ts">
import { ref } from 'vue'

interface ErrandItem {
  id: number
  image: string
  title: string
  category: string
  reward: number
  desc: string
  fromLoc: string
  toLoc: string
  publisher: string
  time: string
  status: 'open' | 'taken'
}

const errands = ref<ErrandItem[]>([
  { id: 1, image: 'https://images.unsplash.com/photo-1580677616215-fa3e10a45eae?w=400&h=300&fit=crop', title: '求帮取快递到6栋宿舍', category: '代取快递', reward: 5, desc: '菜鸟驿站有两个快递（一个中号纸箱和一个文件袋），送到6栋宿舍楼下即可。', fromLoc: '菜鸟驿站', toLoc: '6栋宿舍', publisher: '吴同学', time: '3小时前', status: 'open' },
  { id: 2, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', title: '代买晚餐 二食堂麻辣烫', category: '代买物品', reward: 8, desc: '帮忙去二食堂打包一份麻辣烫（微辣、多放豆皮），送到13栋宿舍楼下。', fromLoc: '二食堂', toLoc: '13栋宿舍', publisher: '郑同学', time: '4小时前', status: 'open' },
  { id: 3, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', title: '代打印论文资料 20页', category: '代打印', reward: 3, desc: '帮我打印毕业论文的参考文献和附录部分，约20页，双面打印。', fromLoc: '西门打印店', toLoc: '图书馆3楼', publisher: '孙同学', time: '2小时前', status: 'taken' },
  { id: 4, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop', title: '帮搬家从11栋到15栋', category: '搬运', reward: 20, desc: '从11栋宿舍搬到15栋宿舍，东西不多，主要是被褥和两个箱子，有电梯。', fromLoc: '11栋宿舍', toLoc: '15栋宿舍', publisher: '周同学', time: '5小时前', status: 'open' },
  { id: 5, image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d2e7?w=400&h=300&fit=crop', title: '代排队买考试资料', category: '代排队', reward: 10, desc: '学校书店排队买考研资料《数学复习全书》，据说要排半小时左右。', fromLoc: '学校书店', toLoc: '送到图书馆', publisher: '王同学', time: '6小时前', status: 'open' },
  { id: 6, image: 'https://images.unsplash.com/photo-1577741314757-5e0c73e1f61e?w=400&h=300&fit=crop', title: '代送文件到教务处', category: '代送文件', reward: 5, desc: '帮忙送一份材料到教务处（行政楼302），已经准备好放在图书馆前台。', fromLoc: '图书馆前台', toLoc: '行政楼302', publisher: '李同学', time: '8小时前', status: 'taken' },
  { id: 7, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', title: '代取外卖到图书馆', category: '代取外卖', reward: 5, desc: '帮我去北门取一份外卖（麻辣香锅），送到图书馆三楼自习区。', fromLoc: '北门', toLoc: '图书馆三楼', publisher: '赵同学', time: '1小时前', status: 'open' },
  { id: 8, image: 'https://images.unsplash.com/photo-1595079676339-9c85e8272e1b?w=400&h=300&fit=crop', title: '代办校园卡挂失', category: '代办事务', reward: 8, desc: '帮忙去信息中心挂失校园卡，需要带学生证，我的学生证放在宿舍桌上。', fromLoc: '6栋宿舍', toLoc: '信息中心', publisher: '陈同学', time: '30分钟前', status: 'open' },
])

function getCatType(cat: string): '' | 'success' | 'warning' | 'danger' | 'info' {
  if (cat === '代取快递' || cat === '代取外卖') return 'danger'
  if (cat === '代买物品' || cat === '代排队') return 'warning'
  if (cat === '搬运') return ''
  return 'info'
}
</script>

<template>
  <div class="page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <span class="cur">跑腿委托</span>
    </div>
    <div class="page-header">
      <h1 class="page-title">🏃 跑腿委托</h1>
      <p class="page-subtitle">找同学帮忙跑个腿，解决临时小需求</p>
    </div>

    <div class="errand-grid">
      <div v-for="item in errands" :key="item.id" class="errand-card">
        <img :src="item.image" :alt="item.title" class="errand-img" />
        <div class="errand-body">
          <div class="errand-header">
            <el-tag size="small" :type="getCatType(item.category)">{{ item.category }}</el-tag>
            <span class="errand-time">{{ item.time }}</span>
          </div>
          <h3 class="errand-title">{{ item.title }}</h3>
          <p class="errand-desc">{{ item.desc }}</p>
          <div class="errand-route">
            <span>📍 {{ item.fromLoc }}</span>
            <span class="route-arrow">→</span>
            <span>📍 {{ item.toLoc }}</span>
          </div>
          <div class="errand-footer">
            <span class="reward">¥{{ item.reward }}</span>
            <span class="publisher">👤 {{ item.publisher }}</span>
            <el-tag size="small" :type="item.status === 'open' ? 'success' : 'info'">
              {{ item.status === 'open' ? '待接单' : '已接单' }}
            </el-tag>
          </div>
          <el-button
            type="primary"
            size="default"
            style="width:100%; margin-top:10px;"
            :disabled="item.status === 'taken'"
          >
            {{ item.status === 'taken' ? '已被接' : '我要接单' }}
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
.errand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.errand-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.25s;
}
.errand-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.errand-img { width: 100%; height: 140px; object-fit: cover; }
.errand-body { padding: 14px 16px; }
.errand-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.errand-time { font-size: 11px; color: var(--color-text-secondary); }
.errand-title {
  font-size: 14px; font-weight: 600; color: var(--color-text-title);
  margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.errand-desc {
  font-size: 12px; color: #6B7280; margin-bottom: 8px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.errand-route {
  display: flex; align-items: center; gap: 6px; font-size: 11px; color: #9CA3AF; margin-bottom: 10px;
}
.route-arrow { color: var(--color-primary); font-weight: 700; }
.errand-footer { display: flex; align-items: center; justify-content: space-between; }
.reward { font-size: 20px; font-weight: 700; color: #EF4444; }
.publisher { font-size: 12px; color: #9CA3AF; }
.pagination-center { margin-top: 24px; justify-content: center; }
</style>
