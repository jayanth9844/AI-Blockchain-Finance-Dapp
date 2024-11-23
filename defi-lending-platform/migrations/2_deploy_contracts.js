const DeFiLendingPool = artifacts.require("DeFiLendingPool");

module.exports = async function(deployer) {
  await deployer.deploy(DeFiLendingPool);
  const deployedContract = await DeFiLendingPool.deployed();
  console.log("DeFi Lending Pool deployed at:", deployedContract.address);
};