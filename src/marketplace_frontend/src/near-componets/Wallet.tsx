import React, { useEffect, useState } from "react";
import { initContract } from "../near-config/index";
import Big from "big.js";
import { toast } from "react-toastify";
import { transfer } from "near-api-js/lib/transaction";

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [configData, setConfig] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [usdval, setUSDVal] = useState(null);

  const [draw, setDraw] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [metadata, setMetadata] = useState(null);
  const [tokenBal, setBal] = useState(null);

  const [newAcc, setNewAcc] = useState("");
  const [register, setRegister] = useState(true);

  const [transferAcc, setTransferAcc] = useState("");
  const [transferAmnt, setTranferAmnt] = useState(null);
  const [memo, setMemo] = useState("");
  const [transfer, setTransfer] = useState(true);

  const handleUser = (e) => {
    if (user && e.target.textContent === "Remove Wallet") {
      (function signOut() {
        wallet.signOut();
        window.location.replace(
          window.location.origin + window.location.pathname
        );
      })();
    } else if (!user && e.target.textContent === "Connect NEAR Wallet") {
      (function signIn() {
        wallet.requestSignIn(configData.contractName, "Wallet Block Dice");
      })();
    }
  };

  const loadUserInfo = async () => {
    let bal = await contract.ft_balance_of({ account_id: user.accountId });
    if (bal > 0) {
      const formattedBal = bal / 1000000000000000000000000;
      const roundedBal = formattedBal.toFixed(2);
      setUSDVal(roundedBal);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newAcc != "") {
      try {
        const result = await contract.storage_deposit(
          { account_id: newAcc },
          gas,
          "1250000000000000000000"
        );
        console.log(result);
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
          { receiver_id: transferAcc, amount: amount, memo: memo },
          gas,
          1
        );
        toast.success("Transfer successful", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
        console.log("this is the res", res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleWithdrawToken = async (e) => {
    e.preventDefault();
    toast.success(
      `${withdrawAmount} TSWT tokens have been successfully withdrawn into your bank account`,
      {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      }
    );
    setDraw(true);
    setWithdrawAmount("");
  };
  const handleDrawCancel = () => {
    setWithdrawAmount("");
    setDraw(true);
  };
  const handleCancelTransfer = () => {
    setTransfer(true);
    setTranferAmnt(null);
    setTransferAcc("");
    setMemo("");
  };

  const handleCancelRegister = () => {
    setNewAcc("");
    setRegister(true);
  };

  return (
    <div>
      {!user && (
        <div className="flex flex-col md:min-h-[200px] justify-center">
          <button
            className="inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary"
            onClick={handleUser}
          >
            Connect NEAR Wallet
          </button>
        </div>
      )}

      {user && (
        <div className="md:min-w-[600px]">
          <div className="border rounded-lg p-2 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">@{user.accountId}</h3>
              <div className=" flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src="./tokenlogo.jpg"
                  alt="token logo"
                />
                <h3 className="font-semibold text-lg text-gray-600">
                  Tswaanda Token
                </h3>
              </div>
            </div>
            <div className="pt-5 flex justify-between items-center">
              <div className="">
                <h3 className="font-bold">
                  <span className="text-2xl">{tokenBal}</span> TSWT
                </h3>
                <h3 className="font-bold text-lg text-gray-600">
                  ≈ {usdval} USD
                </h3>
              </div>
              <button onClick={handleUser} className="hover:cursor-pointer px-4 py-1.5 font-semibold leading-7 border border-gray-600 rounded-lg hover:border-primary">
                Remove Wallet
              </button>
            </div>
          </div>

          <div className="border mt-5 rounded-lg p-2 bg-white">
            <div className="flex justify-between items-center ">
              <h3 className="font-bold">Send tokens to someone</h3>
              <button
                onClick={() => setTransfer(false)}
                className={` ${
                  transfer ? `block` : `hidden`
                } inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary`}
              >
                Transfer
              </button>
            </div>
            <form
              hidden={transfer}
              className="gap-3 mt-3"
              onSubmit={handleTransfer}
            >
              <div className="flex flex-col">
                <h3 className="font-semibold">Reciever</h3>
                <input
                  type="text"
                  className="outline-none border py-5 px-2 my-2 border-primary rounded-lg"
                  placeholder="Enter the wallet ID e.g john.testnet"
                  value={transferAcc}
                  onChange={(e) => setTransferAcc(e.target.value)}
                />
                <h3 className="font-semibold">Amount</h3>
                <input
                  type="number"
                  className="outline-none border py-5 px-2 my-2 border-primary rounded-lg"
                  placeholder="Enter amount e.g 3.5"
                  value={transferAmnt}
                  onChange={(e) => setTranferAmnt(e.target.value)}
                />
                <h3 className="font-semibold mt-3">
                  Memo (Optional){" "}
                  <span className="font-normal">What are the tokens for?</span>
                </h3>
                <input
                  type="text"
                  className="outline-none border py-5 px-2 my-2 border-primary rounded-lg"
                  placeholder="Enter the memo e.g Happy birthday Tapiwa"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
                <div className="flex justify-center items-center gap-3 pt-3">
                  <h3
                    onClick={handleCancelTransfer}
                    className="hover:cursor-pointer px-4 py-1.5 font-semibold leading-7 border border-gray-600 rounded-lg hover:border-primary"
                  >
                    Cancel
                  </h3>
                  <button
                    className="inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white mt-5 p-2 rounded-lg border">
            <div className="flex justify-between items-center ">
              <h3 className="font-semibold">Withdraw tokens to your bank</h3>
              <button
                onClick={() => setDraw(false)}
                className={` ${
                  draw ? `block` : `hidden`
                } inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary`}
              >
                Withdraw
              </button>
            </div>
            <form hidden={draw} onSubmit={handleWithdrawToken} className="py-2">
              <h3>Enter the amount of TSWT tokens you wish to withdraw</h3>
              <input
                type="number"
                value={withdrawAmount}
                className="outline-none border w-full py-5 px-2 my-2 border-primary rounded-lg"
                placeholder="Amount e.g 2.5"
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <div className="flex justify-center items-center gap-3 pt-3">
                <h3
                  onClick={handleDrawCancel}
                  className="hover:cursor-pointer px-4 py-1.5 font-semibold leading-7 border border-gray-600 rounded-lg hover:border-primary"
                >
                  Cancel
                </h3>
                <button
                  className="inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white mt-5 p-2 rounded-lg border">
            <div className="flex gap-5 justify-between items-center ">
              <div className="max-w-[600px]">
                <h3 className="">
                  Want to send some Tswaanda tokens to someone who is not a
                  Tswaanda customer? Register them here at a small storage fee
                  of only 0.00125 NEAR, less than $0.01 USD.{" "}
                  <span className="underline">Find out more</span>
                </h3>
              </div>
              <button
                onClick={() => setRegister(false)}
                className={` ${
                  register ? `block` : `hidden`
                } inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary`}
              >
                Register
              </button>
            </div>
            <form
              hidden={register}
              onSubmit={handleRegister}
              className=" gap-3"
            >
              <div className="flex flex-col">
                <input
                  className="outline-none border w-full py-5 px-2 my-2 border-primary rounded-lg"
                  value={newAcc}
                  onChange={(e) => setNewAcc(e.target.value)}
                  type="text"
                  placeholder="User account"
                />
                <div className="flex justify-center items-center gap-3 pt-3">
                  <h3
                    onClick={handleCancelRegister}
                    className="hover:cursor-pointer px-4 py-1.5 font-semibold leading-7 border border-gray-600 rounded-lg hover:border-primary"
                  >
                    Cancel
                  </h3>
                  <button
                    className="inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white hover:text-primary shadow-sm ring-1 ring-primary hover:bg-white hover:ring-primary"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
