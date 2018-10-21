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
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont" style="font-size:40px" :class="item.class"></i>
            <p style="color:black;margin-top:10px;font-weight:500;">{{item.title}}</p>
          </center>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>


<script>
import Cookies from 'js-cookie';

export default {
  data(){
    return{
      allPath: [
        {
          access: 6017,
          path: "/handOver",
          title: "交接工具",
          class: "icon-jiaojieqingkuang"
        },
        {
          access: 6018,
          path: "/resume",
          title: "简历库",
          class: "icon-jianli"
        },
        {
          access: 9999,
          path: "/market",
          title: "市场服务",
          class: "icon-ic_market"
        },
      ],

      access: [],
      renderPath: []
    }
  },
  methods:{
    // to_index(e){
    //   this.$router.push({
    //     name: e
    //   })
    // }
    get_menu(){
      let _self = this
      console.log(Cookies.get('access').split(","))
      _self.access = Cookies.get("access").split(",")
      _self.render_menu()
    },
    render_menu(){
      let _self = this
      for(let j = 0; j < _self.access.length; j++){
        if(_self.access[j] >="6100"){
          for(let i = 0; i < _self.allPath.length; i++){
            console.log(_self.allPath[i].access)
            if(_self.access[j] == _self.allPath[i].access){
              //  生成渲染的菜单目录
              _self.renderPath.push(_self.allPath[i])
            }
        }
      }
      }
    }
  },
  created(){
    let _self = this
    _self.get_menu()
  }
}
</script>


