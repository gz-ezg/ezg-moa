<template>
  <div>
    <van-popup v-model="areaShow" position="bottom">
      <van-picker
        show-toolbar
        title="地区选择"
        :columns="columns"
        @cancel="cancel_paydir"
        @confirm="confirm_paydir"
        @change="on_change"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    // const area =[
    //   {
    //     text:"广州市",
    //     code:"440000",
    //     children:[
    //       {
    //         text:"荔湾区",
    //         code:"440103"
    //       },
    //       {
    //         text:"越秀区",
    //         code:"440104"
    //       },
    //       {
    //         text:"海珠区",
    //         code:"440105"
    //       },
    //       {
    //         text:"天河区",
    //         code:"440106"
    //       },
    //       {
    //         text:"白云区",
    //         code:"440111"
    //       },
    //       {
    //         text:"黄埔区",
    //         code:"440112"
    //       },
    //       {
    //         text:"番禺区",
    //         code:"番禺区"
    //       },
    //       {
    //         text:"花都区",
    //         code:"440114"
    //       },
    //       {
    //         text:"南沙区",
    //         code:"440115"
    //       },
    //       {
    //         text:"从化区",
    //         code:"440117"
    //       },
    //       {
    //         text:"增城区",
    //         code:"440118"
    //       }
    //     ]
    //   },
    //   {
    //     text:"深圳市",
    //     code:"440300",
    //     children:[
    //       {
    //         text:"罗湖区",
    //         code:"440303"
    //       },
    //       {
    //         text:"福田区",
    //         code:"440304"
    //       },
    //       {
    //         text:"南山区",
    //         code:"440305"
    //       },
    //       {
    //         text:"宝安区",
    //         code:"440306"
    //       },
    //       {
    //         text:"龙岗区",
    //         code:"440307"
    //       },
    //       {
    //         text:"盐田区",
    //         code:"440308"
    //       },
    //     ]
    //   }
    // ]
    return{
      areaShow:false,
      columns: [],
      area: [
      {
        text:"广州市",
        code:"440000",
        children:[
          {
            text:"荔湾区",
            code:"440103"
          },
          {
            text:"越秀区",
            code:"440104"
          },
          {
            text:"海珠区",
            code:"440105"
          },
          {
            text:"天河区",
            code:"440106"
          },
          {
            text:"白云区",
            code:"440111"
          },
          {
            text:"黄埔区",
            code:"440112"
          },
          {
            text:"番禺区",
            code:"番禺区"
          },
          {
            text:"花都区",
            code:"440114"
          },
          {
            text:"南沙区",
            code:"440115"
          },
          {
            text:"从化区",
            code:"440117"
          },
          {
            text:"增城区",
            code:"440118"
          }
        ]
      },
      {
        text:"深圳市",
        code:"440300",
        children:[
          {
            text:"罗湖区",
            code:"440303"
          },
          {
            text:"福田区",
            code:"440304"
          },
          {
            text:"南山区",
            code:"440305"
          },
          {
            text:"宝安区",
            code:"440306"
          },
          {
            text:"龙岗区",
            code:"440307"
          },
          {
            text:"盐田区",
            code:"440308"
          },
        ]
      }
    ]
    }
  },
  methods:{
    confirm_paydir(e){
      // console.log(e)
      this.$Bus.emit('UPDATE_AREA',e)
      this.areaShow = false
    },
    cancel_paydir(){
      this.areaShow = false
    },
    on_change(picker, values){
      picker.setColumnValues(1, values[0].children);
    }
  },
  created(){
    let _self = this
    this.$Bus.on('OPEN_AREA',(e)=>{
      _self.areaShow = true
    })
  },
  mounted(){
    this.columns = [
        {
          // values: Object.keys(area),
          values:this.area,
          className: 'column1'
        },
        {
          values: this.area[0].children,
          className: 'column2',
          defaultIndex: 2
        }
      ]
  }
}
</script>



