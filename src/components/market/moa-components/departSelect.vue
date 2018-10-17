<template>
  <div>
    <van-popup v-model="departShow" position="bottom">
      <van-picker
        show-toolbar
        title="服务部门"
        :columns="columns"
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
      departShow:false,
      columns: []
    }
  },
  methods:{
    confirm_paydir(e){
      // console.log(e)
      this.$Bus.emit('UPDATE_DEPART',e)
      this.departShow = false
    },
    cancel_paydir(){
      this.departShow = false
    }
  },
  created(){
    let _self = this
    this.$Bus.off('OPEN_DEPART')
    this.$Bus.on('OPEN_DEPART',(e)=>{
      // console.log(JSON.parse(e))
      _self.columns = JSON.parse(e)
      _self.departShow = true
    })
  }
}
</script>



