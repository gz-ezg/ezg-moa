<template>
  <div>
    <van-nav-bar title="简历库" class="navBarStyle" @click-left="$backTo()" left-arrow/>
    <van-search placeholder="输入姓名筛选" v-model="searchName" @search="get_data" />
    <van-row style="padding-bottom:60px">
      <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading>
      <van-cell-group v-for="(item, index) in allNameList" :key="index" v-if="!loading">
        <van-cell :title="item.name" :value="item.updatedate.slice(0,10)" :label="item.post" is-link center @click="open_detail(item)" >
          <div slot="icon">
            <van-icon name="success" v-if="item.sex" style="margin-right:10px"/>
            <van-icon name="close" v-else style="margin-right:10px"/>
          </div>
        </van-cell>
      </van-cell-group>
      <!-- <van-nav-bar fixed class="navBarStyle" type="danger">
        <van-button size="large">新增简历</van-button>
      </van-nav-bar> -->
      <van-row style="position:fixed;bottom:0;width:100%">
        <center>
          <van-button size="large" style="width:100%;" type="danger" @click="open_create_resume" >新增简历</van-button>
        </center>
      </van-row>
    </van-row>

  </div>
</template>

<script>
export default {
  data(){
    return{
      allNameList:[],
      searchName: "",
      loading: false
    }
  },
  methods:{
    get_data(){
      let _self = this
      let url = "api/system/resource/resume/list"

      _self.loading = true

      let config = {
        params: {
          page: 1,
          pageSize: 30,
          sortField: "id",
          name: _self.searchName,
        }
      }

      function success(res){
        _self.total = res.data.data.total
        _self.allNameList = res.data.data.rows
        _self.loading = false
      }

      this.$Get(url, config, success)
    },
    open_detail(e){
      this.$router.push({
        name: "ResumeDetail"
      })
      localStorage.setItem("resume",JSON.stringify(e))
    },
    open_create_resume(){
      this.$router.push({
        name: "ResumeCreate"
      })

    }
  },
  created(){
    this.get_data()
  }
}
</script>
