<template>
  <div>
    <van-search placeholder="输入申请人筛选" v-model="searchFile" @search="get_data" />
    <van-row>
      <van-list v-for="(item, index) in unfinishFilesList" :key="index">
        <van-row>
          <!-- <van-col span="10" style="margin:5px">{{item.applicant_realname}}</van-col>
          <van-col span="10" style="margin:5px">申请备注:{{item.application_memo}}</van-col>
          <van-col span="24" style="padding-bottom:5px;border-bottom:1px solid black">申请时间:{{item.createdate}}</van-col> -->
            <van-panel :title="item.applicant_realname" :desc="item.application_memo" :status="item.application_status">
          </van-panel>
        </van-row>
      </van-list>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      unfinishFilesList:[]
    }
  },
  methods:{
    get_data(){
      let _self = this
      let url = "api/customer/file/connect/request/list"

      _self.loading = true

      let config = {
        params: {
          page: 1,
          pageSize: 1000,
          sortField: "id"
        }
      }

      function success(res){
        _self.total = res.data.data.total
        _self.unfinishFilesList = res.data.data.rows
        _self.loading = false
      }

      this.$Get(url, config, success)
    },
  },
  created(){
    this.get_data()
  }
}
</script>

