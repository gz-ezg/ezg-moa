<template>
  <van-row style="width:100vw;height:100wh">
    <van-nav-bar class="navBarStyle" title="客户详情" left-arrow @click-left="$backTo()"/>
    <van-row><h2 style="margin-left:5vw">{{detail.NAME}}</h2></van-row>
    <div style="height:80vh;width:97vw;margin:auto">
      <div @click="open_tel">
        <van-field v-model="detail.product" label="联系方式" disabled/>
      </div>
      <van-row style="margin-top:10px"></van-row>
      <van-field v-model="detail.customerType" label="客户状态" readonly/>
      <van-field v-model="detail.customersource" label="客户来源" readonly/>
      <van-field v-model="detail.importlevel" label="客户等级" readonly/>
      <van-field v-model="detail.CREATEDATE" label="创建时间" readonly/>
      <van-row style="margin-top:10px"></van-row>
      <van-field v-model="detail.memo" label="备注" type="textarea" placeholder="备注" autosize/>
      <van-row style="margin-top:30px"></van-row>
      <van-row>
        <van-col span="8">
          <div @click="open_company_info">
            <center><i class="iconfont icon-gongsi" style="font-size:40px;margin-bottom:10px;color:#d81e06"></i></center>
            <center style="margin-top:5px">企业信息</center>
          </div>
        </van-col>
        <!-- <van-col span="8">
          <div @click="open_create_customer">
            <center><van-icon name="add-o" style="font-size:40px;padding-bottom:5px"/></center>
            <center>跟进记录</center>
          </div>
        </van-col> -->
        <van-col span="8">
          <div @click="open_order_detail">
            <center><i class="iconfont icon-dingdan" style="font-size:40px;margin-bottom:10px;color:#d81e06"></i></center>
            <center style="margin-top:5px">订单详情</center>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="open_dynamic">
            <center><i class="iconfont icon-dongtai1" style="font-size:40px;margin-bottom:10px;color:#d81e06"></i></center>
            <center style="margin-top:5px">服务动态</center>
          </div>
        </van-col>
      </van-row>
      <!-- <div @click="open_depart">
        <van-field v-model="detail.departname" label="地址" readonly />
      </div> -->
    </div>
    <info></info>
  </van-row>
</template>

<script>
import info from './info.vue'

export default {
  components:{
    info
  },
  data(){
    return{
      customerDetailShow: false,
      detail:{

      },
      customerId:""
    }
  },
  created(){
    let _self = this
    _self.customerId = this.$route.params.id
    this.get_detail()
  },
  methods:{
    get_detail(){
      let _self = this
      let url = '/api/customer/detail'
      let config = {
        params:{
          id:_self.customerId
        }
      }

      function success(res){
        _self.detail = res.data.data
        console.log(_self.detail)
      }

      this.$Get(url, config, success)
    },
    open_company_info(){
      let _self = this
      _self.$router.push({
        name:"CompanyList",
        params:{
          id:_self.customerId
        }
      })
    },
    open_order_detail(){
      let _self = this
      _self.$router.push({
        name:"OrderList",
        params:{
          id:_self.customerId
        }
      })
    },
    open_dynamic(){
      let _self = this
      _self.$router.push({
        name:"WorkOrderList",
        params:{
          id:_self.customerId
        }
      })
    },
    open_tel(){
      let _self = this
      _self.$bus.emit("OPEN_TEL",_self.detail)
    }
  }
}
</script>
