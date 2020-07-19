import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Notification } from 'element-ui'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'movie-list' }
    // component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/login',
    alias: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/user/register',
    alias: '/register',
    name: 'register',
    component: () => import('../views/user/Register.vue')
  },
  {
    path: '/movies',
    component: () => import('../views/layout/Movie.vue'),
    children: [
      {
        path: 'create',
        name: 'movie-create',
        alias: 'edit',
        component: () => import('../views/movie/Create.vue'),
        meta: { auth: true }
      },
      {
        path: 'detail/:id',
        name: 'movie-detail',
        component: () => import('../views/movie/Detail.vue')
      },
      {
        path: 'list',
        name: 'movie-list',
        component: () => import('../views/movie/List.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: { name: 'movie-list' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(router => router.meta.auth)) {
    if (store.state.isUserLogin) {
      next()
    } else {
      // TODO: 提示用户访问的页面需要登录
      Notification({
        title: '提示',
        type: 'warning',
        message: '请登录后再访问该页面'
      })
      next({
        name: 'login',
        query: { redirect: to.fullPath } // 跳回之前访问的页面
      })
    }
  }
  next()
})

export default router
