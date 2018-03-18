import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import LightBootstrap from './light-bootstrap-main'
import VModal from 'vue-js-modal'

import mixins from '@/js/mixins'
import underscore from 'vue-underscore'

import store from '@/store/store'
import routes from '@/routes/routes'

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import ColonizerContract from '@contracts/Colonizer.json'

Vue.use(VueRouter)
Vue.use(underscore)
Vue.use(LightBootstrap)
Vue.use(VModal, { dynamic: true })

import { _ } from 'vue-underscore'
window._ = _ // fucking hell its not importing from any components

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item active'
})

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  var colonizerContract = TruffleContract(ColonizerContract)
  colonizerContract.setProvider(window.web3.currentProvider)


  // const contractAddress = '0xb886bab35ca254e61116a0bde685acd2035f8419' // Testnet
  const contractAddress = '0x82002f103255b870c5ad9000b04dba7146fc12f3'

  store.dispatch(
    'updateColonizerContract',
    {
      colonizerContract,
      contractAddress
    }
  )

  Vue.mixin(mixins)

  new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: h => h(App),
    store,
    router
  })
})
