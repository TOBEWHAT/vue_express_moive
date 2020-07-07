import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
        component: () => import('../views/movie/Create.vue')
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

export default router
