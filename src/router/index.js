import Vue from 'vue'
import Router from 'vue-router'

//  交接资料
import HandOver from '@/components/hand_over/index'

import Entry from '@/components/hand_over/part/entry'
import Flow from '@/components/hand_over/part/flow'
import Exit from '@/components/hand_over/part/exit'

import Login from  '@/components/login/login'
import Confirm from  '@/components/hand_over/confirm/confirm'
import Success from '@/components/common/field_success'


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
      path: '/confirm/:id/:receiver/:applicant',
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
