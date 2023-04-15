import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../style/components-css/lockAndMint.css";
import SubNav from "../../components/SubNav";

interface UserInfoType {
  name: string;
  email: string;
  balances: {
    [key: string]: number;
  };
  lockedCoins: {
    [key: string]: string;
  }[];
}

const LockAndMint = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const url =
        "https://us-central1-oden-vote.cloudfunctions.net/users?email=" +
        data.email;
      const res = await axios.get(url);
      setUserInfo(res.data);
      setIsLogin(true);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="contents">
      <div className="content-lockAndMint">
        {isLogin ? (
          <div className="content-lockAndMint-top">
            <SubNav />
            <Outlet context={[userInfo, setUserInfo]} />
          </div>
        ) : (
          <div className="content-lockAndMint-login">
            <p className="content-lockAndMint-login-title">
              Please login bitFlyer Account to lock your tokens
            </p>
            <form
              className="content-lockAndMint-login-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="login-form-text"
                type="text"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <input
                className="login-form-text"
                type="text"
                placeholder="password"
                {...register("password", { required: true })}
              />
              <button className="btn--orange" type="submit">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LockAndMint;
