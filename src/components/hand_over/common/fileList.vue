<template>
  <div>
    <van-popup v-model="fileTypeShow" position="bottom">
      <van-picker
        show-toolbar
        title="资料类型"
        :columns="fileList"
        @cancel="cancel_paydir"
        @confirm="confirm_paydir"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      fileTypeShow:false,
      fileList: []
    }
  },
  methods:{
    confirm_paydir(e){
      this.$bus.emit('UPDATE_FILETYPE',e)
      this.fileTypeShow = false
    },
    cancel_paydir(){
      this.fileTypeShow = false
    },
    get_file_type(){
      let _self = this
      let url = "api/customer/file/type/list"

      let config = {}

      function success(res){
        _self.fileList = res.data.data
        for(let i = 0;i < _self.fileList.length; i++){
          _self.fileList[i].text = _self.fileList[i].file_type_name
        }
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_file_type()
    this.$bus.off('OPEN_FILETYPE')
    this.$bus.on('OPEN_FILETYPE',(e)=>{
      _self.fileTypeShow = true
    })
  }
}
</script>



