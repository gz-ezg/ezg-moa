<template>
  <div>
    <van-popup v-model="payDirShow" position="bottom">
      <van-picker
        show-toolbar
        title="缴费渠道"
        :columns="columns"
        @cancel="cancel_paydir"
        @confirm="confirm_paydir"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      payDirShow:false,
      columns: [
        {
        typecode: "dgwxg",
        id: 11074,
        text: "东莞微信公众号"
        },
        {
        typecode: "szwxg",
        id: 11041,
        text: "深圳微信公众号"
        },
        {
        typecode: "szwx",
        id: 11043,
        text: "深圳微信"
        },
        {
        typecode: "jt",
        id: 11087,
        text: "锦涛"
        },
        {
        typecode: "zht",
        id: 11086,
        text: "中衡通"
        },
        {
        typecode: "wwj",
        id: 11088,
        text: "魏建伟"
        },
        {
        typecode: "dgwx",
        id: 10979,
        text: "东莞微信"
        },
        {
        typecode: "lzsws",
        id: 11168,
        text: "立正事务所"
        },
        {
        typecode: "dgzfb",
        id: 10907,
        text: "东莞支付宝"
        },
        {
        typecode: "zgrzh",
        id: 10906,
        text: "转个人账户"
        },
        {
        typecode: "gw",
        id: 10909,
        text: "官网"
        },
        {
        typecode: "szgh",
        id: 10908,
        text: "深圳工行"
        },
        {
        typecode: "wx",
        id: 10910,
        text: "微信公众号"
        },
        {
        typecode: "tb",
        id: 10912,
        text: "淘宝"
        },
        {
        typecode: "cash",
        id: 10911,
        text: "现金"
        },
        {
        typecode: "other",
        id: 10913,
        text: "其他"
        },
        {
        typecode: "gszfb",
        id: 10901,
        text: "公司支付宝"
        },
        {
        typecode: "zh",
        id: 10903,
        text: "招行"
        },
        {
        typecode: "gh",
        id: 10902,
        text: "工行"
        },
        {
        typecode: "nsh",
        id: 10905,
        text: "农商行"
        },
        {
        typecode: "jhang",
        id: 10904,
        text: "建行"
        }
      ]
    }
  },
  methods:{
    confirm_paydir(e){
      // console.log(e)
      this.$Bus.emit('UPDATE_PAYDIR',e)
      this.payDirShow = false
    },
    cancel_paydir(){
      this.payDirShow = false
    }
  },
  created(){
    let _self = this
    this.$Bus.on('OPEN_PAYDIR',(e)=>{
      _self.payDirShow = true
    })
  }
}
</script>



