<template>
  <div>
    <van-nav-bar title="资料入库" class="navBarStyle fix-top" @click-left="$backTo()" left-arrow/>
    <van-row style="padding-bottom:13.333vw;padding-top:13.333vw;">
      <div style="width:90px;float:left;overflow-y:scroll" class="left-fix">
      <!-- <div class="wrapper"> -->
        <van-cell-group>
          <div style="padding:10px;border-bottom:1px solid #ebedf0;" v-for="(item, index) in typeList" :key="index" @click="toIndex(index)">
            {{item.typename}}
          </div>
        </van-cell-group>
      </div>
      <!-- <div style="height:82vh;overflow-y:scroll;margin-left:90px;"> -->
      <div class="wrapper" ref="wrapper" style="margin-left:90px;height:100%">
        <div class="content">
          <van-cell-group>
            <van-cell v-for="(item, index) in fileList" :key="index" class="title-field" :id="`item-${index}`">
              <van-field v-model="item.customerFileName" slot="title" class="title-field-item"></van-field>
              <van-stepper v-model="item.fileNum" :min="0" :max="item.plural" :defaultValue="0" integer disable-input	/>
            </van-cell>
            <van-cell value="+" class="title-field">
              <van-button size="small" style="width:100%" @click="add_account">+ 新增凭证</van-button>
            </van-cell>
          </van-cell-group>
        </div>
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
// import BScroll from 'better-scroll'
export default {
  components: {
    submitBar
  },
  data(){
    return {
      fileList: [],
      typeList: []
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
    toIndex(e){
      let total = document.querySelector("#item-"+this.typeList[e].len).offsetTop
      let distance = document.documentElement.scrollTop
      console.log("total:" + total)
      console.log("window.pageYOffset:" + window.pageYOffset)
      document.body.scrollTop = total
      // Firefox
      document.documentElement.scrollTop = total
      // Safari
      window.pageYOffset = total
    },
    get_file_type(){
      let _self = this
      let url = "api/customer/file/type/moduleList"

      let config = {}

      function success(res){
        console.log(res.data.data)
        let data  = res.data.data
        let tempTypeList = {}
        for(let i = 0; i<data.length; i++){
          if(tempTypeList[data[i].file_ptype_name]){
            tempTypeList[data[i].file_ptype_name].children.push({
              customerFileName: data[i].file_type_name,
              customerFileTypeId: data[i].id,
              saveDepartId: "",
              storage: "",
              storageCode: "",
              fileNum: 0,
              plural: data[i].plural== 'Y'?99:1
            })
          }else{
            tempTypeList[data[i].file_ptype_name] = {
              typename: data[i].file_ptype_name,
              children: []
            }
            tempTypeList[data[i].file_ptype_name].children.push({
              customerFileName: data[i].file_type_name,
              customerFileTypeId: data[i].id,
              saveDepartId: "",
              storage: "",
              storageCode: "",
              fileNum: 0,
              plural: data[i].plural == 'Y'?99:1
            })
          }
        }

        for(let x in tempTypeList){
          _self.typeList.push({
            typename: x,
            index: tempTypeList[x].children.length
          })
          _self.fileList.push(...tempTypeList[x].children)
        }
        for(let i = 0; i<_self.typeList.length;i++){
          _self.typeList[i].len = i==0? 0: _self.typeList[i-1].len+ _self.typeList[i-1].index
        }
        // console.log(_self.typeList)
      }

      this.$Get(url, config, success)
    },
    submit(){
      this.$store.dispatch("file/update_file", this.fileList)
      this.$store.dispatch("file/update_leftMenu", this.typeList)
      this.$router.push({
          name: "comfirm"
      })
      setTimeout(()=>{
        console.log(this.$store.getters["file/get_valid_file"])
      },500)
    },
    //  凭证新增
    add_account(){
      this.fileList.push({
        customerFileName: "会计凭证",
        customerFileTypeId: 6,
        saveDepartId: "",
        storage: "",
        storageCode: "",
        fileNum: 0,
        plural: 99
      })
    }
  },
  created(){
    if(!this.$store.state.file.fileList.length){
      this.get_file_type()
    }else{
      this.fileList = this.$store.state.file.fileList
      this.typeList = this.$store.state.file.leftMenu
    }
  },
  mounted(){
  }
}
</script>

<style>
.file .van-collapse-item__content{
    padding: 0!important;
}
.title-field{
  padding: 0!important;
  padding: 3px!important;
}
.title-field-item{
  padding: 5px!important;
}
.fix-top{
  position: fixed!important;
  top:0;
  width: 100%;
}
.van-stepper__input[disabled]{
  color: #000000!important;
  background-color: #fff!important;
}
.left-fix{
  position: fixed!important;
  /* 两栏布局 */
  /* top: 8vh;
  bottom: 8vh; */
}
.van-submit-bar__text span{
  display: inline!important;
}
/* .van-submit-bar__text>span{
  display: none;
} */

</style>
