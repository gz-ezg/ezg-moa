<template>
  <div>
    <van-row>
      <van-cell-group>
        <div @click="open_company_select">
          <van-field v-model="companyName" label="归属公司" placeholder="请选择归属公司" required disabled/>
        </div>
        <div @click="open_file_type">
          <van-field v-model="customerFileType" label="文件类型" placeholder="请选择文件类型" required disabled/>
        </div>
        <div v-if="isInputFilename">
          <van-field v-model="customerFileName" label="文件名称" placeholder="请输入文件名称" required></van-field>
        </div>
        <div v-if="plural">
          <van-field v-model="fileNum" label="文件数量" placeholder="请输入文件数量" />
        </div>
        <div @click="open_save_depart">
          <van-field v-model="saveDepart" label="存放部门" placeholder="请选择存放部门" required disabled/>
        </div>
        <div @click="open_storage">
          <van-field v-model="storageName" label="存放地点" placeholder="请选择存放地点" disabled/>
        </div>
        <van-field v-model="storageCode" label="存放位置" placeholder="请选择存放位置" />
      </van-cell-group>
    </van-row>
    <van-row>
      <center>
        <van-button size="large" style="width:90%;margin-top:20px" type="danger" @click="submit" :loading="loading"> 新 增 </van-button>
      </center>
    </van-row>
    <my-depart></my-depart>
    <local-list></local-list>
  </div>
</template>

<script>
import localList from '../common/localList'
import myDepart from '../common/myDepart'

export default {
  name:"entry",
  components:{
    myDepart,
    localList
  },
  computed:{
    isInputFilename(){
      if(this.customerFileTypeId == "54"){
        return true
      }else{
        return false
      }
    }
  },
  data(){
    return{
      loading: false,
      customerId: "",
      companyId: "",
      companyName: "",
      customerFileType: "",
      customerFileTypeId: "",
      fileNum: 1,
      saveDepart: "",
      saveDepartId: "",
      storageName: "",
      storage: "",
      storageCode: "",
      customerFileName: "",
      plural: true
    }
  },
  methods:{
    open_company_select(){
      this.$bus.emit("open_company_list", true)
    },
    open_file_type(){
      this.$bus.emit("OPEN_FILETYPE",true)
    },
    open_save_depart(){
      this.$bus.emit("OPEN_DEPART",true)
    },
    open_storage(){
      this.$bus.emit("OPEN_LOCAL",true)
    },
    submit(){
      let _self = this
        if(this.companyId && this.customerFileTypeId && this.saveDepartId){
          let url = `api/customer/file/create`
          this.loading = true
          let config = {
            customerFileTypeId: _self.customerFileTypeId,
            saveDepartId: _self.saveDepartId,
            storage: _self.storage,
            companyId: _self.companyId,
            fileNum: _self.fileNum,
            storageCode: _self.storageCode,
            customerFileName: _self.customerFileName
          }

          function success(res){
            _self.loading = false
            _self.customerId = ""
            _self.companyId = ""
            _self.companyName = ""
            _self.customerFileType = ""
            _self.customerFileTypeId = ""
            _self.fileNum = 1
            _self.customerFileName = ""
            _self.saveDepart = ""
            _self.saveDepartId = ""
            _self.storageName = ""
            _self.storage = ""
            _self.storageCode = ""
            _self.plural = true
          }

          function fail(err){
            _self.loading = false
          }

          this.$Post(url, config, success, fail)
        }else{
          this.$toast.fail("请补全信息！")
        }

    }
  },
  created(){
    let _self = this
    this.$bus.off("update_company")
    this.$bus.on("update_company",(e)=>{
      // console.log(e)
      _self.companyId = e.id
      _self.companyName = e.companyname
      _self.customerId = e.customerId
    })
    this.$bus.off("UPDATE_FILETYPE")
    this.$bus.on("UPDATE_FILETYPE", (e)=>{
      // console.log(e)
      _self.customerFileType = e.file_type_name
      _self.customerFileTypeId = e.id
      if(e.plural == "Y"){
        _self.plural = true
      }else{
        _self.plural = false
      }
    })

    this.$bus.off("UPDATE_DEPART")
    this.$bus.on("UPDATE_DEPART", (e)=>{
      // console.log(e)
      _self.saveDepart = e.departname
      _self.saveDepartId = e.departid
    })

    this.$bus.off("UPDATE_LOCAL")
    this.$bus.on("UPDATE_LOCAL", (e)=>{
      _self.storageName = e.typename
      _self.storage = e.typecode

    })
  }
}
</script>

