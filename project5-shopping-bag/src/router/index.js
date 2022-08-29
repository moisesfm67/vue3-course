import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Basket from '../views/BasketView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home
  },
  {
    path: '/basket',
    name: 'BasketView',
    component: Basket
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
