<template>
  <div style="padding-bottom:5vh">
    <van-nav-bar title="交接详情" left-arrow @click-left="$backTo()" class="navBarStyle" />
    <van-row>
      <van-cell-group>
          <van-field v-model="receiver"  label="接收人" disabled/>
          <van-field v-model="applicant"  label="申请人" disabled/>
          <van-field v-model="createdate"  label="申请时间" disabled/>
          <van-field v-model="application_memo" label="备注" type="textarea" disabled/>
      </van-cell-group>
    </van-row>
    <van-row style="padding:10px" class="van-cell"><center style="width:100%">交接文件</center></van-row>
    <van-row>
      <van-field v-model="application_memo" label="备注" type="textarea" disabled v-if="application_memo"/>
    </van-row>
    <van-list>
      <van-cell-group>
        <van-cell
          v-for="item in fileData"
          :title="item.customer_file_name"
          :value="item.connect_num"
          :label="item.companyname"
          :key="item.id"
        />
      </van-cell-group>
    </van-list>
    <center style="margin-top:20px"><van-button @click="deal" size="large" type="danger" style="width:90%" v-if="status == 'normal'" >我要处理</van-button></center>
  </div>
</template>

<script>

export default {
  data(){
    return{
      id: "",
      applicant: "",
      receiver: "",
      formValidate:{
        status: "Y",
        saveDepart: "",
        saveDepartId: "",
        storage: "",
        storageCode: "",
        memo: ""
      },
      customer_f_s_a: [],
      customer_f_s_a_map: new Map(),
      fileData: [],
      loading: false,
      application_memo: "",
      createdate: "",
      status: ""
    }
  },
  computed:{
    isShow(){
      if(this.formValidate.status == "Y"){
        return true
      }else{
        return false
      }
    },
    disable(){
      if(this.formValidate.status == "Y"){
        if(this.formValidate.saveDepartId && this.formValidate.storage && this.formValidate.storageCode){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
    }
  },
  methods:{
    open_save_depart(){
      this.$bus.emit("OPEN_DEPART",true)
    },
    open_storage(){

    },
    get_request_detail(e){
      let _self = this
      let url = "api/customer/file/connect/request/detail"

      let config = {
        params: {
          id: e
          }
      }

      function success(res){
        _self.createdate = res.data.data.createdate
        _self.fileData = res.data.data.files
        _self.applicant = res.data.data.applicant_name
        _self.receiver = res.data.data.receiver_name
        _self.application_memo = res.data.data.application_memo
        _self.status = res.data.data.application_status
        for(let i = 0; i < _self.fileData.length; i++){
          _self.fileData[i].storage = _self.customer_f_s_a_map.get(_self.fileData[i].storage)
        }
          _self.openDetail = true
        }

        this.$Get(url, config, success)
    },
    get_center(){
      let _self = this
      let url = 'api/system/tsType/queryTsTypeByGroupCodes'
      let config = {
        params:{
          groupCodes: "customer_f_s_a"
        }
      }
      function success(res){
        _self.customer_f_s_a = res.data.data.customer_f_s_a
        _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
      }
      _self.$Get(url, config, success)
    },
    deal(){
      let _self = this
      this.$router.push({
        name: "confirm",
        params: {
          id: _self.id
        }
      })
    }
  },
  created(){
    let _self = this
    _self.get_center()
    _self.id = _self.$route.params.id
    _self.get_request_detail(_self.id)
    this.$bus.off("UPDATE_DEPART")
    this.$bus.on("UPDATE_DEPART", (e)=>{
      _self.formValidate.saveDepart = e.departname
      _self.formValidate.saveDepartId = e.departid

    })
  }
}
</script>

