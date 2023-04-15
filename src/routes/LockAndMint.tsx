import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../style/components-css/lockAndMint.css"
import axios from "axios";

const LockAndMint = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data: any) => {
    try {
      const url ="https://us-central1-oden-vote.cloudfunctions.net/users?email=" + data.email;
      const res = await axios.get(url);
      setUserInfo(res.data);
      setIsLogin(true);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const lockedCoinList = (lockedCoinArray: object[]) => {
    const count = lockedCoinArray.length;
    console.log(count);
    let lockedCoinList = [];
    for (let i = 0; i < count; i++) {
      const lockedCoin = lockedCoinArray[i];
      console.log(lockedCoin);
      lockedCoinList.push(
        Object.keys(lockedCoinArray[i]).map(key => ( !(key === "proof") &&
          <li key={key}>
            {key}: {lockedCoin[key]}
          </li>
        ))
      );
    }
    return lockedCoinList;
  };

  return (
    <div className="contents">
      {/* <div className="bg-black m-10 p-5 max-w-[1000px] h-[700px] mx-auto rounded-lg"> */}
      <div className="content-lockAndMint">
        { isLogin &&
          <div className="content-lockAndMint-top">
            <div className="lockAndMint-top-nav">
              <div className="lockAndMint-top-botton">
                <Link className="top-botton" to="/lock-and-mint/lock">
                    Lock your tokens
                </Link>
              </div>
              <div className="lockAndMint-top-botton">
                <Link className="top-botton" to="/lock-and-mint/mint">
                    Mint NFT
                </Link>
              </div>
            </div>
            <Outlet context={[isLogin, setIsLogin, userInfo, setUserInfo]} />
          </div>
        }
        { !userInfo &&
          <div className="content-lockAndMint-login">
            <p className="content-lockAndMint-login-title">Please login bitFlyer Account to lock your tokens</p>
            <form className="content-lockAndMint-login-form" onSubmit={handleSubmit(onSubmit)}>
              <input className="login-form-text" type="text" placeholder="email" {...register("email", {required: true})}/>
              <input className="login-form-text" type="text" placeholder="password" {...register("password", {required: true})}/>
              <button className="btn--orange"type="submit">Login</button>
            </form>
          </div>
        }
        { userInfo && 
          <div className="content-lockAndMint-users">
            <p>UserName: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <ul>
              {Object.keys(userInfo.balances).map(key => (
                <li key={key}>
                  {key}: {userInfo.balances[key]}
                </li>
              ))}
            </ul>
            {
              lockedCoinList(userInfo.lockedCoins)
            }
          </div>
        }
      </div>
    </div>
  );
};

export default LockAndMint;
