<template>
  <div>
    <van-popup v-model="LocalShow" position="bottom" @click-overlay="cancel_local">
      <van-picker
        show-toolbar
        title="存放位置"
        :columns="customer_f_s_a"
        @cancel="cancel_local"
        @confirm="confirm_local"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      LocalShow:true,
      customer_f_s_a: []
    }
  },
  methods:{
    confirm_local(e){
      this.$store.dispatch("file/update_storageName", e)
      this.$emit("close")
    },
    cancel_local(){
      this.$emit("close")
    },
    get_local(){
      let _self = this
      let url = "api/system/tsType/queryTsTypeByGroupCodes"
      let config = {
        params:{
          groupCodes: "customer_f_s_a"
        }
      }
      function success(res){
        _self.customer_f_s_a = res.data.data.customer_f_s_a.map((item)=>{
          return {
            text: item.typename,
            id: item.id
          }
        })
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_local()
  }
}
</script>



