import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("1.getvalue", "Get initial value").setAction(async (_, hre) => {
  // 从address.json得到proxy合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[hre.network.name].Proxy;
  console.log("Proxy address is ", proxyAddress);

  // 连接合约
  const IMapping = await hre.ethers.getContractAt(
    "IterableMapping",
    proxyAddress
  );

  // 得到initValue的值
  const initValue = (await IMapping.initValue()).toNumber();
  console.log("initValue is ", initValue);
});
