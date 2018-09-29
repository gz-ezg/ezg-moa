<template>
  <div>
    <van-popup v-model="LocalShow" position="bottom">
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
      LocalShow:false,
      customer_f_s_a: []
    }
  },
  methods:{
    confirm_local(e){
      this.$bus.emit('UPDATE_LOCAL',e)
      this.LocalShow = false
    },
    cancel_local(){
      this.LocalShow = false
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
        _self.customer_f_s_a = res.data.data.customer_f_s_a
        for(let i = 0; i<_self.customer_f_s_a.length;i++){
          _self.customer_f_s_a[i].text = _self.customer_f_s_a[i].typename
        }
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_local()
    this.$bus.off('OPEN_LOCAL')
    this.$bus.on('OPEN_LOCAL',(e)=>{
      _self.LocalShow = true
    })
  }
}
</script>



