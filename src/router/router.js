import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/modules/auth/views/Login.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
