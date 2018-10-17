<template>
  <div>
    <van-popup v-model="productDetailShow" style="width:100vw;height:100vh">
      <van-nav-bar class="navBarStyle" title="产品详情" left-arrow @click-left="productDetailShow=false">
        <div slot="left"><van-icon name="close" /></div>
      </van-nav-bar>
      <div style="height:80wh">
        <van-field v-model="detail.product" label="产品名称" readonly/>
        <van-field v-model="detail.oaprice" label="产品价格" readonly/>
        <van-field v-model="detail.productnumber" label="产品数量" type="number"/>
        <van-field v-model="detail.paynumber" label="销售价格" type="number"/>
        <van-field v-model="detail.givethenumber" label="赠送数量" type="number"/>
        <van-field v-model="detail.servicestartdate" label="服务开始税期" v-if="detail.iscycle=='Y'"/>
        <div @click="open_depart">
          <van-field v-model="detail.departname" label="服务部门" readonly />
        </div>
        <van-field v-model="detail.memo" label="备注" type="textarea" placeholder="备注" autosize/>

      </div>
      <van-row style="width:100%;position:absolute;bottom:0">
        <van-col span="12">
          <van-button size="danger" style="width:100%" @click="change">修改</van-button>
        </van-col>
        <van-col span="12">
          <van-button style="width:100%" @click="delete_item">删除</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <depart-list></depart-list>
  </div>
</template>

<script>
import departList from '../woa-components/departSelect'

export default {
  components:{
    departList
  },
  data(){
    return{
      productDetailShow: false,
      index: "",
      detail: {
        product:"",
        productid:"",
        plusdeduct:"",
        memo:"",
        givethenumber:"",
        iscycle:"",
        servicedeparts:"",
        unitprice:"",
        oaprice:"",
        departname:"",
        baseprice:"",
        areaid:"",
        propertys:"",
        productnumber:"",
        departid:"",
        paynumber:"",
        skuid:""
      }
    }
  },
  computed:{
    totalPrice:function(){
      return this.detail.oaprice * this.detail.productnumber
    },
    productnumber:function(){
      return this.detail.productnumber
    }
  },
  //  因为会自动计算产品价格，所以每次进入产品价格都会变化，比较尴尬
  watch:{
    // totalPrice:function(){
    // productnumber:function(newValue, oldValue){
    //   this.detail.paynumber = this.totalPrice
    // }
    "detail.productnumber":function(){
      this.detail.paynumber = this.totalPrice
    }
  },
  created(){
    let _self = this
    this.$Bus.off("OPEN_PRODUCT_DETAIL")
    this.$Bus.on("OPEN_PRODUCT_DETAIL",(e)=>{
      // console.log(e)
      _self.productDetailShow = true
      _self.index = e[0]
      _self.detail = e[1]
    })
    this.$Bus.off("UPDATE_DEPART")
    this.$Bus.on("UPDATE_DEPART",(e)=>{
      _self.detail.departname = e.text
      _self.detail.departid = e.type
    })

  },
  methods:{
    open_depart(){
      let _self = this
      this.$Bus.emit("OPEN_DEPART",_self.detail.servicedeparts)
    },
    delete_item(){
      this.$emit("del",this.index)
      this.productDetailShow = false
    },
    change(){
      // this.$emit("change",[this.index, this.detail])
      this.productDetailShow = false
    }
  }
}
</script>

<style>
.navBarStyle{
  color:white!important;
  background-color: #CC3300!important;
}
</style>

