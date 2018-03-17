
export default {

  // Store init contract and address
  updateColonizerContract ({commit}, contractDetails) {
    commit('INIT_COLONIZER_CONTRACT', contractDetails)
  }

}