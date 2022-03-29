// 路由

import * as Router from 'vue-router'

const routes: Router.RouteRecordRaw[] = [{
  path: '/',
  component: () => import('../components/Layout/index.vue'),
  name: 'Root',
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
  }]
}, {
  path: '/manage',
  component: () => import('../views/Manage/index.vue'),
  name: 'Manage'
}, {
  path: '/info',
  component: () => import('../views/Info/index.vue'),
  name: 'Info'
}]

/**
 * 导出路由
 */
export default Router.createRouter({
  history: Router.createWebHashHistory(),
  routes
})