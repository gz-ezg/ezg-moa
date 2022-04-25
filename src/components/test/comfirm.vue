<template>
    <div style="margin-bottom:8vh">
      <van-nav-bar title="交接管理" class="navBarStyle" @click-left="$backTo()" left-arrow/>
        <!-- {{this.$store.getters["file/get_valid_file"]}} -->
        <div>
          <van-cell-group id="small-cell">
              <van-cell title="企业名称" :value="companyName" @click="to_page('file_company')"/>
              <van-cell title="存放部门" :value="$store.state.file.saveDepart" @click="departOpen=true"/>
              <van-cell title="存放地点" :value="$store.state.file.storageName" @click="localOpen=true"/>
              <van-field label="存放位置" v-model="storageCode"  input-align="right" />
          </van-cell-group>
          <van-cell-group style="margin-top:10px">
            <center style="padding:10px;">文件列表</center>
            <van-cell v-for="(item, index) in $store.getters['file/get_valid_file']" :key="index" :title="item.customerFileName" :value="`x ${item.fileNum}`">
            </van-cell>
          </van-cell-group>
          <van-button class="submit-button" size="large" type="danger" @click="submit" :disabled="disabled" :loading="loading">提交</van-button>
          <depart-list v-if="departOpen" @close="departOpen=false"></depart-list>
          <local-list v-if="localOpen" @close="localOpen=false"></local-list>
        </div>
    </div>
</template>

<script>
import departList from './myDepart'
import localList from './localList'

export default {
    components: {
      departList,
      localList
    },
    data(){
        return {
          departOpen: false,
          localOpen: false,
          loading: false
        }
    },
    computed:{
        companyName(){
            return this.$store.state.file.companyName
        },
        saveDepartId(){
            return this.$store.state.file.saveDepartId
        },
        storageNameId(){
            return this.$store.state.file.storageNameId
        },
        storageCode:{
            get () {
              return this.$store.state.file.storageCode
            },
            set (value) {
              this.$store.commit('file/update_storageCode', value)
            }
        },
        disabled(){
          if(!this.$store.getters['file/get_valid_file'].length){
            return true
          }else{
            return false
          }
        }
    },
    methods: {
        to_page(e){
            this.$router.replace({
                name: e
            })
        },
        update_storage_code(e){
            console.log(e)
            this.$store.dispatch("file/update_storageCode", e)
        },
        submit(){
          if(!this.$store.state.file.companyId){
            this.$toast.fail("请选择公司名称！")
            return false;
          }
          if(!this.$store.state.file.saveDepartId){
            this.$toast.fail("请选择部门名称！")
            return false;
          }
          if(!this.$store.state.file.storageNameId){
            this.$toast.fail("请选择存放地点！")
            return false;
          }
            let _self = this
            let url = `api/customer/file/create`
            let result = this.$store.getters['file/get_valid_file'].map((item)=>{
                return {
                    customerFileName: item.customerFileName,
                    customerFileTypeId: item.customerFileTypeId,
                    saveDepartId: _self.saveDepartId,
                    storage: _self.storageNameId,
                    fileNum: item.fileNum,
                    storageCode: _self.storageCode
                }
            })
            if(!result.length){
              this.$toast.fail("请选择存放的文件！")
            }
            this.loading = true
            let config = {
              dataJson: JSON.stringify(result),
              companyId: _self.$store.state.file.companyId
            }

            function success(res){
              setTimeout(()=>{
                _self.$toast("即将跳转回首页！")
              }, 1000)
              _self.loading = false
              setTimeout(()=>{
                _self.$router.replace({
                  name: "test"
                })

                _self.$store.dispatch("file/clean_file_detail")
              },1000)
              
            }

            function fail(err){
              _self.loading = false
            }

            this.$Post(url, config, success, fail)

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

