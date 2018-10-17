<template>
  <div>
    <van-popup v-model="productListShow" style="width:100%;height:100%">
      <van-nav-bar class="navBarStyle" title="产品列表" left-arrow @click-left="productListShow=false"/>
      <van-search placeholder="请输入产品名称" v-model="searchProduct" @search="get_all_product" />
      <div class="productList" ref="wrapper" >
        <van-badge-group :active-key="activeKey" class="content" ref="product">
          <van-badge @click="onClick(item, index)" v-for="(item, index) in productList" :key="index" :title="item.product"/>
        </van-badge-group>
      </div>
      <div class="detailContent">
        <van-row v-for="(item,index) in productType" :key="index" class="content_container">
          <van-row class="content_name">{{item.name}}</van-row>
          <van-radio-group v-model="radio[index]">
            <van-col span="12" v-for="(type, index) in item.children" :key="index" class="content_radio">
              <van-radio :name="type.pvId" :key="index">{{type.propertyValue}}</van-radio>
            </van-col>
          </van-radio-group>
        </van-row>
      </div>
        <van-row class="product_bottom">
          <center><h3>产品价格：{{productPrice}} 元</h3></center>
          <van-button size="danger" @click="get_detail_by_skuid" :disabled="isAddProduct" style="width:100%">添加</van-button>
        </van-row>

    </van-popup>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

export default {
  data(){
    return{
      searchProduct:"",
      value:"",
      activeKey:"",
      productListShow:false,
      productList: [],
      productType: [],
      producSku: [],
      area:"",
      radio:[],
      productPrice: 0,
      sku:"",
      detail:"",
      productId: "",
      companyId: ""
    }
  },
  watch:{
    radio: function(){
      let _self = this
      this.productPrice = 0
      if(this.radio.length){
        this.find_sku().then(
          function(){
            _self.get_product_price_by_sku()
          }
        ).catch(function(){
          console.log("")
        })
        // this.get_product_price_by_sku()
      }else{
      }
    }
  },
  computed:{
    isAddProduct:function(){
      if(!this.sku){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    //  左边栏切换
    onClick(item, index) {
      this.radio = []
      this.sku = ""
      // DOM 更新了
      this.activeKey = index;
      this.get_product_type(item.id)
      this.get_product_sku(item.id)
      // console.log(this.$refs['product'].$children)
    },
    //  获取所有的产品
    get_all_product(){
      let _self = this
      let url = `api/product/list`
      let config = {
        params: {
          page: 1,
          pageSize: 1000,
          product:_self.searchProduct
        }
      }

      function success(res){
        _self.productList = []
        _self.productList = res.data.data.rows
        _self.productList.push({
          id:"000000",
          product:"暂无"
        })
      }

      this.$Get(url, config, success)
    },

    //  获取该产品的子类型
    get_product_type(e){
      let _self = this
      let url = `api/product/queryPropertyByProductId`

      let config = {
        params:{
          productId: e
        }
      }

      function success(res){
        // console.log(res.data.data)
        _self.productType = res.data.data
        // for(let i = 0; i<_self.productType.length; i++){
        //   _self.radio.push(_self.productType[i].children[0].pvId  )
        // }
      }

      this.$Get(url, config, success)
    },

    //  获取该产品的所有sku
    get_product_sku(e){
      let _self = this
      _self.productId = e
      let url = `api/product/getSKUListByProductId`
      let config = {
        params:{
          productId: e
        }
      }

      function success(res){
        // console.log(res.data.data)
        _self.producSku = res.data.data
      }

      this.$Get(url, config, success)
    },

    //  通过sku获取该产品的价格
    get_product_price_by_sku(){
      let url = `api/product/getPriceByAreaAndSKU`

      let _self = this

      let config = {
        params:{
          skuId: _self.sku,
          areaId: _self.area
        }
      }

      function success(res){
        _self.productPrice = res.data.data[0].oaprice
      }

      this.$Get(url, config, success)
    },

    //  通过类型组合获取sku
    find_sku(){
      let _self = this
      return new Promise(function(resolve, reject){
        _self.sku = ""
        let len = _self.producSku[0].linkPropertys.split(",").length
        if(_self.radio.length == len){
          let arr = []
          let total = _self.radio.join(",")
          for(let i = 0; i< _self.producSku.length;i++){
            arr = _self.producSku[i].linkPropertys.split(",")
            let flag = _self.find_array(arr, total)
            // console.log(flag)
            if(flag){
              _self.sku = _self.producSku[i].id
              // console.log(_self.sku)
              resolve()
            }
          }
        }else{

        }

      })
    },

    //  获取数组
    find_array(cur, params){
      params = params.split(",")
      if(cur.length == params.length){
        let len = cur.length
        // console.log(len)
        let flag = 0
        cur = cur.sort()
        params = params.sort()
        for(let i = 0; i<len; i++){
          if(cur[i] == params[i]){
            flag ++;
          }else{
            return false
          }
        }
        if(flag == len){
          return true
        }
      }else{
        return false
      }
    },

    //  获取产品详情通过sku
    get_detail_by_skuid(){
      let _self = this
      let url = '/api/order/queryItemDetail'

      let config = {
        params:{
          productSkuIds: _self.sku,
          areaId: _self.area
        }
      }

      function success(res){
        _self.detail = res.data.data[0]
        // console.log(_self.detail)
        if(res.data.data[0].iscycle == "Y"){
          let url2 = "api/order/cycle/service/record/budget/period"
          let config2 = {
            params: {
              productId: _self.productId,
              companyId: _self.companyId
            }
          }

          function success2(re){
            _self.detail.servicestartdate = re.data.data
            _self.$Bus.emit("ADD_PRODUCT",_self.detail)
            _self.productListShow = false
          }

          _self.$Get(url2, config2, success2)
        }else{
          _self.$Bus.emit("ADD_PRODUCT",_self.detail)
          _self.productListShow = false
        }
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    this.$Bus.off("OPEN_PRODUCT_LIST")
    this.$Bus.on("OPEN_PRODUCT_LIST",(e)=>{
      _self.productListShow = true
      _self.area = e[0]
      _self.companyId = e[1]
      _self.sku = ""
      _self.radio = []
      _self.detail = ""
      _self.get_all_product()
    })
  }
}
</script>

<style>
.van-radio__input{
  line-height:1;
}
.van-radio__label{
  width: 95px;
}
.van-col-12{
  display: flex;
  justify-content: center;
  align-items:center
}
/* .van-button--large{
  background-color: #CC3300!important;
  color: white;
} */
.productList{
  height:86.5vh;
  overflow-y:scroll;
  width:25%;
  float:left
}
.detailContent{
  height:70vh;
  overflow-y:scroll;
  float:left;
  width:75%;
  margin-bottom:30px
}
.content_container{
  margin-top:20px;
  margin-bottom:20px
}
.content_name{
  margin-top:10px;
  padding-bottom:10px;
  border-bottom:2px solid #ccc;
  margin-bottom:10px
}
.content_radio{
  padding:10px;
  height:40px
}
.content_container .van-radio__label{
  width:75px;
}
.product_bottom{
  position: fixed;
  left:23vw;
  bottom:0;
  width:76.5vw;

}
.product_bottom h3{
  margin: 0;
  margin-bottom:0.2em;
}
</style>
