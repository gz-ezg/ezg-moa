<template>
  <div>
    <van-popup v-model="typeShow" position="bottom">
      <van-picker
        show-toolbar
        title="客户状态"
        :columns="columns"
        @cancel="cancel_type"
        @confirm="confirm_type"
        @change="on_change"
      />
    </van-popup>
  </div>
</template>


<script>
export default {
  data(){
    return{
      typeShow:false,
      columns:[],
      customerTypes:[]
    }
  },
  methods:{
    on_change(picker, values){
      picker.setColumnValues(1, values[0].children);
    },
    confirm_type(e){
      this.$Bus.emit("UPDATE_TYPE",e)
      this.typeShow = false
    },
    cancel_type(){
      this.typeShow = false
    },
    get_data(){
      let _self = this
      let config = "customerTypes"

      function success(res){
        _self.customerTypes = res.data.data.customerTypes
        for(let i = 0;i<_self.customerTypes.length;i++){
          _self.customerTypes[i].text = _self.customerTypes[i].typename
          if(_self.customerTypes[i].children){
            for(let j = 0; j<_self.customerTypes[i].children.length;j++){
              _self.customerTypes[i].children[j].text = _self.customerTypes[i].children[j].typename
            }
          }
        }
        _self.columns = [
          {
            // values: Object.keys(area),
            values:_self.customerTypes,
            className: 'column1'
          },
          {
            values: _self.customerTypes[0].children,
            className: 'column2',
            defaultIndex: 2
          }
        ]
      }
      this.$GetDataCenter(config, success)
    }
  },
  created(){
    let _self = this
    this.get_data()
    this.$Bus.on('OPEN_TYPE',(e)=>{
      _self.typeShow = true
    })
  },
  mounted(){

  }
}
</script>
