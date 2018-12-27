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

/**
 *  移动市场START
 */
  //..main组件
  const Market = () => import(/* webpackChunkName: "market" */ '@/components/market/market')
  //  首页
  const MarketIndex = () => import(/* webpackChunkName: "market" */ '@/components/market/Index/index')
  //  客户管理
  const CustomerList = () => import(/* webpackChunkName: "market" */ '@/components/market/customer/list')
  const CustomerDetail = () => import(/* webpackChunkName: "market" */ '@/components/market/customer/detail')
  const CustomerCreate = () => import(/* webpackChunkName: "market" */ '@/components/market/customer/create')
  //  企业管理
  const CompanyList = () => import(/* webpackChunkName: "market" */ '@/components/market/company/list')
  const CompanyCreate = () => import(/* webpackChunkName: "market" */ '@/components/market/company/create')
  //  订单管理
  const OrderList = () => import(/* webpackChunkName: "market" */ '@/components/market/order/list')
  //  工单管理
  const WorkOrderList = () => import(/* webpackChunkName: "market" */ '@/components/market/workOrder/list')
/**
 *  移动市场END1
 */
  const Test = () => import(/* webpackChunkName: "test" */ '@/components/test/index.vue')


Vue.use(Router)

export default new Router({
  //  只能在history模式下使用
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/',
      redirect: 'test'
    },
    //  登录页
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //  九宫格
    {
      path: '/index',
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
    {
      path: '/market',
      component: Market,
      children: [
        {
          path: "index",
          name: "MarketIndex",
          component: MarketIndex
        },
        {
          path: "customerList",
          name: "CustomerList",
          component: CustomerList
        },
        {
          path: "customerDetail/:id",
          name: "CustomerDetail",
          component: CustomerDetail
        },
        {
          path: "customerCreate",
          name: "CustomerCreate",
          component: CustomerCreate
        },
        {
          path: "companyList/:id",
          name: "CompanyList",
          component: CompanyList
        },
        {
          path: "companyCreate",
          name: "CompanyCreate",
          component: CompanyCreate
        },
        {
          path: "orderList/:id",
          name: "OrderList",
          component: OrderList
        },
        {
          path: "workOrderList/:id",
          name: "WorkOrderList",
          component: WorkOrderList
        },
        {
          path: "/",
          redirect: "index"
        }
      ]
    }
    /**
     * 移动市场路由end
     */
  ]
})
