import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("CredentialRegistry");
  const registry = await Contract.deploy();
  await registry.waitForDeployment();

  console.log("✅ CredentialRegistry deployed at:", await registry.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
