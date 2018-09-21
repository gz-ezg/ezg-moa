<template>
  <div style="padding-bottom:10vh">
    <van-row>
      <van-cell-group>
        <div @click="open_user_select">
          <van-field v-model="receiverName" placeholder="请选择接收人" required/>
        </div>
        <div>
          <van-field v-model="applicationMemo" placeholder="备注" type="textarea"/>
        </div>
        <div>
          <van-row v-for="(item,index) in chooseList" :key="index" style="padding:5px">
            <van-col span="4">
              <center><van-icon name="close" style="font-size:20px;line-height:40px" @click="remove(index)"/></center>
            </van-col>
            <van-col span="16">
              <van-row>{{item.file_type_name}}</van-row>
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
    <user-list></user-list>
    <all-file-list @add_file="add_file"></all-file-list>
  </div>
</template>

<script>
import userList from '../../common/userList'
import allFileList from './allFileList'

export default {
  components:{
    userList,
    allFileList,

  },
  data(){
    return{
      receiverId: "",
      receiverName: "",
      applicationMemo: "",
      chooseList:[],
      submit_loading: false
    }
  },
  computed:{
    disabled(){
      if(this.receiverId && this.chooseList.length){
        return false
      }else{
        return true
      }
    }
  },
  methods:{
    open_user_select(){
      this.$bus.emit("OPEN_USER_LIST", true)
    },
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
      let url = "api/customer/file/connect/request/create"
      _self.submit_loading = true
      let temp = {}
      for(let i = 0; i < _self.chooseList.length; i++){
        _self.chooseList[i].num = parseInt(_self.chooseList[i].num)
        temp[_self.chooseList[i].id] = _self.chooseList[i].num
      }
      console.log(temp)

      let config = {
        receiverId: _self.receiverId,
        applicationMemo: _self.applicationMemo,
        customerFileJson: JSON.stringify(temp)
      }

      function success(res){
        _self.submit_loading = false
      }

      function fail(err){
        _self.submit_loading = false
      }

      this.$Post(url, config, success, fail)
    }
  },
  created(){
    let _self = this
    this.$bus.off("UPDATE_USER")
    this.$bus.on("UPDATE_USER",(e)=>{
      _self.receiverId = e.id
      _self.receiverName = e.realname
    })
  }
}
</script>
