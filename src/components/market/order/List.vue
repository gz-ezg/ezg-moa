<template>
  <van-row style="width:100%;height:100%">
    <van-nav-bar class="navBarStyle" title="订单列表" left-arrow @click-left="$backTo()"/>
    <van-row>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onSearchList"
        :immediate-check="false"
      >
        <van-cell v-for="(item,index) in data" :key="index" is-link>
          <div @click="open_order_detail(item)">
            <van-row>
              <van-col span="18" style="font-size:14px;font-weight:600">{{item.companyname}}</van-col>
              <van-col span="6" style="font-size:12px">
                <span style="padding:3px;color:white;background-color:green" v-if="item.ProcessType == '审批完结'">{{item.ProcessType}}</span>
                <span style="padding:3px;color:white;background-color:red" v-else >{{item.ProcessType}}</span>
              </van-col>
              <!-- <van-col span="4" style="text-align:right">{{item.TEL}}</van-col> -->
            </van-row>
            <van-row style="margin-top:10px">
              <!-- <van-col span="24" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.companynames}}</van-col> -->
              <van-col span="18" >客户：{{item.name}}</van-col>
              <!-- <van-col span="14" style="padding-right:10px">交易状态：{{item.enterprisestatusText}}</van-col> -->
            </van-row>
            <van-row>
              <van-col span="18" >联系方式：{{item.tel}}</van-col>
            </van-row>
            <van-row>
              <van-col span="13" >订单金额：{{item.paynumber}}</van-col>
              <van-col span="11" >{{item.base_createdate}}</van-col>
            </van-row>
          </div>
        </van-cell>
        <van-row style="margin-top:10px;margin-bottom:10px">
          <center>没有更多订单了！</center>
        </van-row>
      </van-list>
    </van-row>
    <order-detail></order-detail>
  </van-row>
</template>

<script>
import orderDetail from './detail'

export default {
  components:{
    orderDetail
  },
  name:'companyList',
  data(){
    return{
      data: [],
      loading: false,
      finished: false
    }
  },
  methods:{
    onSearchList(){
      let _self = this
      let url = "api/order/list"
      let config = {
        params:{
          sortField: "id",
          order: "desc",
          page: 1,
          pageSize: 1000,
          customerId: _self.$route.params.id
        }
      }

      function success(res){
          _self.data = []
          let temp = res.data.data.rows
          _self.data = temp
          _self.loading = false
          _self.finished = true;
          // if(temp.length == 1){
          //   _self.$bus.emit("OPEN_COMPANY_INFO",temp[0])
          // }
      }
      this.$Get(url, config ,success)
    },
    open_order_detail(e){
      let _self = this
      this.$bus.emit("OPEN_ORDER_INFO",e.id)
    }
  },
  created(){
    this.onSearchList()
  }
}
</script>

<style>
.unfinish{
  background-color: red
}
.finsih{
  background-color: green
}
</style>
