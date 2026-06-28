<script setup lang="ts">
import { ref } from 'vue'

interface MessageItem {
  id: number
  userName: string
  avatar: string
  lastMsg: string
  time: string
  unread: number
}

const messages = ref<MessageItem[]>([
  { id: 1, userName: '张三', avatar: '👨', lastMsg: '你好，这本书还在吗？', time: '10:30', unread: 2 },
  { id: 2, userName: '李四', avatar: '👩', lastMsg: '好的，明天中午食堂见', time: '昨天', unread: 0 },
  { id: 3, userName: '王五', avatar: '👦', lastMsg: '快递已经帮你取了', time: '昨天', unread: 0 },
  { id: 4, userName: '系统通知', avatar: '📢', lastMsg: '您发布的"自行车"已通过审核', time: '周一', unread: 1 },
])
</script>

<template>
  <div class="message-page">
    <h2 class="page-title">💬 消息</h2>

    <div class="message-list">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message-item"
        :class="{ unread: msg.unread > 0 }"
      >
        <span class="avatar">{{ msg.avatar }}</span>
        <div class="message-content">
          <div class="message-header">
            <span class="user-name">{{ msg.userName }}</span>
            <span class="message-time">{{ msg.time }}</span>
          </div>
          <p class="last-message">{{ msg.lastMsg }}</p>
        </div>
        <span v-if="msg.unread > 0" class="unread-badge">{{ msg.unread }}</span>
      </div>

      <div v-if="messages.length === 0" class="empty-tip">
        暂无消息
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.15s;
}

.message-item:first-child {
  border-radius: 12px 12px 0 0;
}

.message-item:last-child {
  border-radius: 0 0 12px 12px;
  border-bottom: none;
}

.message-item:hover {
  background: #fafafa;
}

.message-item.unread {
  background: #f8f9ff;
}

.avatar {
  font-size: 36px;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.message-time {
  font-size: 12px;
  color: #bbb;
}

.last-message {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  flex-shrink: 0;
}

.empty-tip {
  text-align: center;
  padding: 60px;
  color: #999;
  font-size: 14px;
  background: #fff;
  border-radius: 12px;
}
</style>
