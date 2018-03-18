
export default {

  UPDATE_PROCESSING_STATE (state, showLoading) { state.showLoading = showLoading },

  SET_DUMMY_ACCOUNT (state, accounts) { state.accounts = accounts },

  INIT_SELF_HABITANT (state, data) {
    var [fullname, username, penaltyScore, colony] = data
    var [firstName, lastName] = fullname.split(' ')
    if (fullname === '' || username == '') return
    state.habitant.address = web3.eth.accounts[0]
    state.habitant.firstName = firstName
    state.habitant.lastName = lastName
    state.habitant.username = username
    state.habitant.colony = colony
    state.habitant.status = 'online'
  },

  INIT_COLONIZER_CONTRACT (state, contractDetails) {
    var {colonizerContract, contractAddress} = contractDetails

    state.contract = {
      colonizer: colonizerContract,
      address: contractAddress
    }
  },

  UPDATE_HABITANT (state, habitantDetails) {
    // fix this one
    habitantDetails.address = state.habitant.address
    habitantDetails.status = 'online'
    state.habitant = habitantDetails
  },

  UPDATE_ASSETS (state, data) {
    if (data.length == 0) return
    var assetsOutput = _(state.assets).clone()
    _(data).each(
      ([assetId, owner, colony, value, onSale, assetType, description, longitude, latitude]) => {
        assetsOutput[assetId] = { owner, colony, value, onSale, assetType, description, longitude, latitude }
      }
    )
    state.assets = assetsOutput
  },

  UPDATE_HABITANTS (state, data) {
    var output = _(data).map(
      ([fullName, penalityScore, Colony]) => {
        return ({fullName, penalityScore, Colony})
      }
    )

    state.habitants = output
  }

}
