var _  = require('underscore')

var methods = {
  // Example Alerter
  alertError: (err) => window.alert(err),

  getGasLimit: () => 500000,

  toBigNumber: (input) => window.web3.toBigNumber(input),

  toWei: (input) => window.web3.toWei(input, 'ether'),

  fromWei: (input) => window.web3.fromWei(input, 'ether')

}

export default { methods }
