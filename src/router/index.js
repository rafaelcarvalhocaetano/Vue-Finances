import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/modules/auth/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  router: [
    ...auth,
    { path: '', redirect: '/login'}
  ]
})

export default router
