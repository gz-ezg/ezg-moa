<template>
  <div>
    <van-popup v-model="fileListShow" style="width:100vw;height:100vh">
      <van-nav-bar class="navBarStyle" title="文件列表" left-arrow @click-left="fileListShow=false">
        <div slot="left"><van-icon name="close" /></div>
      </van-nav-bar>
      <van-search placeholder="请输入公司名称" v-model="searchFile" @search="get_all_file" />
      <van-row>
        <van-row v-for="item in allFile" :key="item.id" style="margin:10px" >
          <div @click="add_item(item)">
            <van-col span="20">
              <van-row style="margin-bottom:5px;font-size:18px" ><span>{{item.file_type_name}}</span></van-row>
              <van-row><span style="font-size:14px">{{item.companyname}}</span></van-row>
            </van-col>
            <van-col span="4">
              <center>
                <van-icon name="add-o" style="font-size:20px;line-height:40px" />
              </center>
            </van-col>
          </div>
        </van-row>
      </van-row>
      <center style="margin-top:10px"><van-loading type="spinner" v-if="typeListLoading"/></center>
    </van-popup>
  </div>
</template>

<script>

export default {
  name: "allfile",
  data(){
    return{
      fileListShow: false,
      searchFile: "",
      allFile: [],
      typeListLoading: false,
    }
  },
  created(){
    let _self = this
    this.get_all_file()
    this.$bus.off("OPEN_ALL_FILE")
    this.$bus.on("OPEN_ALL_FILE", (e) => {
      _self.fileListShow = true
    })
  },
  methods:{
    get_all_file(){
      let _self = this
      let url = "api/customer/file/list"

      _self.typeListLoading = true

      let config = {
        params:{
          page: 1,
          pageSize: 1000,
        }
      }

      function success(res){
        _self.allFile = res.data.data.rows
        _self.typeListLoading = false
      }

      this.$Get(url, config, success)
    },
    add_item(e){
      this.$toast.success( e.file_type_name + "添加成功！")
      e.num = 1
      this.$emit("add_file",e)
    }
  }
}
</script>

<style>
.navBarStyle{
  color: white!important;
  background-color: #CC3300!important;
}
</style>

