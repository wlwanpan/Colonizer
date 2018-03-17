
export default {

  showLoading ({ commit }) { commit('UPDATE_PROCESSING_STATE', true) },
  hideLoading ({ commit }) { commit('UPDATE_PROCESSING_STATE', false) },

  // Habitant updates
  updateHabitant ({ commit }, habitantDetails) {
    commit('UPDATE_HABITANT', habitantDetails)
  },

  updateColonizerContract ({ commit }, contractDetails) {
    commit('INIT_COLONIZER_CONTRACT', contractDetails)
  },

  loadCoinbaseAddress ({ commit }) {
    new Promise((resolve, reject) => {
      window.web3.eth.getAccounts((err, result) => {
        if (err || !result.length) reject(err)
        else {
          console.log('Logged in as:' + result[0])
          commit('SET_HABITANT_ADDRESS', result[0])
          resolve()
        }
      })
    })
  },

  // Contract Calls

  contactCall ({ commit, state }, { method, params, value }) {
    var { colonizer, address } = state.contract
    var contract = colonizer.at(address)
    var contractOption = { from: state.habitant.address, gas: 500000 }

    switch (method) {
      // Habitant Method Call
      case 'registerHabitant':
        return contract.registerHabitant(...params, contractOption)
        .then((transaction) => {
          return transaction
        })

      case 'deRegister':
        // implement deregister

      case 'getCurrentState':
        // implement get current state


    }

  }

}