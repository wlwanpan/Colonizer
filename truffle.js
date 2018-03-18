module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    },
    ropsten:  {
      host: "localhost",
      port:  7545,
      network_id: 3,
      gas:   2900000
    }
  }
}
