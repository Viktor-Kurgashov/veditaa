import { createRouter, createWebHistory } from 'vue-router'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import Cabinet from '../views/Cabinet.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/cabinet',
    component: Cabinet
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
