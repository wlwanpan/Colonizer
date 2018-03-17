import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {

  planet: {
    habitantOnline: 0,
    habitantRegistered: 0
  },
  habitantsRegistered: {},
  assets: []

}

const getters = {

  getHabitantOnlineCount: state => state.planet.habitantOnline,
  getHabitantRegisteredCount: state => state.planet.habitantRegistered,
  getAssets: state => status => {

  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
