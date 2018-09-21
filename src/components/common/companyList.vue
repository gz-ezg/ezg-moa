<template>
    <van-dialog
        v-model="company_open"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
        >
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchcompanyname" @click="search"/>
        </form>
        <van-radio-group v-model="select_company_id">
            <van-cell-group>
                <van-cell v-for="item in companyList" :key="item.companyid" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.companyname}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.companyid" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script>
export default {
    data(){
    return {
      searchcompanyname:"",
      company_open:false,
      select_company_id:"",
      companyList:""
      }
    },
    methods:{
      search(){
        let _self = this
        let url = `api/customer/company/list`
        let config = {
          params:{
            companyname: _self.searchcompanyname,
            page: 1,
            pageSize: 5
          }
        }

        function success(res){
          _self.companyList = res.data.data.rows
        }

        this.$Get(url, config, success)
      },
      choose(e){
        this.select_company_id = e.companyid
        this.$bus.emit('update_company', e)
        this.company_open = false
      }
    },
    created(){
      let _self = this
      this.$bus.off("open_company_list")
      this.$bus.on('open_company_list', (e)=>{
        _self.company_open = true
        _self.search()
      })
    },
    watch:{
      'searchcompanyname':'search'
    }
}
</script>

<style>
    .van-field__clear, .van-field__icon{
        margin-right:0px
    }
</style>
