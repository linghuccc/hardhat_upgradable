import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { BigNumber } from "ethers";

task("0.getsize", "Get struct size").setAction(async (_, hre) => {
  // 从address.json得到proxy合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[hre.network.name].Proxy;
  console.log("Proxy address is ", proxyAddress);

  // 连接合约
  const IMapping = await hre.ethers.getContractAt(
    "IterableMapping",
    proxyAddress
  );

  // 调用size函数
  const size = (await IMapping.size()).toString();
  console.log("Struct size is ", size);
});
