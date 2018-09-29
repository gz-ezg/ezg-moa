<template>
  <div style="padding-bottom:12vh">
    <van-search placeholder="输入申请人筛选" v-model="searchFile" @search="get_data" />
    <van-row>
      <van-cell-group>
      <van-list v-for="(item, index) in unfinishFilesList" :key="index">
        <div @click="open_detail(item)">
            <van-cell :title="item.applicant_name" :value="item.createdate" :label="item.application_status" />
        </div>
      </van-list>
      </van-cell-group>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      unfinishFilesList:[],
      searchFile: ""
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
          pageSize: 50,
          sortField: "id",
          applicant_realname: _self.searchFile
        }
      }

      function success(res){
        _self.total = res.data.data.total
        _self.unfinishFilesList = res.data.data.rows
        for(let i = 0; i<_self.unfinishFilesList.length; i++){
          _self.unfinishFilesList[i].createdate = _self.unfinishFilesList[i].createdate.slice(0,10)
          if(_self.unfinishFilesList[i].application_status == "reject"){
            _self.unfinishFilesList[i].application_status = "拒绝"
          }else if(_self.unfinishFilesList[i].application_status == "finish"){
            _self.unfinishFilesList[i].application_status = "完结"
          }else{
            _self.unfinishFilesList[i].application_status = "正常"
          }
        }
        _self.loading = false
      }

      this.$Get(url, config, success)
    },
    open_detail(e){
      this.$router.push({
        name: "detail",
        params:{
          id: e.id
        }
      })
    }
  },
  created(){
    this.get_data()
  }
}
</script>

