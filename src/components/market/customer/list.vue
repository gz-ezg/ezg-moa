<template>
  <van-row style="overflow-x:hidden;">
    <van-nav-bar class="navBarStyle" title="客户查询" left-arrow @click-left="$backTo()"/>
    <van-search placeholder="请输入公司名称搜索" v-model="searchParams" @search="search" />
    <van-row style="margin-top:5px;height:83vh" >
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onSearchCustomer"
        :immediate-check="false"
      >
        <van-cell v-for="(item,index) in data" :key="index" is-link>
          <div @click="open_customer_detail(item)">
            <van-row>
              <van-col span="14" style="font-size:18px;font-weight:600">{{item.NAME}}</van-col>
              <van-col span="10" style="text-align:right;padding-right:5px">{{item.TEL}}</van-col>
            </van-row>
            <van-row>
              <van-col span="24" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.companynames}}</van-col>
            </van-row>
            <van-row>
              <van-col span="16" >剩余时长：{{item.residue_time}}天</van-col>
              <van-col span="8" style="text-align:right;padding-right:5px">{{item.lastfollowdate}}</van-col>
            </van-row>
          </div>
        </van-cell>
        <van-row v-if="finished"><center style="margin-top:10px;margin-bottom:10px">没有更多客户了！</center></van-row>
      </van-list>
    </van-row>
  </van-row>
</template>

<script>
// import customerDetail from './customerIndex'

export default {
  name: 'customerList',
  // components:{
  //   customerDetail
  // },
  data(){
    return{
      loading: false,
      finished: false,
      searchParams:"",
      data: [],
      page: 1
    }
  },
  methods:{
    search(){
      this.data = []
      this.page = 1
      this.onSearchCustomer()
    },
    onSearchCustomer(){
      let url = "api/customer/list"
      let _self = this
      let config = {
        params:{
          page: _self.page,
          pageSize: 15,
          companyname: _self.searchParams,
          sortField: "updatedate",
          order: "desc"
        }
      }

      function success(res){
          let temp = res.data.data.rows
          let len = res.data.data.rows.length
          for(let i = 0;i < len;i++){
            if(!temp[i].residue_time){
              temp[i].residue_time = 0
            }
            if(temp[i].lastfollowdate==null || temp[i].lastfollowdate==""){

            }else{
              temp[i].lastfollowdate = temp[i].lastfollowdate.slice(0,10)
            }
            _self.data.push(temp[i])
          }
          _self.loading = false
          if (_self.data.length >= res.data.data.total) {
            _self.finished = true;
          }else{
            _self.finished = false
          }

        _self.page ++;
      }
      this.$Get(url, config ,success)
    },
    open_customer_detail(e){
      // console.log(e)
      let _self = this
      // _self.$bus.emit("OPEN_CUSTOMER_DETAIL",e)
      _self.$router.push({
        name:'CustomerDetail',
        params:{
          id:e.ID
        }
      })
    }
  },
  // watch:{
  //   searchParams(){
  //     if(localStorage.getItem("SEARCH_PARAMS")){
  //       this.page = 1
  //       this.data = []
  //       this.onSearchCustomer()
  //     }
  //   }
  // },
  created(){
    if(localStorage.getItem("SEARCH_PARAMS")){
      this.searchParams = localStorage.getItem("SEARCH_PARAMS")
      this.onSearchCustomer()
      localStorage.setItem("SEARCH_PARAMS","")
    }else{
      this.onSearchCustomer()
    }
  }
}
</script>

<style>
.van-cell__right-icon{
  margin: auto
}
/* .van-icon-clear{
  margin-right: 15px
} */
</style>
