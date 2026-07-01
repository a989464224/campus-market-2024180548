<script setup lang="ts">
import { ref } from 'vue'

interface Msg { id: number; avatar: string; name: string; lastMsg: string; time: string; unread: number }

const messages = ref<Msg[]>([
  { id: 1, avatar: 'https://ui-avatars.com/api/?name=Li+TX&background=10B981&color=fff&size=96', name: '李同学', lastMsg: '键盘还在吗？最低多少钱出？', time: '5分钟前', unread: 2 },
  { id: 2, avatar: 'https://ui-avatars.com/api/?name=Chen+TX&background=3B82F6&color=fff&size=96', name: '陈同学', lastMsg: '谢谢你！耳机我明天来拿', time: '1小时前', unread: 0 },
  { id: 3, avatar: 'https://ui-avatars.com/api/?name=Liu+TX&background=F59E0B&color=fff&size=96', name: '刘同学', lastMsg: '好的，下午3点食堂见', time: '2小时前', unread: 1 },
  { id: 4, avatar: 'https://ui-avatars.com/api/?name=Wu+TX&background=EF4444&color=fff&size=96', name: '吴同学', lastMsg: '快递已放到宿管处了，取件码发你了', time: '3小时前', unread: 0 },
  { id: 5, avatar: 'https://ui-avatars.com/api/?name=Zhang+TX&background=8B5CF6&color=fff&size=96', name: '张同学', lastMsg: '请问书是第几版的？有笔记吗？', time: '昨天', unread: 3 },
  { id: 6, avatar: 'https://ui-avatars.com/api/?name=Zhao+TX&background=EC4899&color=fff&size=96', name: '赵同学', lastMsg: '校园卡还在图书馆三楼', time: '昨天', unread: 0 },
  { id: 7, avatar: 'https://ui-avatars.com/api/?name=Zhou+TX&background=14B8A6&color=fff&size=96', name: '周同学', lastMsg: '拼车还有位置吗？加我一个', time: '6月26日', unread: 0 },
  { id: 8, avatar: 'https://ui-avatars.com/api/?name=Huang+TX&background=06B6D4&color=fff&size=96', name: '黄同学', lastMsg: '好的，谢谢告知', time: '6月25日', unread: 0 },
])

const searchContact = ref('')
</script>

<template>
  <div class="msg-page">
    <div class="page-header">
      <h1 class="page-title">💬 消息</h1>
      <p class="page-subtitle">与同学们保持沟通，及时回复消息</p>
    </div>

    <!-- 系统通知 -->
    <div class="message-list">
      <article class="message-card">
        <h3>欢迎使用校园轻集市</h3>
        <p>你可以在这里发布二手商品、失物招领、拼单搭子和跑腿委托。</p>
      </article>

      <article class="message-card">
        <h3>功能提示</h3>
        <p>收藏的信息可以在个人中心中查看。</p>
      </article>
    </div>

    <div class="msg-layout">
      <div class="msg-sidebar">
        <div class="msg-sidebar-header">
          <h2>会话列表</h2>
          <el-input v-model="searchContact" placeholder="搜索联系人..." size="default" clearable>
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>
        <div class="msg-list">
          <div v-for="msg in messages" :key="msg.id" class="msg-item">
            <img :src="msg.avatar" :alt="msg.name" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-name">{{ msg.name }}</div>
              <div class="msg-preview">{{ msg.lastMsg }}</div>
            </div>
            <div class="msg-meta">
              <div class="msg-time">{{ msg.time }}</div>
              <span v-if="msg.unread > 0" class="msg-badge">{{ msg.unread }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="msg-empty">
        <div class="empty-icon">💬</div>
        <div>选择一个会话开始聊天</div>
        <div style="font-size:12px; color:#9CA3AF;">点击左侧会话列表查看消息详情</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg-page { /* full width */ }

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.message-card {
  padding: 18px 24px;
  border-radius: 12px;
  background: #fff;
  border-left: 4px solid var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.message-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-title);
  margin: 0 0 4px;
}

.message-card p {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.msg-layout { display: flex; gap: 0; background: #fff; border-radius: 14px; box-shadow: var(--shadow-sm); overflow: hidden; min-height: 560px; }
.msg-sidebar { width: 340px; border-right: 1px solid #F3F4F6; flex-shrink: 0; display: flex; flex-direction: column; }
.msg-sidebar-header { padding: 16px 20px; border-bottom: 1px solid #F3F4F6; }
.msg-sidebar-header h2 { font-size: 18px; font-weight: 700; color: var(--color-text-title); margin-bottom: 12px; }
.msg-list { flex: 1; overflow-y: auto; }
.msg-item { display: flex; gap: 12px; padding: 14px 20px; cursor: pointer; align-items: flex-start; border-bottom: 1px solid #F9FAFB; transition: background 0.15s; }
.msg-item:hover { background: #F9FAFB; }
.msg-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; object-fit: cover; }
.msg-content { flex: 1; min-width: 0; }
.msg-name { font-size: 14px; font-weight: 600; color: var(--color-text-title); margin-bottom: 2px; }
.msg-preview { font-size: 12px; color: #9CA3AF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.msg-meta { text-align: right; flex-shrink: 0; }
.msg-time { font-size: 11px; color: #9CA3AF; margin-bottom: 4px; }
.msg-badge { display: inline-block; background: #EF4444; color: #fff; font-size: 11px; min-width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 9px; padding: 0 5px; }
.msg-empty { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #9CA3AF; }
.empty-icon { font-size: 56px; margin-bottom: 12px; opacity: 0.4; }
</style>
