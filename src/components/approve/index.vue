<template>
<div>
    <van-row style="overflow-x: hidden">
        <van-nav-bar title="工单审批" class="navBarStyle" @click-left="$backTo()" left-arrow />
        <router-view></router-view>
    </van-row>
</div>
</template>

<script>
export default {
    name: "index",
    components:{},
    data(){
        return{
            active: 1,
        }
    },
    methods:{

    }
}
</script>

