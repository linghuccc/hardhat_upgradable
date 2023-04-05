import { ethers, upgrades, network } from "hardhat";
import { readAddressList, storeAddressList } from "../scripts/helper";

async function main() {
  // 从address.json得到proxy合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[network.name].Proxy;
  console.log("Original Proxy address: ", proxyAddress);

  // 得到新的合约对象
  const cfIMappingV2 = await ethers.getContractFactory("IterableMapping_V2");

  // 开始升级合约
  console.log("Upgrade to V2...");
  const IMappingV2 = await upgrades.upgradeProxy(proxyAddress, cfIMappingV2);
  await IMappingV2.deployed();

  // 得到Proxy地址，Implemetation地址，Proxy Admin地址
  const proxyAddr = IMappingV2.address;
  const impleAddr = await upgrades.erc1967.getImplementationAddress(proxyAddr);
  const proxyAdminAddr = await upgrades.erc1967.getAdminAddress(proxyAddr);

  // 将三个地址存入address.json
  addressList[network.name].ProxyAdmin = proxyAdminAddr;
  addressList[network.name].MyContract = impleAddr;
  addressList[network.name].Proxy = proxyAddr;
  storeAddressList(addressList);

  // 在终端打印出地址
  console.log("V2 Proxy address          : ", proxyAddr);
  console.log("V2 Implementation Address : ", impleAddr);
  console.log("V2 Proxy Admin Address    : ", proxyAdminAddr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
