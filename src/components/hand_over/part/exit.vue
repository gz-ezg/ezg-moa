<template>
  <div style="padding-bottom:10vh">
    <van-row>
      <van-cell-group>
        <div>
          <van-radio-group v-model="connectPlan">
            <van-row style="margin:10px;padding-bottom:20px;padding-top:20px">
              <van-col span="12">
                <van-radio name="f_to_f">当面</van-radio>
              </van-col>
              <van-col span="12">
                <van-radio name="express">快递</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
        <div v-if="connectPlan == 'express'">
          <van-field v-model="trackingNumber" placeholder="请输入快递单号" label="快递单号"/>
        </div>
        <div>
          <van-row v-for="(item,index) in chooseList" :key="index" style="padding:5px">
            <van-col span="4">
              <center><van-icon name="close" style="font-size:20px;line-height:40px" @click="remove(index)"/></center>
            </van-col>
            <van-col span="16">
              <van-row>{{item.customer_file_name}}</van-row>
              <van-row>{{item.companyname}}</van-row>
            </van-col>
            <van-col span="4"><van-field v-model="chooseList[index].num" type="number"/></van-col>
          </van-row>
        </div>
      </van-cell-group>
      <van-row>
        <center>
          <van-button size="large" style="width:90%;margin-top:20px" @click="choose_file"> + 添加文件 </van-button>
        </center>
      </van-row>
      <van-row>
        <center>
          <van-button size="large" style="width:90%;margin-top:20px" type="danger" @click="submit" :disabled="disabled" :loading="submit_loading">申 请</van-button>
        </center>
      </van-row>
    </van-row>
    <all-file-list @add_file="add_file"></all-file-list>
  </div>
</template>

<script>
import allFileList from './flow/allFileList'

export default {
  components:{
    allFileList,
  },
  data(){
    return{
      connectPlan: "f_to_f",
      trackingNumber: "",
      chooseList:[],
      submit_loading: false
    }
  },
  computed:{
    disabled(){
      if(this.connectPlan == 'express' && !this.trackingNumber){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    choose_file(){
      let _self = this
      this.$bus.emit("OPEN_ALL_FILE", true)
    },
    add_file(e){
      console.log(e)
      this.chooseList.push(e)
    },
    remove(e){
      this.chooseList.splice(e,1)
    },
    submit(){
      let _self = this
      if(this.connectPlan == 'express' && !this.trackingNumber){
        _self.$Message.warning("请输入快递单号！")
      }else{
        let url = "api/customer/file/connect/request/customer/create"
        _self.submit_loading = true
        let temp = {}
        for(let i = 0; i < _self.chooseList.length; i++){
          _self.chooseList[i].num = parseInt(_self.chooseList[i].num)
          temp[_self.chooseList[i].id] = _self.chooseList[i].num
        }
        console.log(temp)

        let config = {
          connectPlan: _self.connectPlan,
          trackingNumber: _self.trackingNumber,
          customerFileJson: JSON.stringify(temp)
        }

        function success(res){
          _self.submit_loading = false
          _self.chooseList = []
          _self.connectPlan = "f_to_f"
          _self.send_customer_msg(res.data.data.id)
          _self.$bus.emit("OPEN_OUTER_QCODER", res.data.data.id)
        }

        function fail(err){
          _self.submit_loading = false
        }

        this.$Post(url, config, success, fail)
      }
    },
    send_customer_msg(e){
      console.log(e)
      let url = `api/customer/file/connect/request/customer/send`
      let _self  = this
      let config = {
        connectRequestId: e
      }

      function success(res){

      }

      function fail(err){

      }

      this.$Post(url, config, success, fail)
    },
  },
  created(){
    let _self = this
  }
}
</script>
