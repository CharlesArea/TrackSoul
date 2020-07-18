import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/appDetail',
    component: Layout,
    children: [{
      path: '/',
      name: 'AppDetail',
      component: () => import('@/views/appDetail/wholeData/index'),
      meta: { title: 'AppDetail', icon: 'dashboard' }
    }]
  },

  {
    path: '/LocData',
    component: Layout,
    children: [{
      path: '/',
      name: 'LocData',
      component: () => import('@/views/appDetail/LocData/index'),
      meta: { title: 'LocData', icon: 'dashboard' }
    }]
  },

  {
    path: '/heatmapPage',
    component: Layout,
    children: [{
      path: '/',
      name: 'heatmapPage',
      component: () => import('@/views/appDetail/heatmapPage/index'),
      meta: { title: 'heatmapPage', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
