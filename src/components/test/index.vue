<template>
  <div>
    <van-nav-bar title="交接管理" class="navBarStyle" @click-left="$backTo()" left-arrow />
    <van-row style="padding-bottom:13.333vw">
      <div style="width:90px;float:left;overflow-y:scroll;height:85vh;">
        <div style="height:200vh">
          123
        </div>
      </div>
      <div style="height:85vh;overflow-y:scroll;margin-left:90px;">
        <van-cell-group>
          <van-cell v-for="(item, index) in fileList" :key="index" class="title-field">
            <van-field v-model="item.customerFileName" slot="title" class="title-field-item"></van-field>
            <van-stepper v-model="item.fileNum" :min="0" :max="item.plural" :defaultValue="0" integer/>
          </van-cell>
        </van-cell-group>
      </div>
    </van-row>
    <submit-bar
      button-text="提交资料"
      @submit="submit"
      :price="selectFileTotal"
    >
    </submit-bar>
  </div>
</template>

<script>
import submitBar from 'vant/packages/submit-bar/index'
export default {
  components: {
    submitBar
  },
  data(){
    return {
      fileList: []
    }
  },
  computed:{
    selectFileTotal(){
      let total = this.fileList.filter((item)=>{
        return item.fileNum > 0
      })
      return total.length
    }
  },
  methods: {
    get_file_type(){
      let _self = this
      let url = "api/customer/file/type/list"

      let config = {}

      function success(res){
        _self.fileList = res.data.data.map((item)=>{
          return {
            customerFileName: item.file_type_name,
            customerFileTypeId: item.customerFileTypeId,
            saveDepartId: "",
            storage: "",
            storageCode: "",
            fileNum: 0,
            plural: item.plural == 'Y'?99:1
          }
        })
      }

      this.$Get(url, config, success)
    },
    submit(){
      this.$store.dispatch("file/update_file", this.fileList)
      this.$router.push({
          name: "comfirm"
      })
      setTimeout(()=>{
        console.log(this.$store.getters["file/get_valid_file"])
      },500)
    }
  },
  created(){
    // console.log(this.$store.state)
    if(!this.$store.state.file.fileList.length){
      this.get_file_type()
    }else{
      this.fileList = this.$store.state.file.fileList
    }
  }
}
</script>

<style>
.file .van-collapse-item__content{
    padding: 0;
}
.title-field{
  padding: 0;
  padding: 3px;
}
.title-field-item{
  padding: 5px;
}
/* .van-submit-bar__text>span{
  display: none;
} */

</style>
