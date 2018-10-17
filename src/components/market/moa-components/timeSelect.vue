<template>
  <div>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm_time"
        @cancel="cancel_time"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      timeShow:false,
      currentDate:new Date(),
      // minDate:new Date()
    }
  },
  methods:{
    confirm_time(e){
      let _self = this
      let year = e.getFullYear().toString()
      let month = (e.getMonth()+1).toString()
      if(month <= 9){
        month = "0" + month
      }
      let day = e.getDate().toString()
      if(day <= 9){
        day = "0" + day
      }
      console.log(year,month,day)
      let temp = year + '-' + month + '-' + day
      this.$Bus.emit('UPDATE_TIME',temp)
      this.timeShow = false
    },
    cancel_time(){
      this.timeShow = false
    }
  },
  created(){
    let _self = this
    this.$Bus.on('OPEN_TIME',(e)=>{
      _self.timeShow = true
    })
  }
}
</script>



