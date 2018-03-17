
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

  contactCall ({ commit, state, dispatch }, { method, params, value }) {
    dispatch('showLoading')

    var { colonizer, address } = state.contract
    var contract = colonizer.at(address)
    var contractOption = { from: state.habitant.address, gas: 500000 }

    // Send ETH to contract of provides a value
    if (value) { contractOption.value = window.web3.toBigNumber(value) }

    return new Promise((resolve, reject) => {

      switch (method) {
        // Habitant Method Call
        case 'registerHabitant':
          contract.registerHabitant(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))

        case 'registerAsset':
          contract.registerAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))

        case 'deRegister':
          contract.deRegister(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))

        case 'getCurrentState':
          contract.getCurrentState(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))

        case 'buyAsset':
          contract.buyAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))

        case 'sellAsset':
          contract.sellAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          
      }
    })
    .finally(() => dispatch('hideLoading'))
  }

}