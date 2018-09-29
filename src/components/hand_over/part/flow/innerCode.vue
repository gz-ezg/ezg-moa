<template>
  <van-popup v-model="qrcode2Open" style="width:100vw;height:100vh">
    <!-- <van-nav-bar title="确认成功"/> -->
    <van-row style="margin-top:20vh">
      <!-- <center>
        <van-icon name="checked" style="font-size:15vh;color:red"/>
      </center> -->
      <center style="font-weight:400;font-size:4vw;margin-top:20px">
        <div style="margin-bottom:10px">请接收人扫描下方二维码确认</div>
        <div id="qrcode2"></div>
      </center>
    </van-row>
    <van-tabbar style="margin-top:30px;">
      <van-button type="primary" bottom-action style="font-size:20px" @click="close">关闭</van-button>
    </van-tabbar>
  </van-popup>
</template>


<script>
import QRCode from "qrcodejs2";

export default {
  data(){
    return {
      qrcode2Open: false
    }
  },
  methods:{
    close(){
      this.qrcode2Open = false
    },
    get_code(url){
      document.getElementById("qrcode2").innerHTML = "";

      let qr = new QRCode("qrcode2", {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    get_url(e){
      let _self = this
      let url = "api/customer/file/connect/request/customer/qr"
      let config = {
        params:{
          connectRequestId: e
        }
      }

      function success(res){
        _self.get_code(res.data.data)
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.$bus.on("OPEN_INNER_QCODER", (e)=>{
      _self.qrcode2Open = true
      let url = "http://handover.roderickt1an.cn/#/Login"
      _self.get_code(url)
    })
    _self.$bus.on("OPEN_OUTER_QCODER", (e)=>{
      _self.qrcode2Open = true
      _self.get_url(e)
    })
  }
}
</script>
