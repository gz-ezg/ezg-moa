<template>
  <div style="padding-bottom:5vh">
    <van-nav-bar title="交接确认" left-arrow @click-left="$backTo()" class="navBarStyle"/>
    <van-row>
      <van-cell-group>
        <div>
          <van-field v-model="receiver" placeholder="" label="接收人" disabled/>
        </div>
        <div>
          <van-field v-model="applicant" placeholder="" label="申请人" disabled/>
        </div>
        <div @click="open_save_depart" v-if="isShow">
          <van-field v-model="formValidate.saveDepart" label="存放部门" placeholder="请选择存放部门" required/>
        </div>
        <div @click="open_storage" v-if="isShow">
          <van-field v-model="formValidate.storagename" label="存放地点" placeholder="请选择存放地点" required/>
        </div>
        <van-field v-if="isShow" v-model="formValidate.storageCode" label="存放位置" placeholder="请选择存放位置" required/>
        <van-field v-model="formValidate.memo" placeholder="备注" type="textarea"/>
        <div>
          <van-radio-group v-model="formValidate.status">
            <van-row style="margin:10px;padding-bottom:10px">
              <van-col span="6" offset="6">
                <van-radio name="Y">接收</van-radio>
              </van-col>
              <van-col span="6">
                <van-radio name="N">拒收</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
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
    <van-row>
      <center>
        <van-button size="large" style="width:90%;margin-top:20px" type="danger" @click="submit" :loading="loading" :disabled="disable"> 确 认 </van-button>
      </center>
    </van-row>
    <my-depart></my-depart>
    <local></local>
  </div>
</template>

<script>
import myDepart from '../common/myDepart'
import local from '../common/localList'

export default {
  components:{
    myDepart,
    local
  },
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
        memo: "",
        storagename: ""
      },
      customer_f_s_a: [],
      customer_f_s_a_map: new Map(),
      fileData: [],
      loading: false,
      application_memo: ""
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
      this.$bus.emit("OPEN_LOCAL",true)
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
        _self.fileData = res.data.data.files
        _self.applicant = res.data.data.applicant_name
        _self.receiver = res.data.data.receiver_name
        _self.application_memo = res.data.data.application_memo
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
    submit(){
      let _self = this
      let url = "api/customer/file/connect/request/dispose"

      _self.loading = true
      let config = {
        status: _self.formValidate.status,
        connectRequestId: _self.id,
        departId: _self.formValidate.saveDepartId,
        memo: _self.formValidate.memo,
        storage: _self.formValidate.storage,
        storageCode: _self.formValidate.storageCode
      }

      function success(res){
        _self.loading = false
        _self.$router.push({
          name: "success"
        })
      }

      function fail(err){
        _self.loading = false
      }

      this.$Post(url,config, success, fail)
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
    this.$bus.off("UPDATE_LOCAL")
    this.$bus.on("UPDATE_LOCAL", (e)=>{
      _self.formValidate.storagename = e.typename
      _self.formValidate.storage = e.typecode

    })
  }
}
</script>

