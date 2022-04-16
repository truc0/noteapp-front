import Vue from 'vue'
import VueRouter from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/notes/create',
    name: 'notes-create',
    component: () => import('@/views/notes/CreateView.vue')
  },
  {
    path: '/notes/:id',
    name: 'notes-detail',
    component: () => import('@/views/notes/DetailView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
