<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: ""
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
                console.log(res)
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        this.id = this.$route.params.id
        console.log(this.$route)
        this.get_detail()
    },
}
</script>