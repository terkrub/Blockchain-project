const ShoeNFT = artifacts.require("ShoeNFT");

module.exports = function(deployer) {
  deployer.deploy(ShoeNFT);
};
