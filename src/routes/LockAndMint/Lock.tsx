import { useOutletContext } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../../style/components-css/Lock.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const Lock = () => {
  const [isSucceed, setIsSucceed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const url = "https://us-central1-oden-vote.cloudfunctions.net/lockCoins";

      const lockCoinObject = {
        currency: data.currency,
        amount: data.amount,
        until: data.until,
        publicAddress: data.publicAddress,
        email: data.email,
      };

      const res = await axios.post(url, lockCoinObject);
      setIsSucceed(true);
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="contents-lock">
      <div className="content-lock">
        <p className="content-lock-p">Please set coin lock information</p>
        <form className="conten-lock-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-form-text"
            type="text"
            placeholder="currency"
            {...register("currency", { required: true })}
          />
          <input
            className="login-form-text"
            type="text"
            placeholder="amount"
            {...register("amount", { required: true })}
          />
          <input
            className="login-form-text"
            type="text"
            placeholder="until"
            {...register("until", { required: true })}
          />
          <input
            className="login-form-text"
            type="text"
            placeholder="publicAddress"
            {...register("publicAddress", { required: true })}
          />
          <input
            className="login-form-text"
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <button className="btn--orange" type="submit">
            Lock Coin
          </button>
        </form>
        {isSucceed && <p className="success-message">Succeed to lock coins!</p>}
      </div>
    </div>
  );
};

export default Lock;
