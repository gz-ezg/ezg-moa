<template>
  <div>
    <van-popup v-model="areaShow" position="bottom">
      <van-picker
        show-toolbar
        title="区域"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaShow: false,
      columns: []
    };
  },
  methods: {
    onConfirm(e) {
      this.areaShow = false;
      this.$bus.emit("UPDATA_AREA", e);
    },
    onCancel() {
      this.areaShow = false;
    }
  },
  created() {
    let _self = this;
    _self.$bus.off("OPEN_AREA");
    _self.$bus.on("OPEN_AREA", e => {
      _self.areaShow = true;
      _self.columns = e;
    });
  }
};
</script>
