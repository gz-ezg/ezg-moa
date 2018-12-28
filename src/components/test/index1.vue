<template>
    <div>
        <van-collapse v-model="activeNames" class="file">
			<van-collapse-item title="基本信息" :name="0">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
            <van-collapse-item title="常用" :name="1">
                <van-checkbox-group v-model="checkArray">
                    <van-cell-group>
                        <van-cell
                            v-for="(item,index) in list"
                            clickable
                            :key="item.id"
                            @click="toggle(index)"
                        >
                            <van-field v-model="item.title" slot="title" class="title-field"></van-field>
                            <van-checkbox :name="item" ref="checkboxes" />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-collapse-item>
            <van-collapse-item :title="`工商（${bussinessTotal.length}）`" :name="2">
                <van-cell-group>
                    <van-cell v-for="(item, index) in list2" :key="index" >
                        <van-field v-model="item.title" slot="title" class="title-field"></van-field>
                        <van-stepper v-model="item.num" :min="0" :defaultValue="0" integer/>
                    </van-cell>
                    <van-cell title="单元格" value="内容" label="描述信息" />
                </van-cell-group>
            </van-collapse-item>
            <van-collapse-item title="税务" :name="3">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
            <van-collapse-item title="银行" :name="4">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
            <van-collapse-item title="个人" :name="5">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
        </van-collapse>
        <van-button size="large" plain>+ 其他文件</van-button>
        使用原有方式

        所有数据存入vuex中

        最后需要生成一份交接单
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeNames: [0,2],
            list: [
                {
                    title: "营业执照",
                    typeId: 12
                },
                {
                    title: "营业执照",
                    typeId: 13
                },
                {
                    title: "营业执照",
                    typeId: 14
                },
                {
                    title: "营业执照",
                    typeId: 15
                },{
                    title: "营业执照",
                    typeId: 16
                }
            ],
            list2: [
                {
                    title: "营业执照",
                    typeId: 12,
                    num: 1,
                },
                {
                    title: "营业执照",
                    typeId: 13,
                    num: 0,
                },
                {
                    title: "营业执照",
                    typeId: 14,
                    num: 0,
                },
                {
                    title: "营业执照",
                    typeId: 15,
                    num: 0,
                },
                {
                    title: "营业执照",
                    typeId: 16,
                    num: 0,
                }
            ],
            checkArray: []
        }
    },
    computed:{
		bussinessTotal(){
			let temp = 0
			return this.list2.filter((item)=>{
				return item.num > 0
			})
		}
    },
    methods: {
        toggle(index) {
            this.$refs.checkboxes[index].toggle()
        }
    }
}
</script>

<style>
.file .van-collapse-item__content{
    padding: 0;
}
.title-field{
  padding: 0;
  padding: 5px;
}
</style>

