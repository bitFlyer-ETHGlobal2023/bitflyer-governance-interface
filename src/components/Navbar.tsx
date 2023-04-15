import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { externalLink } from "../libs/configs";

const Navbar = () => {
  const snapshotURL = "https://snapshot.org/#/bitflyer.eth";
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const openSideNavOpen = () => {
    setIsSideNavOpen(true);
  };

  const closeSideNavOpen = () => {
    setIsSideNavOpen(false);
  };

  return (
    <div className="flex justify-between items-center px-4 text-white h-24 max-w-[1240px] mx-auto ">
      <h1 className="w-full text-3xl font-bold text-[#1982d9]">
        {!isSideNavOpen && (
          <div>
            bitFlyer<span className=" text-white">Governance</span>
          </div>
        )}
      </h1>
      <ul className="items-center uppercase hidden md:flex font-semibold">
        <li className=" p-4 hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className=" p-4 hover:underline">
          <Link to="/lock-and-mint">Lock&nbsp;&&nbsp;Mint</Link>
        </li>
        <li className="p-4 ">
          <a href={externalLink.snapshotOrg}>
            Vote&nbsp;on&nbsp;
            <span className="normal-case hover:underline underline-offset-1 text-yellow-300">
              Snapshot⚡️
            </span>
          </a>
        </li>
      </ul>
      <div className="block md:hidden">
        {!isSideNavOpen ? (
          <AiOutlineMenu className="block text-2xl" onClick={openSideNavOpen} />
        ) : (
          <AiOutlineClose
            className="block text-2xl"
            onClick={closeSideNavOpen}
          />
        )}
      </div>
      <div
        className={
          isSideNavOpen
            ? "fixed left-0 top-0 w-[60%] h-full pt-3 border-r bg-gray-800 border-r-gray-900 duration-500 ease-in-out"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl m-4 font-bold text-[#1982d9]">
          bitFlyer <br />
          <span className=" text-white">Governance</span>
        </h1>
        <ul className="uppercase p-4">
          <li className="px-2 py-4  ">
            <ConnectButton />
          </li>
          <li className="p-4 ">
            <Link to="/">Home</Link>
          </li>
          <li className=" p-4 ">
            <Link to="/local-and-mint">Lock/Mint</Link>
          </li>
          <li className=" block p-4 ">
            <a href={snapshotURL}>
              Vote on <span className="normal-case">Snapshot</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
