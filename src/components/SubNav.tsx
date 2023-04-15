import React from "react";
import { Link } from "react-router-dom";

const SubNav = () => {
  return (
    <div className="lockAndMint-top-nav">
      <div className="lockAndMint-top-botton">
        <Link className="top-botton" to="/lock-and-mint">
          Account
        </Link>
      </div>
      <div className="lockAndMint-top-botton">
        <Link className="top-botton" to="/lock-and-mint/lock">
          Lock tokens
        </Link>
      </div>
      <div className="lockAndMint-top-botton">
        <Link className="top-botton" to="/lock-and-mint/mint">
          Mint NFT
        </Link>
      </div>
    </div>
  );
};

export default SubNav;
