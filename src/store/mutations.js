
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
  }

}