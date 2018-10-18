<template>
  <van-row style="width:100%;height:100%">
    <van-nav-bar class="navBarStyle" title="服务动态" left-arrow @click-left="$backTo()"/>
    <van-tabs v-model="active" swipeable @click="loading_data">
      <van-tab title="全部">
        <van-cell-group>
          <van-cell v-for="(item, index) in allData" :key="index" >
            <van-row><h3 style="margin:0">{{item.product}}</h3></van-row>
            <van-row>{{item.companyname}}</van-row>
            <van-row>当前进度：{{item.CurrentProcess}}</van-row>
            <van-row>
              <van-col span="11">服务人：{{item.servername}}</van-col>
              <van-col span="13">更新时间：{{item.UpdateDate.slice(0,10)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="11">服务状态：{{item.servername}}</van-col>
              <van-col span="13">创建时间：{{item.CreateDate.slice(0,10)}}</van-col>
            </van-row>
          </van-cell>
          <van-cell>
            <van-row>
              <center style="margin-top:5px;margin-bottom:5px">没有更多信息了！</center>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="商事">
        <van-cell-group>
          <van-cell v-for="(item, index) in commercialData" :key="index" >
            <van-row><h3 style="margin:0">{{item.product}}</h3></van-row>
            <van-row>{{item.companyname}}</van-row>
            <van-row>当前进度：{{item.CurrentProcess}}</van-row>
            <van-row>
              <van-col span="11">服务人：{{item.servername}}</van-col>
              <van-col span="13">更新时间：{{item.UpdateDate.slice(0,10)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="11">服务状态：{{item.servername}}</van-col>
              <van-col span="13">创建时间：{{item.CreateDate.slice(0,10)}}</van-col>
            </van-row>
          </van-cell>
          <van-cell>
            <van-row>
              <center style="margin-top:5px;margin-bottom:5px">没有更多信息了！</center>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="会计">
        <van-cell-group>
          <van-cell v-for="(item, index) in accountData" :key="index" >
            <van-row><h3 style="margin:0">{{item.product}}</h3></van-row>
            <van-row>{{item.companyname}}</van-row>
            <van-row>当前进度：{{item.CurrentProcess}}</van-row>
            <van-row>
              <van-col span="11">服务人：{{item.servername}}</van-col>
              <van-col span="13">更新时间：{{item.UpdateDate.slice(0,10)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="11">服务状态：{{item.servername}}</van-col>
              <van-col span="13">创建时间：{{item.CreateDate.slice(0,10)}}</van-col>
            </van-row>
          </van-cell>
          <van-cell>
            <van-row>
              <center style="margin-top:5px;margin-bottom:5px">没有更多信息了！</center>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="企划">
        <van-cell-group>
          <van-cell v-for="(item, index) in planData" :key="index" >
            <van-row><h3 style="margin:0">{{item.product}}</h3></van-row>
            <van-row>{{item.companyname}}</van-row>
            <van-row>当前进度：{{item.CurrentProcess}}</van-row>
            <van-row>
              <van-col span="11">服务人：{{item.servername}}</van-col>
              <van-col span="13">更新时间：{{item.UpdateDate.slice(0,10)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="11">服务状态：{{item.servername}}</van-col>
              <van-col span="13">创建时间：{{item.CreateDate.slice(0,10)}}</van-col>
            </van-row>
          </van-cell>
          <van-cell>
            <van-row>
              <center style="margin-top:5px;margin-bottom:5px">没有更多信息了！</center>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </van-row>
</template>

<script>

export default {
  data(){
    return{
      active:"",
      allData:[],
      commercialData:[],
      accountData:[],
      planData:[]
    }
  },
  methods:{
    loading_data(index, title){
      // console.log(index, title)
      if(title == "全部" && this.allData.length == 0){
        this.get_data(index)
      }else if(title == "商事" && this.commercialData.length == 0){
        this.get_data(index, "'BUSSINESS'")
      }else if(title == "会计" && this.accountData.length == 0){
        this.get_data(index, "'ACCOUNT'")
      }else if(title == "企划" && this.planData.length == 0){
        this.get_data(index, "'PLAN'")
      }
    },
    get_data(index, e){
      let _self = this
      let url = `api/order/workOrderList`

      let config = {
        params:{
          page: 1,
          pageSize: 1000,
          serviceDept: e,
          sortField: "updatedate",
          order: "desc",
          customerId: _self.$route.params.id
        }
      }

      function success(res){
        // console.log(res.data.data.rows)
        if(index == 0){
          _self.allData = res.data.data.rows
        }else if(index == 1){
          _self.commercialData = res.data.data.rows
        }else if(index == 2){
          _self.accountData = res.data.data.rows
        }else if(index == 3){
          _self.planData = res.data.data.rows
        }

      }

      this.$Get(url, config, success)
    }
  },
  created(){
    this.get_data(0)
  }
}
</script>

