<template>
  <van-row style="width:100vw;height:100vh">
    <van-nav-bar class="navBarStyle" title="企业信息" left-arrow @click-left="$backTo()"/>
    <van-row style="margin-top:15px">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onSearchCompany"
        :immediate-check="false"
      >
        <van-cell v-for="(item,index) in data" :key="index" is-link>
          <div @click="open_company_detail(item)">
            <van-row>
              <van-col span="20" style="font-size:16px;font-weight:600">{{item.companyname}}</van-col>
              <!-- <van-col span="4" style="text-align:right">{{item.TEL}}</van-col> -->
            </van-row>
            <van-row style="margin-top:10px">
              <!-- <van-col span="24" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.companynames}}</van-col> -->
              <van-col span="10" >客户：{{item.createby}}</van-col>
              <van-col span="14" style="padding-right:10px">交易状态：{{item.enterprisestatusText}}</van-col>
            </van-row>
            <van-row>
              <van-col span="18" >联系方式：{{item.Tel}}</van-col>
            </van-row>
            <van-row>
              <van-col span="24" style="text-align:right；font-size:12px">{{item.updatedate}}</van-col>
            </van-row>
          </div>
        </van-cell>
        <van-row style="margin-top:10px;margin-bottom:10px">
          <center>没有更多公司了！</center>
        </van-row>
      </van-list>
    </van-row>
    <company-detail></company-detail>
  </van-row>
</template>

<script>
import companyDetail from './detail'

export default {
  components:{
    companyDetail
  },
  name:'companyList',
  data(){
    return{
      data:[],
      loading: false,
      finished: false
    }
  },
  methods:{
    onSearchCompany(){
      let _self = this
      let url = "api/customer/findCompanysByCustomerId/" + _self.$route.params.id
      let config = {
        params:{
        }
      }

      function success(res){
          _self.data = []
          let temp = res.data.data
          _self.data = temp
          _self.loading = false
          _self.finished = true;
          if(temp.length == 1){
            _self.$bus.emit("OPEN_COMPANY_INFO",temp[0])
          }
      }
      this.$Get(url, config ,success)
    },
    open_company_detail(e){
      let _self = this
      this.$bus.emit("OPEN_COMPANY_INFO",e)
    }
  },
  created(){
    this.onSearchCompany()
  }
}
</script>
