<template>
    <van-dialog
        v-model="userOpen"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
        >
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchUserName" @click="search"/>
        </form>
        <van-radio-group v-model="select_user_id">
            <van-cell-group>
                <van-cell v-for="item in userList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22">
                      <van-row>
                        <van-col span="10">{{item.realname}}</van-col>
                        <van-col span="12">{{item.departname}}</van-col>
                      </van-row>
                    </van-col>
                    <van-col span="2"><van-radio :name="item.id" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script>
export default {
    data(){
    return {
      searchUserName:"",
      userOpen:false,
      select_user_id:"",
      userList:""
      }
    },
    methods:{
      search(){
        let _self = this
        let url = `api/user/list`
        let config = {
          params:{
            realname: _self.searchUserName,
            page: 1,
            pageSize: 6
          }
        }

        function success(res){
          _self.userList = res.data.data.rows
        }

        this.$Get(url, config, success)
      },
      choose(e){
        // console.log(e)
        this.select_user_id = e.id
        this.$bus.emit('UPDATE_USER', e)
        this.userOpen = false
      }
    },
    created(){
      let _self = this
      this.$bus.off("OPEN_USER_LIST")
      this.$bus.on('OPEN_USER_LIST', (e)=>{
        _self.select_user_id = ""
        _self.userOpen = true
        _self.search()
      })
    },
    watch:{
      'searchUserName':'search'
    }
}
</script>

<style>
    .van-field__clear, .van-field__icon{
        margin-right:0px
    }
</style>
