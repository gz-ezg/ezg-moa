<template>
  <div>
    <van-popup v-model="orderShow" style="width:100%;height:105%">
      <van-nav-bar class="navBarStyle" title="订单详情" @click-left="orderShow=false">
        <div slot="left"><van-icon name="close" /></div>
      </van-nav-bar>
      <van-row>
        <van-field v-model="detail.CompanyName"  label="公司名称" readonly/>
        <van-field v-model="detail.name"  label="归属客户" readonly/>
        <van-field v-model="detail.payTime"  label="缴费时间" readonly/>
        <van-field v-model="detail.paynumber"  label="订单总价" readonly/>
        <van-field v-model="detail.realnumber"  label="已付款" readonly/>
        <van-field v-model="detail.payTime"  label="创建时间" readonly/>
        <van-field v-model="detail.payTime"  label="审批状态" readonly/>
        <van-field v-model="detail.paydir" label="缴费渠道" readonly/>
        <van-field v-model="detail.payTime" label="服务地区" readonly/>
      </van-row>
      <van-row>
        <van-field label="服务内容" readonly/>
        <van-cell v-for="(item,index) in detail.items" :key="index">
            <van-row>
              <van-col span="14"><h4 style="margin:0">{{item.product}}</h4></van-col>
              <van-col span="8" style="text-align:right;color:red"><h4 style="margin:0;">￥{{item.paynumber}}</h4></van-col>
            </van-row>
            <van-row>
              <van-col span="24" v-html="item.propertys"></van-col>
            </van-row>
            <van-row>
              <van-col span="24">服务部门：{{item.departname}}</van-col>
            </van-row>
            <van-row>
              <van-col span="24">{{item.memo}}</van-col>
            </van-row>
        </van-cell>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return {
      orderShow:false,
      id:"",
      detail:{

      }
    }
  },
  methods:{
    get_order_detail(){
      let _self = this
      let url = `api/order/detail/` + _self.id
      let config = {
        params:{}
      }

      function success(res){
        _self.detail = res.data.data
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    this.$bus.off("OPEN_ORDER_INFO")
    this.$bus.on("OPEN_ORDER_INFO",(e)=>{
      _self.id = ""
      _self.id = e
      _self.detail = {}
      _self.get_order_detail()
      _self.orderShow = true
    })
  }
}
</script>
