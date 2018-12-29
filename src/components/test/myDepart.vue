<template>
  <div>
    <van-popup v-model="departShow" position="bottom" @click-overlay="cancel_paydir">
      <van-picker
        show-toolbar
        title="存放部门"
        :columns="departList"
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
      departShow:true,
      departList: []
    }
  },
  methods:{
    confirm_paydir(e){
      this.$store.dispatch("file/update_saveDepart", e)
      this.$emit("close")
    },
    cancel_paydir(){
      this.$emit("close")
    },
    get_depart(){
      let _self = this
      let url = "api/system/depart/queryDepartsByUserId"
      let config = {
        params:{}
      }
      function success(res){
        _self.departList = res.data.data.map((item)=>{
          return {
            text: item.departname,
            id: item.departid
          }
        })

        if(_self.departList.length == 1){
          _self.$store.dispatch("file/update_saveDepart", _self.departList[0])
          setTimeout(()=>{
            _self.$emit("close")
          },700)
        }
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_depart()
  }
}
</script>



