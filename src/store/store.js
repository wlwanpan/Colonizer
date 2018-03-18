import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {

  showLoading: false,

  accounts: [],

  contract: {

    colonizer: undefined,
    address: 0x0

  },

  habitant: {

    address: web3.eth.accounts[0], // Hummmm metamask call error for local node
    status: 'offline',
    firstName: '',
    lastName: '',
    username: '',
    colony: '',
    penaltyScore: 0

  },

  habitants: [

  ],

  planet: {

    habitantOnline: 0,
    habitantRegistered: 0

  },

  habitantsRegistered: {},

  assets: {}

}

const getters = {

  transactionProcessing: state => state.showLoading,

  getContract: state => {
    var { colonizer, address } = state.contract
    return colonizer.at(address)
  },

  getHabitantAddress: state => state.habitant.address,

  getHabitantRegisteredCount: state => state.planet.habitantRegistered,

  getHabitantCount: state => state.habitants.length < 1 ? 1 : state.habitants.length,

  getAssetCount: state => _(state.assets).keys().length,

  getHabitant: state => state.habitant,

  getHabitants: state => state.habitants,

  getOnSaleAssets: state => state.onSaleAssets,

  getAssets: state => filter => {
    var {onSale, owned} = filter
    var output = []
    var assetDetails = _(state.assets).values()
    var assetIDs = _(state.assets).keys()

    _(assetDetails).each((asset, index) => {
      asset.assetId = assetIDs[index]
      if (owned && asset.owner === state.habitant.username) { return output.push(asset) }
      if (onSale && asset.onSale) { return output.push(asset) }
    })

    return output
  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
