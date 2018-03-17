
export default {

  UPDATE_PROCESSING_STATE (state, showLoading) { state.showLoading = showLoading },

  INIT_COLONIZER_CONTRACT (state, contractDetails) {
    var {colonizerContract, contractAddress} = contractDetails

    state.contract = {
      colonizer: colonizerContract,
      address: contractAddress
    }
  },

  SET_HABITANT_ADDRESS (state, coinbaseAddress) {
    state.habitant.address = coinbaseAddress
  },

  UPDATE_HABITANT (state, habitantDetails) {
    // fix this one
    habitantDetails.address = state.habitant.address
    habitantDetails.status = 'online'
    state.habitant = habitantDetails
  },

  UPDATE_ASSETS (state, data) {
    console.log(data)
    if (data.length == 0) return
    var assetsOutput = _(state.assets).clone()
    // string ownerUsername, string colony, uint256 value, bool onSale, string assetType, string description, string longitude, string latitude
    _(data).each(
      ([assetId, owner, colony, value, onSale, assetType, description, longitude, latitude]) => {
        if (!_(state.assets).has(assetId)) {
          assetsOutput[assetId] = { owner, colony, value, onSale, assetType, description, longitude, latitude }
        }
        else {
          assetsOutput[assetId].owner = owner
          assetsOutput[assetId].value = value
          assetsOutput[assetId].onSale = onSale
        }
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
