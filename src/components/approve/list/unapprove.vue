<template>
    <div style="height:85vh">
        <form action="/">
            <van-search placeholder="输入创建人名称进行搜索" v-model="searchName" @search="onSearch" />
        </form>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="load_data"
            >
            <van-cell
                id="list"
                v-for="item in data"
                :key="item.id"
                :title="item.companyname"
                :value="item.realname"
                :label="item.process_type"
                @click="open_detail(item)"
            />
        </van-list>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchName: "",
            data: [],
            loading: false,
            finished: false,
            page: 1,
            total: 9999
        }
    },
    methods: {
        load_data(){
            this.get_data()
        },
        get_data(){
            console.log("getData")
            let _self = this
            let url = `api/order/unusual/workorder/auditList`
            // let url = `api/user/list`
            let config = {
                params: {
                    page: _self.page,
                    pageSize: 10,
                    // realname: _self.searchName,
                    isAudit: 'N'
                }
            }

            function success(res){
                try {
                    _self.total = res.data.data.total
                    for(let i = 0; i<res.data.data.rows.length; i++){
                        _self.data.push(res.data.data.rows[i])
                    }
                    _self.page ++
                    _self.loading = false
                    console.log(_self.total)
                    if(_self.data.length >= _self.total){
                        _self.finished = true
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            this.$Get(url, config, success)
        },
        onSearch(){
            this.page = 1
            this.data = []
            this.loading = true
            this.finished = false
            this.get_data()
        },
        open_detail(e){
            console.log(e)
            this.$router.push({
                name: "ApproveDetail",
                params: {
                    id: e.applyId
                }
            })
        }
    },
    created() {
        // this.get_data()
    },
}
</script>

<style>
#list .van-cell__title{
    flex: 2
}
#list .van-cell__value{
    flex: 1
}
</style>