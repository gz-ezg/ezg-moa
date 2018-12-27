<template>
  <van-popup v-model="TELDetailShow" style="width:100vw;height:100vh">
    <van-nav-bar class="navBarStyle" :title="detail.NAME" left-arrow @click-left="TELDetailShow=false">
      <div slot="left"><van-icon name="close" /></div>
    </van-nav-bar>
    <div>
      <van-field v-model="detail.tel" label="电话" :input-align="right"/>
      <van-field v-model="detail.fixedphone" label="固话" :input-align="right"/>
      <van-field v-model="detail.qq" label="QQ" :input-align="right"/>
      <van-field v-model="detail.weixin" label="微信" :input-align="right"/>
      <van-field v-model="detail.email" label="邮箱" :input-align="right"/>
      <!-- <div @click="open_depart">
        <van-field v-model="detail.departname" label="地址" readonly />
      </div> -->
    </div>
  </van-popup>
</template>

<script>
export default {
  data(){
    return{
      detail:{
        NAME: "",
        TEL: "",
        fixedPhone: "",
        qq: "",
        weixin: "",
        email: ""
      },
      TELDetailShow: false,
      right:"right"
    }
  },
  created(){
    let _self = this
    this.$bus.off("OPEN_TEL")
    this.$bus.on("OPEN_TEL",(e)=>{
      _self.detail = e
      _self.TELDetailShow = true
    })
  }
}
</script>
