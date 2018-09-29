<template>
  <div>
    <van-row style="overflow-x: hidden">
        <van-nav-bar title="交接管理" class="navBarStyle"/>
        <!-- @click-left="$backTo()" -->
        <router-view></router-view>
        <van-tabbar v-model="active" fixed>
          <van-tabbar-item icon="shop" to="entry">客户交接</van-tabbar-item>
          <van-tabbar-item icon="chat" to="flow">内部交接</van-tabbar-item>
          <van-tabbar-item icon="records" to="exit">客户领取</van-tabbar-item>
        </van-tabbar>
    </van-row>
    <company-list></company-list>
    <file-type-list></file-type-list>
    <q-code></q-code>
  </div>
</template>

<script>
import companyList from './common/companyList'
import fileTypeList from './common/fileList'
import QCode from './part/flow/innerCode'

export default {
  name: "index",
  components:{
    companyList,
    fileTypeList,
    QCode
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

