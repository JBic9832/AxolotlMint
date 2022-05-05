const Greeter = artifacts.require("Greeter");
const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  deployer.deploy(Greeter);
};
