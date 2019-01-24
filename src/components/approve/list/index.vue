<template>
    <div>
        <van-tabs v-model="active">
            <van-tab title="待审批">
                <un-approve-list></un-approve-list>
            </van-tab>
            <van-tab title="已审批">
                <approve-list></approve-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import unApproveList from './unapprove'
import approveList from './approve'
export default {
    components: {
        unApproveList,
        approveList
    },
    data(){
        return {
            active: 0
        }
    },
    methods: {
        get_data(){

        }
    }
}
</script>