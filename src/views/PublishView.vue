<script setup lang="ts">
import { ref } from 'vue'

const publishType = ref('trade')
const title = ref('')
const desc = ref('')
const price = ref<number | null>(null)
const contact = ref('')

const types = [
  { value: 'trade', label: '二手交易' },
  { value: 'lost-found', label: '失物招领' },
  { value: 'group-buy', label: '拼团' },
  { value: 'errand', label: '跑腿' },
]

function handlePublish() {
  if (!title.value.trim()) {
    alert('请输入标题')
    return
  }
  alert('发布成功！（演示效果）')
  title.value = ''
  desc.value = ''
  price.value = null
  contact.value = ''
}
</script>

<template>
  <div class="publish-page">
    <h2 class="page-title">📝 发布信息</h2>

    <div class="publish-form">
      <!-- 类型选择 -->
      <div class="form-group">
        <label class="form-label">发布类型</label>
        <div class="type-selector">
          <span
            v-for="t in types"
            :key="t.value"
            class="type-option"
            :class="{ active: publishType === t.value }"
            @click="publishType = t.value"
          >
            {{ t.label }}
          </span>
        </div>
      </div>

      <!-- 标题 -->
      <div class="form-group">
        <label class="form-label" for="title">标题</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          placeholder="请输入信息标题"
        />
      </div>

      <!-- 描述 -->
      <div class="form-group">
        <label class="form-label" for="desc">描述</label>
        <textarea
          id="desc"
          v-model="desc"
          class="form-textarea"
          rows="4"
          placeholder="请详细描述您要发布的信息…"
        ></textarea>
      </div>

      <!-- 价格 -->
      <div class="form-group" v-if="publishType === 'trade' || publishType === 'errand'">
        <label class="form-label" for="price">价格（元）</label>
        <input
          id="price"
          v-model.number="price"
          type="number"
          class="form-input"
          placeholder="请输入价格"
        />
      </div>

      <!-- 联系方式 -->
      <div class="form-group">
        <label class="form-label" for="contact">联系方式</label>
        <input
          id="contact"
          v-model="contact"
          type="text"
          class="form-input"
          placeholder="QQ / 微信 / 手机号"
        />
      </div>

      <!-- 发布按钮 -->
      <button class="submit-btn" @click="handlePublish">
        发布
      </button>
    </div>
  </div>
</template>

<style scoped>
.publish-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.publish-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  background: #fafafa;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #667eea;
  background: #fff;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.type-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-option {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.type-option:hover {
  background: #e0e0e0;
}

.type-option.active {
  background: #667eea;
  color: #fff;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #66eaaf, #4ba26b);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;
}

.submit-btn:hover {
  opacity: 0.9;
}
</style>
