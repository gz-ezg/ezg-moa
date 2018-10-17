<template>
  <div>
    <van-nav-bar title="移动亿账柜" left-arrow @click-left="$backTo()" class="navBarStyle"/>
    <van-row>
      <!-- <van-col span="8" style="height:30vh;">
        <router-link :to="{name: 'flow'}">
          <center style="font-weight:1000;padding-top:15%">
            <img src="./img/handover.png" width="60%" height="60%">
            <p style="color:black">交接工具</p>
          </center>
        </router-link>
      </van-col> -->
      <van-col span="8" style="height:30vh;" v-for="item in allPath" :key="item.id">
        <router-link :to="item.path">
          <center style="font-weight:1000;padding-top:15%">
            <img :src="item.img" width="60%" height="60%">
            <p style="color:black">{{item.title}}</p>
          </center>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>


<script>
export default {
  data(){
    return{
      allPath: [
        {
          access: 1,
          path: "/handOver",
          title: "交接工具",
          //  需要使用icon
          img: "/img/handover.png"
        },
        {
          access: 2,
          path: "/resume",
          title: "简历库",
          //  需要使用icon
          img: "/img/handover.png"
        },
      ]
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
