import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('../views/auth//Login.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('../views/category/Category.vue')
    },
    {
      path: '/category/special',
      name: 'CategorySpecial',
      component: () => import('../views/category/Special.vue')
    }
  ]
})
