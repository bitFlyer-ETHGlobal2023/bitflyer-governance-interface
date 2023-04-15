import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAddressOnGoerli } from "../libs/configs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import contractAbi from "../libs/abis/bfGovernanceContract.json";
import { BigNumber, ethers, constants } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import sampleNFTImage from "../assets/btc1NFT-sample.png";
import axios from "axios";

type Inputs = {
  token: string;
  amount: BigNumber;
  timestamp: BigNumber;
};

const Mint = () => {
  const { isConnected } = useAccount();
  // const { userInfo } = useState<Inputs>({
  //   token: "",
  //   amount: constants.Zero,
  //   timestamp: constants.Zero,
  // });
  // const { userInfo, setUserInfo } = useState("");

  // const handleLogin = async (email: string) => {
  //   const url =
  //     "https://us-central1-oden-vote.cloudfunctions.net/users?email=" + email;
  //   const res = await axios.get(url);
  //   setUserInfo(res);
  // };

  const { config } = usePrepareContractWrite({
    address: contractAddressOnGoerli,
    abi: contractAbi,
    functionName: "mint",
    args: [
      "ETH",
      BigNumber.from("500"),
      BigNumber.from("1682706950976"),
      [
        "0x4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e",
        "0x74c8b6d5118cc7ddcdf151b0033d282dc8730a9ce251051bed5e2faa8f24aad4",
      ],
    ],
  });
  const { data, isLoading, isSuccess, write: mint } = useContractWrite(config);

  return (
    <div>
      <div className="bg-gray-50 m-20 p-5 max-w-[800px] h-[500px] mx-auto rounded-lg">
        <div className="flex h-full">
          <div className="p-4 w-1/2">
            <div className="mb-5 mt-10">
              <div className="flex">
                <h1 className="text-2xl font-bold text-gray-800">
                  Mint bF NFT
                </h1>
                <div className="flex ml-3  text-gray-500  border-gray-500">
                  <select className="px-2">
                    <option value="btc">BTC</option>
                    <option value="btc">ETH</option>
                    <option value="btc">MONA</option>
                    <option value="btc">FLR</option>
                    <option value="btc">XEM</option>
                    <option value="btc">XYM</option>
                  </select>
                </div>
              </div>
              <p className="text-gray-900"> 103 bF NFT already minted</p>
            </div>
            <div className="mb-5">
              <ConnectButton showBalance={false} />
            </div>
            {isConnected && (
              <button
                onClick={() => mint?.()}
                className=" hover:border border-blue-100 hover:shadow-sm duration-75 shadow-lg rounded-full px-7 py-2 font-bold  bg-gradient-to-r from-[#3898ff] to-[#7a70ff] "
              >
                Mint
              </button>
            )}
            {!isConnected && (
              <p className="text-red-500">
                Please connect your wallet to mint!
              </p>
            )}
          </div>
          <div className="w-1/2 flex">
            <img
              src={sampleNFTImage}
              className="scale-75 "
              alt="sampleNFTImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
