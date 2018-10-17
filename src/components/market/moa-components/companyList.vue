<template>
    <van-dialog
        v-model="company_open"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
        v-if="company_open"
        >
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchcompanyname" @click="search"/>
        </form>
        <van-radio-group v-model="select_company_id">
            <van-cell-group>
                <van-cell v-for="item in companyList" :key="item.companyid" clickable @click="choose(item)">
                    <van-col span="22">
                      <van-row>
                        <div>{{item.companyname}}</div>
                      </van-row>
                      <van-row>
                        <van-col span="12">
                          <div>{{item.customerName}}</div>
                        </van-col>
                        <van-col span="12">
                          <div>{{item.customerTel}}</div>
                        </van-col>
                      </van-row>
                    </van-col>
                    <van-col span="2"><div><van-radio :name="item.companyId" /></div></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchcompanyname: "",
      company_open: false,
      select_company_id: "",
      companyList: "",
    };
  },
  methods: {
    search() {
      let _self = this;
      let url = "api/customer/company/list";
      let config = {
        params: {
          companyname: _self.searchcompanyname,
          page: 1,
          pageSize: 5
        }
      };

      function success(res) {
        let data = res.data.data.rows;
        _self.companyList = data;
      }

      _self.$Get(url, config, success);
    },
    choose(e) {
      console.log(e);
      let _self = this;
      _self.select_company_id = e.companyId;
      _self.$Bus.emit("UPDATA_COMPANY", e);
      _self.company_open = false;
    }
  },
  created() {
    let _self = this;
    _self.$Bus.off("OPEN_COMPANY_LIST");
    _self.$Bus.on("OPEN_COMPANY_LIST", e => {
      // console.log(e, "用户id");
      _self.select_company_id = ""
      _self.searchcompanyname = ""
      _self.company_open = true;
      _self.search();
    });
  },
  watch: {
    searchcompanyname: "search"
  }
};
</script>

<style>
.van-field__clear,
.van-field__icon {
  margin-right: 0px;
}
</style>
