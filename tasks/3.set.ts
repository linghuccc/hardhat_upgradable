import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("3.set", "Add one member for struct")
  .addParam("address", "add address for new member")
  .addParam("value", "add value for new member")
  .setAction(async (taskArgs, hre) => {
    const { address, value } = taskArgs;

    // 从address.json得到proxy合约地址
    const addressList = readAddressList();
    const proxyAddress = addressList[hre.network.name].Proxy;
    console.log("Proxy address is ", proxyAddress);

    // 连接合约
    const IMapping = await hre.ethers.getContractAt(
      "IterableMapping",
      proxyAddress
    );

    // 调用set函数
    await IMapping.set(address, value);
    console.log(
      "Add one member with address %s, value %d successfully",
      address,
      value
    );

    // 等候3秒钟
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 得到struct的成员数量
    const size = (await IMapping.size()).toString();
    console.log("Current struct size is ", size);
  });
