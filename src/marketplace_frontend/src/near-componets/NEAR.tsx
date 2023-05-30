import React, { useEffect, useState } from "react";
import { initContract } from "../near-config/index";
import Big from "big.js";
import * as nearAPI from "near-api-js";

const NEAR = () => {
  const { utils } = nearAPI;
  const [user, setUser] = useState(null);
  const [configData, setConfig] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);

  const [metadata, setMetadata] = useState(null);
  const [tokenBal, setBal] = useState(null);

  const [newAcc, setNewAcc] = useState("");
  const [transferAcc, setTransferAcc] = useState("");
  const [transferAmnt, setTranferAmnt] = useState(null);

  const handleUser = (e) => {
    if (user && e.target.textContent === "Sign Out") {
      (function signOut() {
        wallet.signOut();
        window.location.replace(
          window.location.origin + window.location.pathname
        );
      })();
    } else if (!user && e.target.textContent === "Login") {
      (function signIn() {
        wallet.requestSignIn(configData.contractName, "NEAR Block Dice");
      })();
    }
  };

  const loadUserInfo = async () => {
    let bal = await contract.ft_balance_of({ account_id: user.accountId });
    if (bal > 0) {
      const formattedBal = bal / 1000000000000000000000000;
      setBal(formattedBal);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserInfo();
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const contractData = await initContract();
      setUser(contractData.currentUser);
      setConfig(contractData.nearConfig);
      setWallet(contractData.walletConnection);
      setContract(contractData.contract);
    }
    fetchData();
  }, []);

  const gas = Big(3)
    .times(10 ** 13)
    .toFixed();
  const oneYecto = Big(1)
    .times(10 ** 24)
    .toFixed();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newAcc != "") {
      try {
        const res = await contract.storage_deposit(
          { account_id: user.accountId },
          gas,
          "125"
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (transferAcc != "" && transferAmnt) {
      try {
        const amount = Big(transferAmnt)
          .times(10 ** 24)
          .toFixed();
        const res = await contract.ft_transfer(
          { receiver_id: transferAcc, amount: amount },
          gas,
          1
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleUser}>{user ? "Sign Out" : "Login"}</button>
      {user && <h1>Hello {user.accountId}</h1>}
      <hr />
      {tokenBal && (
        <h1>
          Your Tswaanda Token Balance is:{" "}
          <span className="font-bold">{tokenBal} TSWT</span>{" "}
        </h1>
      )}
      <hr />
      <div className="my-3">
        <h1>Register a user and send them some tokens</h1>
        <form onSubmit={handleRegister} className="flex gap-3">
          <input
            className="outline-none border rounded-none"
            value={newAcc}
            onChange={(e) => setNewAcc(e.target.value)}
            type="text"
            placeholder="User account"
          />
          <button
            type="submit"
            className="rounded-lg p-2 bg-green-600 text-white"
          >
            Register
          </button>
        </form>
      </div>
      <div className="my-5">
        <h1>Send tokens</h1>
        <form className="flex gap-3" onSubmit={handleTransfer}>
          <input
            type="text"
            className="outline-none border rounded-none"
            placeholder="User account"
            value={transferAcc}
            onChange={(e) => setTransferAcc(e.target.value)}
          />
          <input
            type="number"
            className="outline-none border rounded-none"
            placeholder="Enter amount"
            value={transferAmnt}
            onChange={(e) => setTranferAmnt(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg p-2 bg-green-600 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default NEAR;
