var AddGame = artifacts.require("./AddGame.sol");

module.exports = function(deployer) {
  deployer.deploy(AddGame, {gas: 4612388, from: web3.eth.accounts[0]});
};
