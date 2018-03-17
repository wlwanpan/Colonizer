import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

const _ = require('underscore')

Vue.use(Vuex)

const state = {

  showLoading: false,

  contract: {

    colonizer: undefined,
    address: 0x0

  },

  habitant: {

    address: 0x0,
    status: 'offline',
    firstName: '',
    lastName: '',
    username: '',
    colony: ''

  },

  planet: {

    habitantOnline: 0,
    habitantRegistered: 0

  },

  habitantsRegistered: {},

  // Assets Store { assetID: {id: bytes32, value: uint256, description: string} }

  assets: {},

  onSaleAssets: [
    {
      seller: '0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0',
      value: 10,
      description: 'First asset',
      assetType: 'Land',
      longitude: '362576',
      latitude: '2352436'
    },
    {
      seller: '0x1daa654cfbc28f375e0f08f329de219fff50c765',
      value: 143,
      description: 'Second asset',
      assetType: 'Crop',
      longitude: '435237',
      latitude: '5246'
    },
    {
      seller: '0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7',
      value: 1,
      description: 'Third asset',
      assetType: 'Building',
      longitude: '324251',
      latitude: '123123'
    }
  ],

  habitants: [
    {
      firstname: 'Warren',
      lastname: 'Wan',
      username: 'warren.wan',
      colony: 'colonyA'
    },
    {
      firstname: 'James',
      lastname: 'Wan',
      username: 'james.wan',
      colony: 'colonyB'
    }
  ]

}

const getters = {

  transactionProcessing: state => state.showLoading,

  getContract: state => {
    var { colonizer, address } = state.contract
    return colonizer.at(address)
  },

  getHabitantAddress: state => state.habitant.address,

  getHabitantRegisteredCount: state => state.planet.habitantRegistered,

  getHabitant: state => state.habitant,

  getHabitants: state => state.habitants,

  getOnSaleAssets: state => state.onSaleAssets,

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
