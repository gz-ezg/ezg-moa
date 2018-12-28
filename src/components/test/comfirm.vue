<template>
    <div style="margin-bottom:8vh">
        <!-- {{this.$store.getters["file/get_valid_file"]}} -->
        <van-cell-group id="small-cell">
            <van-cell title="企业名称" :value="companyName" @click="to_page('file_company')"/>
            <van-cell title="存放部门" :value="saveDepart" @click="open_modal('depart')"/>
            <van-cell title="存放地点" :value="storageName" @click="open_modal('local')"/>
            <van-field label="存放位置" :value="storageCode"  input-align="right" @input="update_storage_code" />
        </van-cell-group>
        <van-cell-group style="margin-top:10px">
          <center style="padding:10px;">文件列表</center>
          <van-cell v-for="(item, index) in $store.getters['file/get_valid_file']" :key="index" :title="item.customerFileName" :value="`x ${item.fileNum}`">
          </van-cell>
        </van-cell-group>
        <van-button class="submit-button" size="large" type="danger" @click="submit">提交</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        companyName(){
            return this.$store.state.file.companyName
        },
        saveDepart(){
            return this.$store.state.file.saveDepart
        },
        storageName(){
            return this.$store.state.file.storageName
        },
        storageCode(){
            return this.$store.state.file.storageCode
        }
    },
    methods: {
        to_page(e){
            this.$router.push({
                name: e
            })
        },
        open_modal(e){

        },
        update_storage_code(e){
            this.$store.dispatch("file/update_storageCode", e)
        },
        submit(){
            let _self = this
            let result = this.$store.getters['file/get_valid_file'].map((item)=>{
                return {
                    customerFileName: item.customerFileName,
                    customerFileTypeId: item.customerFileTypeId,
                    saveDepartId: _self.saveDepart,
                    storage: _self.storageName,
                    storageCode: _self.storageCode
                }
            })

            console.log(result)
        }
    }
}
</script>

<style>
#small-cell .van-cell__value{
    flex: 2;
    color: #323233
}
.submit-button{
    position: fixed;
    bottom: 0;
}
</style>

