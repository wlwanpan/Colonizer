import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {

  DappTitle: "Welcome to your truffle-vue dApp."

}

const getters = {

  getDappTitle: state => state.DappTitle

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
