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
window._ = _ // hell its not importing from any components

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
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  }

  var colonizerContract = TruffleContract(ColonizerContract)
  colonizerContract.setProvider(window.web3.currentProvider)


  const ropstenTestNetAddress = '0x5dda3ccfb90399e382eed802d6de1b5a7f5f2dc9'
  const contractAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'

  store.dispatch('updateColonizerContract', { colonizerContract, contractAddress })

  Vue.mixin(mixins)

  new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: h => h(App),
    store,
    router
  })
})
