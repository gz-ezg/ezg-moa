<template>
    <div>
      <van-nav-bar title="选择企业" class="navBarStyle" @click-left="back" left-arrow/>
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchcompanyname" @click="search"/>
        </form>
        <van-cell-group>
            <van-cell v-for="item in companyList" :key="item.id" clickable @click="choose(item)">
                <van-col span="22"><div>{{item.companyname}}</div></van-col>
                <van-col span="2"><center>+</center></van-col>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchcompanyname:"",
            companyList:""
        }
    },
    methods: {
        search(){
            let _self = this
            let url = `api/customer/company/list`
            let config = {
                params:{
                    companyname: _self.searchcompanyname,
                    page: 1,
                    pageSize: 20
                }
            }

            function success(res){
                _self.companyList = res.data.data.rows.map((item)=>{
                    return {
                        companyname: item.companyname,
                        id: item.id
                    }
                })
            }

            this.$Get(url, config, success)
        },
        choose(e){
            console.log(e)
            this.$store.dispatch("file/update_company", e)
            this.$router.replace({
                name: "comfirm"
            })
        },
        back(){
          this.$router.replace({
            name: "comfirm"
          })
        }
    },
    created(){
        this.search()
    }
}
</script>

