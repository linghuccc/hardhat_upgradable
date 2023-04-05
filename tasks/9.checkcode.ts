import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("9.checkcode", "Get contract code").setAction(async (_, hre) => {
  // 从address.json 得到 proxy 合约地址, Implementation 合约地址，ProxyAdmin 合约地址
  const addressList = readAddressList();
  const proxyAddress = addressList[hre.network.name].Proxy;
  const impleAddress = addressList[hre.network.name].MyContract;
  const proxyAdminAddress = addressList[hre.network.name].ProxyAdmin;

  // 将地址打印到终端
  console.log("Proxy address is          ", proxyAddress);
  console.log("Implementation address is ", impleAddress);
  console.log("Proxy Admin address is    ", proxyAdminAddress);
  console.log(
    "=================================================================================================="
  );

  const provider = hre.ethers.provider;

  // Get code for proxy address
  const codeProxy = await provider.getCode(proxyAddress);
  console.log("Proxy code is ", codeProxy);

  console.log(
    "=================================================================================================="
  );

  // Get code for implementation address
  const codeImple = await provider.getCode(impleAddress);
  console.log("Implementation code is ", codeImple);

  console.log(
    "=================================================================================================="
  );

  // Get code for proxy admin address
  const codeProxyAdmin = await provider.getCode(proxyAdminAddress);
  console.log("Proxy Admin code is ", codeProxyAdmin);
});
