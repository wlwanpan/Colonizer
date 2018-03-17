import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import LightBootstrap from './light-bootstrap-main'

import mixins from '@/js/mixins'

import store from '@/store/store'
import routes from '@/routes/routes'

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import ColonizerContract from '@contracts/Colonizer.json'

Vue.use(VueRouter)
Vue.use(LightBootstrap)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item active'
})

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  var colonizerContract = TruffleContract(ColonizerContract)
  colonizerContract.setProvider(window.web3.currentProvider)

  const contractAddress = '0xfb0a4e5bbc481ae30826742c325ac26442cf0253'

  store.dispatch(
    'updateColonizerContract',
    {
      colonizerContract,
      contractAddress
    }
  )

  // Test Command
  // contract.registerHabitant('warren', 'wlwanp', '123123', 'ColonyB', {from: web3.eth.accounts[0], gas: 500000}).then((tx) => {console.log(tx)})

  Vue.mixin(mixins)

  new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: h => h(App),
    store,
    router
  })
})
