var _  = require('underscore')

var methods = {
  // Example Alerter
  alertError: (err) => window.alert(err),

  // dynamically calc gas limit if have time
  getGasLimit: () => 500000

}

export default { methods }
