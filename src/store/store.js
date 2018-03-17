import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

const _ = require('underscore')

Vue.use(Vuex)

const state = {

  contract: {

    colonizer: '',
    address: ''

  },

  habitant: {

    address: 'test',
    firstName: 'Wa',
    lastName: 'Wan',
    username: 'wlw',
    colony: 'ColonyA'

  },

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

  getHabitant: state => state.habitant,

  getAssets: state => filter => {
    // to filter by
  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
