import { useOutletContext } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Lock = () => {
  // const { userInfo } = useOutletContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data: any) => {
    try {
      const url ="https://us-central1-oden-vote.cloudfunctions.net/lockCoins";

      const lockCoinObject =   {
        currency: data.currency,
        amount: data.amount,
        until: data.until,
        publicAddress: data.publicAddress,
        email: data.email
      }

      const res = await axios.post(url, lockCoinObject);
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="bg-black m-10 p-5 max-w-[700px] h-[500px] mx-auto rounded-lg">
        <div>
          <p>Please set coin lock information</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="currency" {...register("currency", {required: true})}/>
            <input type="text" placeholder="amount" {...register("amount", {required: true})}/>
            <input type="text" placeholder="until" {...register("until", {required: true})}/>
            <input type="text" placeholder="publicAddress" {...register("publicAddress", {required: true})}/>
            <input type="text" placeholder="email" {...register("email", {required: true})}/>
            <button type="submit">Lock Coin</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lock;
