<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="新增">
        <create-flow></create-flow>
      </van-tab>
      <van-tab title="待确认">
        <un-finish-flow></un-finish-flow>
      </van-tab>
      <van-tab title="已确认">
        <finish-flow></finish-flow>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import createFlow from './flow/createFlow'
import unFinishFlow from './flow/unfinishFlow'
import finishFlow from './flow/finishFlow'

export default {
  name: "flow",
  components:{
    createFlow,
    unFinishFlow,
    finishFlow
  },
  data(){
    return{
      active: 0,
    }
  }
}
</script>

