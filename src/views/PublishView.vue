<script setup lang="ts">
import { ref, reactive } from 'vue'

const step = ref(0)

const types = [
  { value: 'trade', label: '二手商品', icon: '🛒', desc: '出售闲置教材、数码产品、生活用品', color: '#ECFDF5' },
  { value: 'lost', label: '失物招领', icon: '🔍', desc: '丢失物品或拾到他人物品', color: '#EFF6FF' },
  { value: 'group', label: '拼单搭子', icon: '👥', desc: '拼奶茶、拼车、拼团购', color: '#FFFBEB' },
  { value: 'task', label: '跑腿委托', icon: '🏃', desc: '代取快递、代买东西、代送文件', color: '#FEF2F2' },
]

const form = reactive({
  type: 'trade',
  title: '',
  category: '',
  price: '',
  campus: '',
  location: '',
  contact: '',
  description: '',
})

function handlePublish() {
  if (!form.title || !form.category) {
    alert('请填写必填项')
    return
  }
  alert('发布成功！（演示效果）')
  form.title = ''
  form.description = ''
  step.value = 0
}
</script>

<template>
  <div class="publish-page">
    <div class="breadcrumb-nav">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <span class="cur">发布信息</span>
    </div>
    <div class="page-header">
      <h1 class="page-title">📝 发布信息</h1>
      <p class="page-subtitle">选择你要发布的信息类型，让校园生活更便捷</p>
    </div>

    <el-steps :active="step" align-center style="margin-bottom:24px;" finish-status="success">
      <el-step title="选择类型" />
      <el-step title="填写信息" />
      <el-step title="确认发布" />
    </el-steps>

    <!-- 步骤0：选择类型 -->
    <div v-show="step === 0" class="type-grid">
      <div v-for="t in types" :key="t.value"
           class="type-card"
           :class="{ selected: form.type === t.value }"
           :style="{ background: form.type === t.value ? t.color : '#fff' }"
           @click="form.type = t.value; step = 1">
        <span class="type-icon">{{ t.icon }}</span>
        <span class="type-label">{{ t.label }}</span>
        <span class="type-desc">{{ t.desc }}</span>
      </div>
    </div>

    <!-- 步骤1：填写信息 -->
    <div v-show="step === 1" class="form-layout-pub">
      <div class="form-main-pub">
        <div class="form-card-pub">
          <h2>📋 基本信息</h2>
          <div class="form-item">
            <label>发布类型</label>
            <div class="type-inline">{{ types.find(t => t.value === form.type)?.icon }} {{ types.find(t => t.value === form.type)?.label }}</div>
          </div>
          <div class="form-item">
            <label>标题 <span class="required">*</span></label>
            <el-input v-model="form.title" placeholder="请输入信息标题" maxlength="60" show-word-limit />
          </div>
          <div class="form-item">
            <label>分类 <span class="required">*</span></label>
            <el-select v-model="form.category" placeholder="请选择分类" style="width:100%">
              <el-option v-if="form.type === 'trade'" v-for="o in ['教材教辅','数码产品','生活用品','运动户外','服装饰品','其他']" :key="o" :label="o" :value="o" />
              <el-option v-if="form.type === 'lost'" v-for="o in ['证件卡片','电子数码','箱包配饰','衣物鞋帽','书籍文具','钥匙','其他']" :key="o" :label="o" :value="o" />
              <el-option v-if="form.type === 'group'" v-for="o in ['餐饮美食','交通出行','学习用品','运动健身','娱乐活动','团购优惠','其他']" :key="o" :label="o" :value="o" />
              <el-option v-if="form.type === 'task'" v-for="o in ['代取快递','代买物品','代送文件','代排队','代打印','代办事务','其他']" :key="o" :label="o" :value="o" />
            </el-select>
          </div>
          <div class="form-item" v-if="form.type === 'trade' || form.type === 'task'">
            <label>{{ form.type === 'trade' ? '价格（元）' : '报酬（元）' }} <span class="required">*</span></label>
            <el-input v-model="form.price" placeholder="请输入金额" style="width:200px">
              <template #prepend>¥</template>
            </el-input>
          </div>
          <div class="form-item">
            <label>校区</label>
            <el-select v-model="form.campus" placeholder="选择校区" style="width:160px">
              <el-option label="东校区" value="east" />
              <el-option label="西校区" value="west" />
              <el-option label="南校区" value="south" />
              <el-option label="北校区" value="north" />
            </el-select>
          </div>
          <div class="form-item">
            <label>具体地点</label>
            <el-input v-model="form.location" placeholder="如：3号宿舍楼下" />
          </div>
          <div class="form-item">
            <label>联系方式</label>
            <el-input v-model="form.contact" placeholder="微信/QQ（选填）" />
          </div>
          <div class="form-item">
            <label>详细描述 <span class="required">*</span></label>
            <el-input v-model="form.description" type="textarea" :rows="5" placeholder="请详细描述相关信息..." />
          </div>
          <div class="btn-row">
            <el-button type="primary" size="large" @click="step = 2">下一步</el-button>
            <el-button size="large" @click="step = 0">返回选择类型</el-button>
          </div>
        </div>
      </div>
      <div class="form-tips-pub">
        <div class="tip-card">
          <h3>📌 发布须知</h3>
          <ul>
            <li>请如实填写信息，虚假信息将被审核驳回</li>
            <li>二手商品交易请选择校内公共场所面交</li>
            <li>失物招领请勿公开完整手机号</li>
            <li>拼单请明确标注集合时间和地点</li>
            <li>跑腿报酬建议在5-20元之间</li>
            <li>所有内容需平台审核通过后展示</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 步骤2：确认 -->
    <div v-show="step === 2" class="confirm-card">
      <div class="confirm-icon">✅</div>
      <h2>确认发布</h2>
      <div class="confirm-info">
        <div class="ci-row"><span>类型：</span><b>{{ types.find(t => t.value === form.type)?.label }}</b></div>
        <div class="ci-row"><span>标题：</span><b>{{ form.title || '（未填写）' }}</b></div>
        <div class="ci-row"><span>分类：</span><b>{{ form.category || '（未选择）' }}</b></div>
        <div class="ci-row" v-if="form.price"><span>金额：</span><b>¥{{ form.price }}</b></div>
        <div class="ci-row" v-if="form.campus"><span>校区：</span><b>{{ form.campus }}</b></div>
      </div>
      <div class="btn-row">
        <el-button type="primary" size="large" @click="handlePublish">确认发布</el-button>
        <el-button size="large" @click="step = 1">返回修改</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.publish-page { /* full width */ }
.type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.type-card {
  border-radius: 14px; padding: 28px 20px; text-align: center;
  box-shadow: var(--shadow-sm); border: 2px solid #F3F4F6;
  cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; align-items: center;
}
.type-card:hover, .type-card.selected { border-color: var(--color-primary); transform: translateY(-2px); }
.type-icon { font-size: 32px; margin-bottom: 10px; }
.type-label { font-size: 16px; font-weight: 600; color: var(--color-text-title); margin-bottom: 4px; }
.type-desc { font-size: 12px; color: #9CA3AF; }
.form-layout-pub { display: flex; gap: 24px; }
.form-main-pub { flex: 1; }
.form-card-pub { background: #fff; border-radius: 14px; padding: 28px; box-shadow: var(--shadow-sm); }
.form-card-pub h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
.form-item { margin-bottom: 18px; }
.form-item label { display: block; font-size: 14px; font-weight: 500; color: var(--color-text-title); margin-bottom: 6px; }
.required { color: #EF4444; }
.type-inline { font-size: 16px; font-weight: 600; color: var(--color-primary); }
.btn-row { display: flex; gap: 10px; margin-top: 8px; }
.form-tips-pub { width: 280px; flex-shrink: 0; }
.tip-card { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 18px; }
.tip-card h3 { font-size: 15px; font-weight: 600; color: #92400E; margin-bottom: 10px; }
.tip-card ul { list-style: none; padding: 0; }
.tip-card li { font-size: 12px; color: #92400E; padding: 4px 0; line-height: 1.6; }
.tip-card li::before { content: '• '; color: #F59E0B; }
.confirm-card { background: #fff; border-radius: 14px; padding: 40px; text-align: center; box-shadow: var(--shadow-sm); max-width: 600px; margin: 0 auto; }
.confirm-icon { font-size: 48px; margin-bottom: 12px; }
.confirm-card h2 { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
.confirm-info { text-align: left; margin-bottom: 24px; }
.ci-row { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #F3F4F6; display: flex; }
.ci-row span { color: #9CA3AF; width: 80px; flex-shrink: 0; }
.ci-row b { color: var(--color-text-title); }
</style>
