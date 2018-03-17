
export default {

  INIT_COLONIZER_CONTRACT (state, contractDetails) {
    var {colonizerContract, contractAddress} = contractDetails

    state.contract = {
      colonizer: colonizerContract,
      address: contractAddress
    }
  }

}