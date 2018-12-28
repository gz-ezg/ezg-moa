const file = {
  namespaced: true,
  state: {
    fileList: [],

  },
  mutations: {
    update_file(state, fileList){
      state.fileList = fileList
    }
  },
  actions: {
    update_file (context, fileList) {
      context.commit('update_file', fileList)
    },
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
