<template>
  <div>
    <van-nav-bar title="交接管理" class="navBarStyle fix-top" @click-left="$backTo()" left-arrow/>
    <van-row style="padding-bottom:13.333vw;padding-top:13.333vw;">
      <div style="width:90px;float:left;overflow-y:scroll" class="left-fix">
      <!-- <div class="wrapper"> -->
        <van-cell-group>
          <div style="padding:10px;border-bottom:1px solid #ebedf0" v-for="(item, index) in leftSide" :key="index" @click="toIndex(item.index)">
            {{item.title}}
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
      leftSide: [
        {
          title: "常用",
          index: 0
        },
        {
          title: "工商",
          index: 8
        },
        {
          title: "税务",
          index: 15
        },
        {
          title: "银行",
          index: 25
        },
        {
          title: "个人",
          index: 38
        },
        {
          title: "其他",
          index: 40
        }
      ],
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
      let total = document.querySelector("#item-"+e).offsetTop
      let distance = document.documentElement.scrollTop
      document.documentElement.scrollTop = total
      // console.log(total)
      // console.log(distance)
      // document.documentElement.scrollTop = document.documentElement.scrollTop + 50
      // let timer
      // if(distance < total ){
      //   timer = setTimeout(() => {
      //     this.toIndex(e)
      //   }, 40);
      // }else{
      //   clearTimeout(timer)
      // }
    },
    get_file_type(){
      let _self = this
      let url = "api/customer/file/type/list"

      let config = {}

      function success(res){
        _self.fileList = res.data.data.map((item)=>{
          return {
            customerFileName: item.file_type_name,
            customerFileTypeId: item.id,
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
    // console.log(this.$store.state)
    if(!this.$store.state.file.fileList.length){
      this.get_file_type()
    }else{
      this.fileList = this.$store.state.file.fileList
    }
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.scroll = new Bscroll(this.$refs.wrapper, {})
    // })
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
.fix-top{
  position: fixed;
  top:0;
  width: 100%;
}
.van-stepper__input[disabled]{
  color: #7d7e80;
  background-color: #fff;
}
.left-fix{
  position: fixed;
  /* 两栏布局 */
  /* top: 8vh;
  bottom: 8vh; */
}
.van-submit-bar__text span{
  display: inline;
}
/* .van-submit-bar__text>span{
  display: none;
} */

</style>
