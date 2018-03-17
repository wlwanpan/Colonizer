
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
    const PAGINATION_LIMIT = 10
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
          break
        case 'registerAsset':
          contract.registerAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
<<<<<<< HEAD
          break
        case 'loadAssets':
          var promiseOutput = []

          contract.assetCount(contractOption)
          .then(assetCount => {
            var totalAssets = assetCount.toNumber()
            var paginationFrom = _(state.assets).keys().length
            var paginationTo = (totalAssets - paginationFrom) > PAGINATION_LIMIT ? (paginationFrom + PAGINATION_LIMIT) : totalAssets

            _(_.range(paginationFrom, paginationTo)).each((paginationIndex) => {
              promiseOutput.push(
                new Promise((resolve, reject) => {
                  contract.getAssetByIndex.call(web3.toBigNumber(paginationIndex))
                  .then(data => resolve(data))
                })
              )
              Promise.all(promiseOutput).then(data => {
                commit('UPDATE_ASSETS', data)
                resolve(data)
              })
            })
          })
          break
        default:
          resolve('method not implement yet')
=======

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
>>>>>>> f076937231a70cffb2b85dcc237456fa9ca1aeae

        case 'sellAsset':
          contract.sellAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          
      }
    })
    .finally(() => dispatch('hideLoading'))
  }

}