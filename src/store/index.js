import Vue from 'vue'
import Vuex from 'vuex'

import file from './modules/file'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    file
  }
})
export default store;
