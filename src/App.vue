<script setup lang="ts"></script>

<template>
  <nav>
    <div><router-link to="/home">首页</router-link></div>
    <div><router-link to="/list">列表</router-link></div>
    <div><router-link to="/detail">详情</router-link></div>
    <div><router-link to="/publish">发布</router-link></div>
    <div><router-link to="/message">消息</router-link></div>
    <div><router-link to="/profile">我的</router-link></div>
    <div><router-link to="/board">看板</router-link></div>
  </nav>

  <router-view />
</template>

<style scoped>
.app {
  padding: 32px;
}
</style>
