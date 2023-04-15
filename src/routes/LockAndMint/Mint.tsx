import React, { useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { contractAddressOnGoerli } from "../../libs/configs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import contractAbi from "../../libs/abis/bfGovernanceContract.json";
import sampleNFTImage from "../../assets/pol.png";
import flipCardImage from "../../assets/flipcard.png";
import { useReward } from "react-rewards";

const Mint = () => {
  const { isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: contractAddressOnGoerli,
    abi: contractAbi,
    functionName: "mint",
    args: [
      "MATIC",
      150,
      222,
      [
        "0x5e3e1788f00143468adec398d90b863ae9fb1a5166bcaa5efac14ecbcf2d2a85",
        "0xffa0dad8399f0bea6b920ae9268d649de422be946d4a27ceb1bdf5e8665769c3",
      ],
    ],
  });
  const { data, write: mint } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const { reward, isAnimating } = useReward("rewardId", "confetti");

  return (
    <div>
      <div className="m-20 p-5 max-w-[800px] h-[500px] mx-auto rounded-lg">
        <div className="flex h-full">
          <div className="p-4 w-1/2">
            <div className="mb-5 mt-10">
              <div className="flex">
                <h1 className="text-2xl font-bold ">Mint bF NFT</h1>
                <div className="flex ml-3  text-gray-500  border-gray-500">
                  <select className="px-2">
                    <option value="btc">MATIC</option>
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
                disabled={!mint || isLoading}
                onClick={() => {
                  reward();
                  mint?.();
                }}
                className=" hover:border border-blue-100 hover:shadow-sm duration-75 shadow-lg rounded-full px-7 py-2 mt-1 font-bold  bg-gradient-to-r from-[#3898ff] to-[#7a70ff] "
              >
                <span id="rewardId" />
                {isLoading ? "Minting..." : "Mint"}
              </button>
            )}
            {isSuccess && (
              <div>
                Successfully minted your NFT!🎉
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>
                    Etherscan
                  </a>
                </div>
              </div>
            )}
            {!isConnected && (
              <p className="text-red-500">
                Please connect your wallet to mint!
              </p>
            )}
          </div>
          <div className="w-1/2 flex">
            {isSuccess ? (
              <img
                src={sampleNFTImage}
                className="scale-75 shadow-2xl shadow-[#dc9eab]"
                alt="sampleNFTImage"
              />
            ) : (
              <img
                src={flipCardImage}
                className="scale-75 shadow-2xl shadow-white"
                alt="sampleNFTImage"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
