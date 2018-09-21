<template>
  <div>
    <van-popup v-model="departShow" position="bottom">
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
      departShow:false,
      departList: []
    }
  },
  methods:{
    confirm_paydir(e){
      this.$bus.emit('UPDATE_DEPART',e)
      this.departShow = false
    },
    cancel_paydir(){
      this.departShow = false
    },
    get_depart(){
      let _self = this
      let url = "api/system/depart/queryDepartsByUserId"
      let config = {
        params:{}
      }
      function success(res){
        _self.departList = res.data.data
        for(let i = 0; i<_self.departList.length;i++){
          _self.departList[i].text = _self.departList[i].departname
        }
        if(_self.departList.length == 1){
          _self.$bus.emit('UPDATE_DEPART',_self.departList[0])
          _self.departShow = false
        }
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_depart()
    this.$bus.off('OPEN_DEPART')
    this.$bus.on('OPEN_DEPART',(e)=>{
      _self.departShow = true
    })
  }
}
</script>



