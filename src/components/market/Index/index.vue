<template>
  <van-row  style="overflow-x:hidden">
    <van-nav-bar class="navBarStyle" title="订单服务" left-arrow @click-left="$backTo()"/>
    <van-search placeholder="请输入公司名称搜索" v-model="searchParams" @search="onSearchCustomer" />
    <van-row style="margin-top:30px">
      <van-col span="8">
        <div @click="open_create_customer">
          <center><i class="iconfont icon-kehu" style="font-size:40px;color:#d81e06"></i></center>
          <center>新增客户</center>
        </div>
      </van-col>
      <van-col span="8">
        <div @click="open_create_company">
          <center><i class="iconfont icon-gongsi" style="font-size:40px;color:#d81e06"></i></center>
          <center>新增企业</center>
        </div>
      </van-col>
      <van-col span="8">
        <div @click="open_my_saler">
          <center><i class="iconfont icon-icon-test" style="font-size:40px;color:#d81e06"></i></center>
          <center>我的业绩</center>
        </div>
      </van-col>
    </van-row>
    <van-row style="width:90%;margin:auto;margin-top:20px">
      <van-cell-group>
        <div @click="open_search_company">
          <van-field v-model="company" placeholder="选择客户公司" disabled/>
        </div>
      </van-cell-group>
      <van-cell-group style="margin-top:10px">
        <van-row :gutter="20">
          <van-col span="12">
            <div @click="open_time">
              <van-field v-model="payTime" placeholder="缴费时间" disabled/>
            </div>
          </van-col>
          <van-col span="12">
            <div @click="open_paydir">
              <van-field v-model="payDirName" placeholder="缴费方式" disabled/>
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group style="margin-top:10px">
        <van-row :gutter="20">
          <van-col span="12">
            <div>
              <van-field v-model="totalMoney" placeholder="订单总价" type="number" disabled/>
            </div>
          </van-col>
          <van-col span="12">
            <div>
              <van-field v-model="hadPayMoney" placeholder="已付款" type="number" />
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group style="margin-top:10px;margin-bottom:20px">
        <div @click="open_area">
          <van-field v-model="areaName" placeholder="选择地区" disabled/>
        </div>
      </van-cell-group>

      <!-- <van-button size="large" type="primary" @click="open_product" style="background-color:#CC3300;border:1px solid #c30">新增服务</van-button> -->
      <van-button size="large" type="default" @click="open_product"><span>+ </span>新增服务</van-button>
      <div style="padding-bottom:60px">
        <van-cell-group style="margin-top:10px;">
          <van-cell v-for="(item, index) in productList" :title="item.product" is-link :key="index" @click="change_product_detail(item,index)">
            <van-row>
              <van-col span="6">x {{item.productnumber}}</van-col>
              <van-col span="18">
                <div v-html="item.propertys" style="font-size:8px">
                </div>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </div>

      <van-tabbar style="margin-top:30px;">
        <van-button type="primary" bottom-action style="font-size:20px;background-color:#CC3300" :loading="submit_loading" @click="submit" :disabled="isShowSubmit">提交订单</van-button>
      </van-tabbar>
    </van-row>
    <company-select></company-select>
    <time-select></time-select>
    <pay-dir-select></pay-dir-select>
    <area-select></area-select>
    <product-detail @del="delete_item" @change="change_item"></product-detail>
    <product-list></product-list>
  </van-row>
</template>

<script>
import companySelect from '../moa-components/companyList'
import timeSelect from '../moa-components/timeSelect';
import payDirSelect from '../moa-components/paydirList'
import areaSelect from '../moa-components/areaSelect'
// import productDetail from '../moa-components/productDetail'
import productList from '../moa-components/productList';
import productDetail from '../moa-components/product_detail';

export default {
  components:{
    companySelect,
    timeSelect,
    payDirSelect,
    areaSelect,
    productDetail,
    productList,
    // customerTypeSelect
  },
  data(){
    return{
      searchParams:"",
      // type:"",
      submit_loading:false,
      activeNames:[],
      company:"",
      companyID:"",
      payTime:"",
      payDirName:"",
      payDir:"",
      hadPayMoney:"",
      areaName:"",
      area:"",
      productList:[],
      GDSreport: "ybd",
      isornotkp: "N"
    }
  },
  computed:{
    isShowSubmit(){
      if(this.company){
        return false
      }else{
        return true
      }
    },
    totalMoney(){
      let price = 0;
      for(let i = 0; i<this.productList.length;i++){
        price += parseInt(this.productList[i].paynumber)
      }
      return price
    }
  },
  methods:{
    open_search_company(){
      this.$bus.emit('OPEN_COMPANY_LIST', true)
    },
    open_time(){
      this.$bus.emit('OPEN_TIME', true)
    },
    open_paydir(){
      this.$bus.emit('OPEN_PAYDIR', true)
    },
    open_area(){
      this.$bus.emit('OPEN_AREA', true)
    },
    open_product(){
      let _self = this
      if(_self.area && _self.companyID){
        this.$bus.emit('OPEN_PRODUCT_LIST', [_self.area, _self.companyID])
      }else{
        _self.$toast.fail("请选择地区及公司名称！")
      }

    },
    // open_search_type(){
    //   this.$bus.emit('OPEN_TYPE',true)
    // },
    submit(){
      let _self = this
      let url = `/api/order/create`
      _self.submit_loading = true
      let config = {
          GDSreport: _self.GDSreport,
          companyId: _self.companyID,
          isornotkp: _self.isornotkp,
          orderPayNumber: _self.hadPayMoney,
          orderitems: JSON.stringify(_self.productList),
          payDir: _self.payDir,
          payTime: _self.payTime,
      }

      function success(res){
        _self.submit_loading = false
        _self.$toast.success(res.data.msg)
        _self.GDSreport = ""
        _self.companyID = ""
        _self.hadPayMoney = ""
        _self.productList = []
        _self.payDir = ""
        _self.payTime = ""
        _self.company = ""
        _self.payDirName = ""
      }

      function fail(err){
        _self.submit_loading = false
        _self.$toast.error(err.data.msg)
      }

      this.$Post(url, config, success, fail)
    },
    change_product_detail(item, index){
      this.$bus.emit("OPEN_PRODUCT_DETAIL",[index, item])
    },
    delete_item(e){
      // console.log(e)
      this.productList.splice(e,1)
    },
    change_item(e){
      this.productList.splice(e[0],1,e[1])
    },
    //  跳转到新增客户
    open_create_customer(){
      this.$router.push({
        name: "CustomerCreate"
      })
    },
    //  跳转到新增企业
    open_create_company(){
      this.$router.push({
        name: "CompanyCreate"
      })
    },
    //  搜索客户
    onSearchCustomer(){
      let _self = this
      localStorage.setItem("SEARCH_PARAMS", _self.searchParams)
      this.$router.push({
        name: "CustomerList"
      })
    },
    open_my_saler(){
      this.$toast.fail("业绩模块正在抓紧开发中！")
    }
  },
  created(){
    let _self = this
    _self.$bus.off('UPDATA_COMPANY')
    _self.$bus.off('UPDATE_TIME')
    _self.$bus.off('UPDATE_PAYDIR')
    _self.$bus.off('UPDATE_AREA')
    _self.$bus.off('ADD_PRODUCT')
    _self.$bus.on('UPDATA_COMPANY',(e) => {
      _self.companyID = e.id
      _self.company = e.companyname
    })
    _self.$bus.on('UPDATE_TIME',(e)=>{
      _self.payTime = e
    })
    _self.$bus.on('UPDATE_PAYDIR',(e)=>{
      _self.payDirName = e.text
      _self.payDir = e.typecode
    })
    _self.$bus.on('UPDATE_AREA',(e)=>{
      // console.log(e)
      _self.areaName = e[0].text + '-' + e[1].text
      _self.area = e[1].code
      // console.log(_self.area)
    })
    _self.$bus.on('ADD_PRODUCT',(e)=>{
      // console.log(e)
      _self.productList.push(e)
    })
  }
}
</script>

<style>
.navBarStyle{
  color:white!important;
  background-color: #CC3300!important;
}
.van-nav-bar .van-icon{
  color:white!important
}
.van-cell__value{
  text-align:left
}
</style>

