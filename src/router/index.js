import Vue from 'vue'
import Router from 'vue-router'

import Login from  '@/components/login/login'

//  九宫格
import Index from '@/components/index/index.vue'

//  交接资料
// import HandOver from '@/components/hand_over/index'

// import Entry from '@/components/hand_over/part/entry'
// import Flow from '@/components/hand_over/part/flow'
// import Exit from '@/components/hand_over/part/exit'

// import Confirm from  '@/components/hand_over/confirm/confirm'
// import Success from '@/components/hand_over/confirm/comfirm_success'
// import Detail from '@/components/hand_over/part/flow/detail'

const HandOver = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/index')

const Entry = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/entry')
const Flow = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/flow')
const Exit = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/exit')

const Confirm = () => import(/* webpackChunkName: "handover_cofirm" */ '@/components/hand_over/confirm/confirm')
const Success = () => import(/* webpackChunkName: "handover_cofirm" */ '@/components/hand_over/confirm/comfirm_success')
const Detail = () => import(/* webpackChunkName: "handover_cofirm" */ '@/components/hand_over/part/flow/detail')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'index',
      component: Index,
    },
    {
      path: '/confirm/:id',
      name: 'confirm',
      component: Confirm
    },
    //  客户确认页
    {
      path: '/customer_confirm/:id'
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/handOver',
      component: HandOver,
      children: [
        {
          path: '/',
          redirect: 'flow'
        },
        {
          path: 'entry',
          name: "entry",
          component: Entry
        },
        {
          path: 'flow',
          name: "flow",
          component: Flow
        },
        {
          path: 'exit',
          name: "exit",
          component: Exit
        },
      ]
    },
  ]
})
