
export default {

  showLoading ({ commit }) { commit('UPDATE_PROCESSING_STATE', true) },
  hideLoading ({ commit }) { commit('UPDATE_PROCESSING_STATE', false) },

  // Habitant updates
  updateHabitant ({ commit }, habitantDetails) {
    commit('UPDATE_HABITANT', habitantDetails)
  },

  updateAssets ({ commit }, assetDetails) {
    commit('UPDATE_ASSETS', assetDetails)
  },

  updateColonizerContract ({ commit }, contractDetails) {
    commit('INIT_COLONIZER_CONTRACT', contractDetails)
  },

  loadCoinbaseAddress ({ commit }) {
    commit('SET_HABITANT_ADDRESS', web3.eth.accounts[0])
  },

  // Contract Calls

  contactCall ({ commit, state, dispatch }, { method, params, value }) {
    dispatch('showLoading')

    var { colonizer, address } = state.contract
    const PAGINATION_LIMIT = 10
    var contract = colonizer.at(address)
    var contractOption = { from: state.habitant.address, gas: 500000 }
    console.log(state.habitant.address)

    // Send ETH to contract of provides a value
    if (value) { contractOption.value = window.web3.toWei(value) }

    return new Promise((resolve, reject) => {

      switch (method) {
        // Habitant Method Call
        case 'initSelfHabitant':
          contract.getMyDetails(contractOption)
          .then((data) => {
            commit('INIT_SELF_HABITANT', data)
            resolve(data)
          })
          .catch(err => reject(err))
          break
        case 'registerHabitant':
          contract.registerHabitant(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        case 'registerAsset':
          contract.registerAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        case 'loadAssets':
          var promiseOutput = []

          contract.assetCount(contractOption)
          .then(assetCount => {
            var totalAssets = assetCount.toNumber()

            // removing pagination
            var paginationFrom = _(state.assets).keys().length
            var paginationTo = (totalAssets - paginationFrom) > PAGINATION_LIMIT ? (paginationFrom + PAGINATION_LIMIT) : totalAssets

            _(_.range(totalAssets)).each((paginationIndex) => {
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

        case 'loadHabitants':
          var promiseOutput = []

          contract.habitantCount(contractOption)
          .then(habitantCount => {
            _(_.range(habitantCount.toNumber())).each((index) => {
              promiseOutput.push(
                new Promise((resolve, reject) => {
                  contract.getHabitantByIndex.call(web3.toBigNumber(index))
                  .then(data => resolve(data))
                })
              )
            })
            Promise.all(promiseOutput).then(data => {
              commit('UPDATE_HABITANTS', data)
              resolve(data)
            })
          })
          .catch(err => reject(err))
          break

        case 'deRegister':
          contract.deRegister(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        case 'getCurrentState':
          contract.getCurrentState(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        case 'buyAsset':
          contract.buyAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        case 'sellAsset':
          contract.sellAsset(...params, contractOption)
          .then(transaction => resolve(transaction))
          .catch(err => reject(err))
          break

        default:
          resolve('method not implement yet')

      }
    })
    .finally(() => dispatch('hideLoading'))
  }

}
