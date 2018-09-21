<template>
  <div>
    <van-row style="overflow-x: hidden">
        <van-nav-bar title="交接管理" left-arrow @click-left="$backTo()" class="navBarStyle"/>
        <router-view></router-view>
        <van-tabbar v-model="active" fixed>
          <van-tabbar-item icon="shop" to="entry">入库</van-tabbar-item>
          <van-tabbar-item icon="chat" to="flow">流转</van-tabbar-item>
          <van-tabbar-item icon="records" to="exit">出库</van-tabbar-item>
        </van-tabbar>
    </van-row>
    <company-list></company-list>
    <file-type-list></file-type-list>
  </div>
</template>

<script>
import companyList from './common/companyList'
import fileTypeList from './common/fileList'

export default {
  name: "index",
  components:{
    companyList,
    fileTypeList
  },
  data(){
    return{
      active: 1,
    }
  },
  methods:{

  }
}
</script>

