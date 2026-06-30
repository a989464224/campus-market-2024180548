import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/TradeView.vue'),
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/TradeView.vue'),
    },
    {
      path: '/lost-found',
      name: 'lost-found',
      component: () => import('@/views/LostFoundView.vue'),
    },
    {
      path: '/group-buy',
      name: 'group-buy',
      component: () => import('@/views/GroupBuyView.vue'),
    },
    {
      path: '/errand',
      name: 'errand',
      component: () => import('@/views/ErrandView.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/MessageView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'),
    },
  ],
})

export default router
