import Vue from 'vue'
import Router from 'vue-router'

//  登录页
import Login from  '@/components/login/login'

//  九宫格
import Index from '@/components/index/index.vue'

//  交接工具
const HandOver = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/handOver')
const HandOverIndex = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/index')
const Entry = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/entry')
const Flow = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/flow')
const Exit = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/exit')

const Confirm = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/confirm/confirm')
const Success = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/confirm/comfirm_success')
const Detail = () => import(/* webpackChunkName: "handover" */ '@/components/hand_over/part/flow/detail')

//  简历库
const Resume = () => import(/* webpackChunkName: "resume" */ '@/components/resume/resume')
const ResumeIndex = () => import(/* webpackChunkName: "resume" */ '@/components/resume/index')
const ResumeCreate = () => import(/* webpackChunkName: "resume" */ '@/components/resume/create')
const ResumeDetail = () => import(/* webpackChunkName: "resume" */ '@/components/resume/detail')

//  移动市场
const Market = () => import(/* webpackChunkName: "market" */ '@/components/market/market')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    //  登录页
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //  九宫格
    {
      path: '/Index',
      name: 'index',
      component: Index,
    },
    /**
     * 交接工具路由start
     */
    {
      path: '/handOver',
      component: HandOver,
      children: [
        {
          path: '/',
          redirect: { name: 'flow' }
        },
        {
          path: 'confirm/:id',
          name: 'confirm',
          component: Confirm
        },
        {
          path: 'success',
          name: 'success',
          component: Success
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
        {
          path: 'index',
          component: HandOverIndex,
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
    },
    /**
     * 交接工具路由end
     */
    /**
     * 简历库初始化
     */
    {
      path: '/resume',
      component: Resume,
      children: [
        {
          path: 'index',
          name: 'ResumeIndex',
          component: ResumeIndex
        },
        {
          path: "create",
          name: "ResumeCreate",
          component: ResumeCreate
        },
        {
          path: "detail",
          name: "ResumeDetail",
          component: ResumeDetail
        },
        {
          path: '/',
          redirect: "index"
        }
      ]
    },
    /**
     * 移动市场路由start
     */
    // {
    //   path: '/market',
    //   component: Market,
    //   children: [
    //     {

    //     }
    //   ]
    // }
    /**
     * 移动市场路由end
     */
  ]
})
