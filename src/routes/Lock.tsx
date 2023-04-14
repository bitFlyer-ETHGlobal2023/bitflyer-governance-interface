import React, { useEffect, useState } from "react";
import axios from "axios";

interface UnlockedTokensData {
  BTC: string;
  ETH: string;
  FLR: string;
  MONA: string;
  XYM: string;
}

const Lock = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [tokenDatam, setTokenData] = useState<UnlockedTokensData>();

  const handleLogin = async (email: string) => {
    const url =
      "https://us-central1-oden-vote.cloudfunctions.net/users?email=" + email;
    const res = await axios.get(url);
    console.log(res);
  };

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     setIsUserLoggedIn(true);
  //   }
  // }, []);

  return (
    <div>
      {" "}
      <div className="bg-black m-10 p-5 max-w-[700px] h-[500px] mx-auto rounded-lg">
        <p>Please login bitFlyer Account to lock your tokens</p>
        <form action="" className="p-5 flex flex-col">
          <div className="my-4">
            <label className="mr-10">Email: </label>
            <input />
          </div>
          <div className="my-4">
            <label className="mr-3">Password: </label>
            <input />
          </div>
          <div className="flex justify-center items-center">
            <div className="hover:border-gray-500 mr-5 border-gray-400 border border-r rounded-md px-2 text-lg">
              Login
            </div>
            <div className="hover:border-gray-500 border-gray-400 border border-r rounded-md px-2 text-lg">
              Sign up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Lock;
