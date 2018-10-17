<template>
  <div>
    <van-nav-bar title="亿账柜移动" left-arrow @click-left="$backTo()" class="navBarStyle"/>
    <van-row>
      <van-col span="8" style="height:25vh;border:1px solid #ccc">
        <router-link :to="{ name: 'user'}">
          <center style="font-weight:1000;padding-top:15%">
            <img src="./img/handover.png" width="60%" height="60%">
          <p>交接工具</p>
        </center>
        </router-link>

      </van-col>
      <van-col span="8" style="height:25vh;border:1px solid #ccc">

      </van-col>
      <van-col span="8" style="height:25vh;border:1px solid #ccc">

      </van-col>
      <van-col span="8" style="height:25vh;border:1px solid #ccc">

      </van-col>
    </van-row>
  </div>
</template>


<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    to_index(e){
      this.$router.push({
        name: e
      })
    }
  }
}
</script>
