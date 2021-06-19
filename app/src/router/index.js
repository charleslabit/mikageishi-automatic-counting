import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
   {
    path: '/',
    name: 'MikageishiAutomaticCounting',
    component: () => import('../views/MikageishiAutomaticCounting.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
