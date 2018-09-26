<template>
  <div>
    <van-search placeholder="输入申请人筛选" v-model="searchFile" @search="get_data" />
    <van-row>
      <van-list v-for="(item, index) in unfinishFilesList" :key="index" >
        <div @click="confirm(item)">
          <van-row>
            <van-panel :title="item.applicant_name" :desc="item.application_memo" :status="item.createdate">
            </van-panel>
          </van-row>
        </div>
      </van-list>
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
          pageSize: 1000,
          application_status: "normal",
          sortField: "id",
          applicant_realname: _self.searchFile
        }
      }

      function success(res){
        _self.total = res.data.data.total
        _self.unfinishFilesList = res.data.data.rows
        _self.loading = false
      }

      this.$Get(url, config, success)
    },
    confirm(item){
      this.$router.push({
        name: "confirm",
        params: {
          id: item.id
        }
      })
    }
  },
  created(){
    this.get_data()
  }
}
</script>

