<script setup lang="ts">
const stats = [
  { label: '今日新增信息', value: 56, icon: '📝', color: '#ECFDF5', change: '↑ 12%', changeGood: true },
  { label: '待审核数量', value: 12, icon: '⏳', color: '#FFFBEB', change: '需要处理', changeGood: false },
  { label: '注册用户数', value: 3860, icon: '👥', color: '#EFF6FF', change: '↑ 5%', changeGood: true },
  { label: '待处理举报', value: 3, icon: '🚩', color: '#FEF2F2', change: '需关注', changeGood: false },
]

const chartData = [
  { day: '6/22', count: 42, height: 120, active: false },
  { day: '6/23', count: 38, height: 108, active: false },
  { day: '6/24', count: 45, height: 130, active: false },
  { day: '6/25', count: 35, height: 100, active: false },
  { day: '6/26', count: 48, height: 138, active: false },
  { day: '6/27', count: 52, height: 150, active: false },
  { day: '今天', count: 56, height: 165, active: true },
]

const reviews = [
  { title: '机械键盘 IKBC C87 青轴', type: '二手交易', user: '张同学', time: '10分钟前', status: 'pending' },
  { title: '东区食堂三楼拼奶茶', type: '拼单搭子', user: '刘同学', time: '30分钟前', status: 'done' },
  { title: '西门打印店丢失耳机盒', type: '失物招领', user: '陈同学', time: '1小时前', status: 'done' },
  { title: '求帮取快递到6栋宿舍', type: '跑腿委托', user: '吴同学', time: '2小时前', status: 'pending' },
  { title: '24寸显示器 AOC IPS屏', type: '二手交易', user: '林同学', time: '3小时前', status: 'done' },
]
</script>

<template>
  <div class="board-page">
    <div class="page-header">
      <h1 class="page-title">📊 数据概览</h1>
      <p class="page-subtitle">欢迎回来，以下是今天的平台运营数据</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-icon" :style="{ background: s.color }">{{ s.icon }}</div>
        <div class="stat-info">
          <div class="stat-value">{{ s.value.toLocaleString() }}</div>
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-change" :style="{ color: s.changeGood ? '#10B981' : '#F59E0B' }">{{ s.change }}</div>
        </div>
      </div>
    </div>

    <!-- 图表 + 审核 -->
    <div class="chart-row">
      <div class="panel-card">
        <h3>📈 近7天信息发布趋势</h3>
        <div class="bar-chart">
          <div v-for="(bar, idx) in chartData" :key="idx" class="bar-col">
            <div class="bar" :style="{ height: bar.height + 'px', background: bar.active ? '#10B981' : '#D1FAE5' }"></div>
            <span class="bar-count">{{ bar.count }}</span>
            <span class="bar-day">{{ bar.day }}</span>
          </div>
        </div>
      </div>
      <div class="panel-card">
        <h3>📋 最近审核记录</h3>
        <div v-for="r in reviews" :key="r.title" class="review-item">
          <div class="r-dot" :class="r.status"></div>
          <div class="r-info">
            <div class="r-title">{{ r.title }}</div>
            <div class="r-meta">{{ r.type }} · {{ r.user }} · {{ r.time }}</div>
          </div>
          <el-tag size="small" :type="r.status === 'pending' ? 'warning' : 'success'">
            {{ r.status === 'pending' ? '待审核' : '已通过' }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="panel-card">
      <h3>⚡ 快捷操作</h3>
      <div style="display:flex; gap:12px;">
        <el-button type="primary">信息审核 (12)</el-button>
        <el-button type="warning">处理举报 (3)</el-button>
        <el-button>用户管理</el-button>
        <el-button>分类设置</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-page { /* full width */ }
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 14px; padding: 24px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 16px; }
.stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
.stat-info { flex: 1; }
.stat-value { font-size: 28px; font-weight: 800; color: var(--color-text-title); line-height: 1.2; }
.stat-label { font-size: 13px; color: #9CA3AF; }
.stat-change { font-size: 12px; margin-top: 2px; }
.chart-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
.panel-card { background: #fff; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); }
.panel-card h3 { font-size: 16px; font-weight: 600; color: var(--color-text-title); margin-bottom: 16px; }
.bar-chart { display: flex; align-items: flex-end; gap: 12px; height: 200px; padding: 10px 0; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bar { width: 100%; border-radius: 6px 6px 0 0; transition: all 0.3s; min-width: 20px; }
.bar-count { font-size: 15px; font-weight: 600; color: var(--color-text-title); }
.bar-day { font-size: 11px; color: #9CA3AF; }
.review-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F9FAFB; }
.r-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.r-dot.pending { background: #F59E0B; }
.r-dot.done { background: #10B981; }
.r-info { flex: 1; min-width: 0; }
.r-title { font-size: 13px; font-weight: 500; color: var(--color-text-title); }
.r-meta { font-size: 11px; color: #9CA3AF; }
</style>
