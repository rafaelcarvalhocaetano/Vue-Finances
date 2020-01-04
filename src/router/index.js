import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('./../modules/auth/views/Login.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', redirect: '/login' },
    { path: '/login', component: Login }

  ]
})

export default router
