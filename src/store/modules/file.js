const file = {
  namespaced: true,
  state: {
    fileList: [],
    companyName: "广州则为信息科技有限公司",
    companyId: "",
    saveDepart: "",
    storageName: "",
    storageCode: ""
  },
  mutations: {
    update_file(state, fileList){
      state.fileList = fileList
    },
    update_company(state, company){
      state.companyName = company.companyname,
      state.companyId = company.id
    },
    update_storageCode(state, storageCode){
      state.storageCode = storageCode
    }
  },
  actions: {
    update_file (context, fileList) {
      context.commit('update_file', fileList)
    },
    update_company(context, company){
      context.commit("update_company", company)
    },
    update_storageCode(context, storageCode){
      context.commit("update_storageCode", storageCode)
    }
  },
  getters: {
    get_valid_file(state) {
      return state.fileList.filter((item)=>{
        return item.fileNum > 0
      })
    }
  }
}

export default file;
