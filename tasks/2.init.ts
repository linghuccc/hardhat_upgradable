import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("2.init", "Initialize struct").setAction(async (_, hre) => {
  // 从address.json得到proxy合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[hre.network.name].Proxy;
  console.log("Proxy address is ", proxyAddress);

  // 连接合约
  const IMapping = await hre.ethers.getContractAt(
    "IterableMapping",
    proxyAddress
  );

  // 调用initializeStruct函数
  const struct = await IMapping.initializeStruct();
  await struct.wait();
  console.log("initializeStruct called successfully");

  // 得到现在的struct的成员数量
  const size = (await IMapping.size()).toString();
  console.log("Current struct size is ", size);
});
