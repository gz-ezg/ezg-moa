const file = {
  namespaced: true,
  state: {
    fileList: [],
    companyName: "",
    companyId: "",
    saveDepart: "",
    saveDepartId: "",
    storageName: "",
    storageNameId: "",
    storageCode: "",
    leftMenu: []
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
    },
    update_saveDepart(state, depart){
      state.saveDepart = depart.text
      state.saveDepartId = depart.id
    },
    update_storageName(state, storage){
      state.storageName = storage.text
      state.storageNameId = storage.id
    },
    update_leftMenu(state, leftMenu){
      state.leftMenu = leftMenu
    },
    clean_file_detail(state){
      state.leftMenu = []
      state.fileList = []
      state.companyId = ""
      state.companyName = ""
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
    },
    update_saveDepart(context, depart){
      context.commit("update_saveDepart", depart)
    },
    update_storageName(context, storage){
      context.commit("update_storageName", storage)
    },
    update_leftMenu(context, leftMenu){
      context.commit("update_leftMenu", leftMenu)
    },
    clean_file_detail(context){
      context.commit("clean_file_detail")
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
