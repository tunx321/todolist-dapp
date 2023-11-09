const hre = require("hardhat");

async function main() {
  const Todo = await hre.ethers.getContractFactory("Todo")
  const todo = await Todo.deploy();

  await todo.waitForDeployment()
  console.log("Todo: ", await todo.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});