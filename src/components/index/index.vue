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
      <van-col span="8" style="height:20vh;" v-for="item in allPath" :key="item.id">
        <router-link :to="item.path">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont" style="font-size:35px;color:#d81e06" :class="item.class"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">{{item.title}}</p>
          </center>
        </router-link>
      </van-col>
      <van-col span="8" style="height:20vh;" >
        <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7666e5cbbd22b505&redirect_uri=http%3a%2f%2fcloud.zgcfo.com%2fapi%2flegwork%2fapiWechatCompanyWqAuthLogin&response_type=code&scope=SCOPE&agentid=1000022&state=STATE#wechat_redirect">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont icon-639" style="font-size:35px;color:#d81e06"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">外勤打卡</p>
          </center>
        </a>
      </van-col>
      <van-col span="8" style="height:20vh;" >
        <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7666e5cbbd22b505&redirect_uri=http://follow.zgcfo.com/api/customer/apiWechatAddFollowRecordCallback&response_type=code&scope=SCOPE&agentid=1000030&state=STATE#wechat_redirect">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont icon-genjin" style="font-size:35px;color:#d81e06"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">新增跟进</p>
          </center>
        </a>
      </van-col>
      <van-col span="8" style="height:20vh;" >
        <a href="http://bj.zgcfo.com">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont icon-baojia" style="font-size:35px;color:#d81e06"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">报价工具</p>
          </center>
        </a>
      </van-col>
      <van-col span="8" style="height:20vh;" >
        <a href="http://demo.zgcfo.com">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont icon-fuwu" style="font-size:35px;color:#d81e06"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">我的服务演示</p>
          </center>
        </a>
      </van-col>
      <van-col span="8" style="height:20vh;" >
        <div @click="login_out">
          <center style="padding-top:15%;color:#333333">
            <i class="iconfont icon-tuichudenglu" style="font-size:35px;color:#d81e06"></i>
            <p style="color:black;margin-top:10px;font-weight:400;">退出登录</p>
          </center>
        </div>
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
        {
          access: 6017,
          path: "/test",
          title: "资料入库(体验版)",
          class: "icon-jiaojieqingkuang"
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
    login_out(){
      let _self = this
      let url = `api/user/logOut`

      let config = {}

      function success(res){
        _self.$router.push({
          name: "Login"
        })
      }

      this.$Get(url, config, success)
    },
    get_menu(){
      let _self = this
      // console.log(Cookies.get('access').split(","))
      _self.access = Cookies.get("access").split(",")
      _self.render_menu()
    },
    render_menu(){
      let _self = this
      for(let j = 0; j < _self.access.length; j++){
        if(_self.access[j] >="6100"){
          for(let i = 0; i < _self.allPath.length; i++){
            // console.log(_self.allPath[i].access)
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
    // _self.get_menu()
  }
}
</script>


