import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("5.getstruct", "Get current struct").setAction(async (_, hre) => {
  // 从address.json得到proxy合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[hre.network.name].Proxy;
  console.log("Proxy address is ", proxyAddress);

  // 连接合约
  const IMapping = await hre.ethers.getContractAt(
    "IterableMapping",
    proxyAddress
  );

  // 得到struct的成员数量
  const size = (await IMapping.size()).toString();
  console.log("Current struct size is ", size);
  console.log("==========================================================");
  var key, value, index;

  // 遍历struct，展示所有成员
  for (var i = 0; i < Number(size); i++) {
    console.log("i is ", i);
    key = await IMapping.getKeyByIndex(i);
    value = (await IMapping.getValueByIndex(i)).toNumber();
    index = (await IMapping.getIndexByKey(key)).toNumber();
    console.log("key is ", key);
    console.log("value is ", value);
    console.log("indexOf is ", index);
    console.log("==========================================================");
  }
});
