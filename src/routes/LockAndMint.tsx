import React from "react";
import { Link, Outlet } from "react-router-dom";

const LockAndMint = () => {
  return (
    <div className="m-10">
      <div className="flex justify-center items-center  ">
        <Link
          to="/lock-and-mint"
          className="hover:border-gray-500 mr-5 border-gray-400 border border-r rounded-md px-2 text-lg"
        >
          Lock your tokens
        </Link>
        <Link
          to="/lock-and-mint/mint"
          className="hover:border-gray-500 border-gray-400 border border-r rounded-md px-2 text-lg"
        >
          Mint NFT
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default LockAndMint;
