<template>
    <div>
        <van-loading color="white" v-if="show" style="margin-left:50%;margin-top:100px" size="100" type="spinner"/>
        <div v-else>
            <van-cell-group id="approve">
                <van-cell title="异常工单号" :value="detail.unusual_code" />
                <van-cell title="公司名称" :value="detail.CompanyName"/>
                <van-cell title="申请人" :value="detail.createByRealName" />
                <van-cell title="当前状态" :value="detail.current_process_name" />
                <van-cell title="申请类型" :value="detail.unusual_type_name" />
                <van-cell title="产品内容" :label="detail.product_content" />
                <van-cell title="备注" :label="detail.apply_memo" />
            </van-cell-group>
            <van-cell-group>
                <center style="margin-top:12px;padding-top:12px;padding-bottom:12px">审批记录</center>
                <van-steps direction="vertical" :active="items.length" active-color="#f44">
                    <van-step v-for="(item, index) in items" :key="index" >
                        <h3>{{item.realname}} [ {{item.audit_status_name}} ]</h3>
                        <p style="margin:0;padding:0">{{item.audit_date}}</p>
                        <p style="margin:0;padding:0">{{item.memo}}</p>
                    </van-step>
                </van-steps>
            </van-cell-group>
            <van-row style="margin-top:12px">
                <van-row>
                    <van-field type="textarea" placeholder="审批备注" v-model="auditMemo"></van-field>
                </van-row>
                <van-col span="24">
                    <van-button size="large" type="danger" @click="submit('Reject')" :loading="loading" style="width:90%;margin-left:5%">拒绝</van-button>
                </van-col>
                <van-col span="24" style="margin-top:6px;">
                    <van-button size="large" type="primary" @click="submit('Agree')" :loading="loading" style="width:90%;margin-left:5%">同意</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: "",
            detail: {},
            unusualType: [],
            unusualTypeMap: new Map(),
            items: [],
            auditMemo: "",
            loading: false,
            show: true
        }
    },
    methods: {
        get_detail(){
            let _self = this
            let url = `api/order/unusual/workorder/searchWordOrderById`
            let config = {
                params: {
                	applyId: this.id
                }
            }

            function success(res){
                _self.detail = res.data.data
                _self.detail.unusual_type_name = _self.unusualTypeMap.get(_self.detail.unusual_type)
                _self.items = _self.detail.items.map((item)=>{
                    if(item.audit_status == "Agree"){
                        item.audit_status_name = "同意"
                    }else{
                        item.audit_status_name = "拒绝"
                    }
                    return item
                })
                _self.show = false
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let params = "unusualType"
            let _self = this

            return new Promise((resolve, reject)=>{
                function success(res){
                    _self.unusualType = res.data.data.unusualType
                    _self.unusualTypeMap = _self.$array2map(res.data.data.unusualType)
                    resolve()
                }
                this.$GetDataCenter(params, success)
            })
        },
        submit(status){
            let _self = this
            this.loading = true
            let url = `api/order/unusual/workorder/audit`
            let config = {
                applyId: this.id,
                auditStatus: status,
                memo: this.auditMemo
            }

            function success(res){
                _self.$router.go(-1)
                _self.loading = false
            }

            function fail(err){
                _self.loading = false
            }
            
            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.id = this.$route.params.id
        this.get_data_center().then(()=>{
            _self.get_detail()
        })
    },
}
</script>

<style>
#approve .van-cell__value{
    flex: 2
}
</style>
