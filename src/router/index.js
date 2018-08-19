import Vue from 'vue'
import Router from 'vue-router'
import memus from '@/components/memus'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
	 mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/memus',
      name: 'memus',
      component: memus,
      children : [{
          path : 'changeinfo',
          // 懒加载
          component : resolve => require(['@/components/changeinfo'],resolve)
        },{
          path : 'addadmins',
          // 懒加载
          component : resolve => require(['@/components/addadmins'],resolve)
        },{
          path : 'delectadmin',
          // 懒加载
          component : resolve => require(['@/components/delectadmin'],resolve)
        },{
          path : 'addgoods',
          // 懒加载
          component : resolve => require(['@/components/addgoods'],resolve)
        },{
          path : 'delectgoods',
          // 懒加载
          component : resolve => require(['@/components/delectgoods'],resolve)
        }]
    },
    
  ]
})
