var Colonizer = artifacts.require("../contracts/Colonizer.sol")

module.exports = function(deployer) {
  deployer.deploy(Colonizer)
}
