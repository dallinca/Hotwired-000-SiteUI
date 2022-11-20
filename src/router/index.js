import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/v-home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/v-about.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/v-profile.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/views/v-contact.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/v-404.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/visitorAuth/v-login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/visitorAuth/v-register.vue')
  },
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/visitorAuth/v-forgot-password.vue')
  },
  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/userAuth/v-reset-password.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
