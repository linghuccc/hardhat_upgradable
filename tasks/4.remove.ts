import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("4.remove", "Remove one member for struct")
  .addParam("address", "remove one member of struct with specified address")
  .setAction(async ({ address }: { address: string }, hre) => {
    // 从address.json得到proxy合约地址
    const addressList = readAddressList();
    const proxyAddress = addressList[hre.network.name].Proxy;
    console.log("Proxy address is ", proxyAddress);

    // 连接合约
    const IMapping = await hre.ethers.getContractAt(
      "IterableMapping",
      proxyAddress
    );

    // 调用remove函数
    const remove = await IMapping.remove(address);
    await remove.wait();
    console.log("Removed one member with address %s successfully", address);

    // 得到struct的成员数量
    const size = (await IMapping.size()).toString();
    console.log("Current struct size is ", size);
  });
