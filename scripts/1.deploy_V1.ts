import { ethers, upgrades, network } from "hardhat";
import { readAddressList, storeAddressList } from "../scripts/helper";

async function main() {
  // 得到合约对象
  const cfIMapping = await ethers.getContractFactory("IterableMapping");

  // 开始部署合约
  console.log("Deploying IterableMapping...");
  const IMapping = await upgrades.deployProxy(cfIMapping, [888], {
    initializer: "initialize",
  });
  await IMapping.deployed();

  // 得到Proxy地址，Implemetation地址，Proxy Admin地址
  const proxyAddr = IMapping.address;
  const impleAddr = await upgrades.erc1967.getImplementationAddress(proxyAddr);
  const proxyAdminAddr = await upgrades.erc1967.getAdminAddress(proxyAddr);

  // 将三个地址存入address.json
  const addressList = readAddressList();
  addressList[network.name].ProxyAdmin = proxyAdminAddr;
  addressList[network.name].MyContract = impleAddr;
  addressList[network.name].Proxy = proxyAddr;
  storeAddressList(addressList);

  // 在终端打印出地址
  console.log("Proxy address          : ", proxyAddr);
  console.log("Implementation Address : ", impleAddr);
  console.log("Proxy Admin Address    : ", proxyAdminAddr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
