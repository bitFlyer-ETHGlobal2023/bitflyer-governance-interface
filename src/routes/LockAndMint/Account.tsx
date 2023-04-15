import React from "react";
import { useOutletContext } from "react-router-dom";

const Account = () => {
  const [userInfo] = useOutletContext();

  const lockedCoinList = (lockedCoinArray: object[]) => {
    const count = lockedCoinArray.length;
    console.log(count);
    let lockedCoinList = [];
    for (let i = 0; i < count; i++) {
      const lockedCoin = lockedCoinArray[i];
      console.log(lockedCoin);
      lockedCoinList.push(
        Object.keys(lockedCoinArray[i]).map(
          (key) =>
            !(key === "proof") && (
              <li key={key}>
                {key}: {lockedCoin[key]}
              </li>
            )
        )
      );
    }
    return lockedCoinList;
  };
  return (
    <div>
      {userInfo && (
        <div className="content-lockAndMint-users">
          <p className="users-text">UserName:</p>
          <p className="users-text-small">{userInfo.name}</p>
          <p className="users-text">Email:</p>
          <p className="users-text-small">{userInfo.email}</p>
          <p className="users-text">Balances</p>
          <ul className="users-ul">
            {Object.keys(userInfo.balances).map((key) => (
              <li className="users-list" key={key}>
                {key}: {userInfo.balances[key]} {key}
              </li>
            ))}
          </ul>
          <p className="users-text">Locked coins</p>
          {lockedCoinList(userInfo.lockedCoins)}
        </div>
      )}
    </div>
  );
};

export default Account;
