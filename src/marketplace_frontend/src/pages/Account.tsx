import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Button } from "../components";

import BillingAddress from "../components/BillingAddress";

import Orders from "../components/Orders";
import { Phone } from "react-telephone";
import { useNavigate } from "react-router-dom";
import styles from "../style";
import { useAuth } from "../hooks";
import Wallet from "../near-componets/Wallet";

const infoItems = [
  "Dashboard",
  "Orders",
  "Downloads",
  "Addresses",
  "Account details",
  "Wallet",
];

const Account = () => {
  const [activeInfo, setActiveInfo] = useState("Dashboard");
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { isLoggedIn } = useAuth(session, setSession);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const setAuth = async () => {
      if (await isLoggedIn()) {
        setSession(true);
      } else {
        setSession(false);
      }
    };
    setAuth();
  }, [isLoggedIn]);

  useEffect(() => {
    if (session == false) return navigate("/");
  }, [session]);

  const handleAddAddress = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="flex flex-col items-center md:p-8 pt-12 min-h-screen w-full overflow-x-hidden">
      {session && (
        <>
          <h1 className="font-semibold text-4xl mb-8">My Account</h1>
          <div className="flex flex-row items-center w-full">
            {infoItems.map((item, index) => (
              <button
                onClick={() => setActiveInfo(item)}
                className={`mr-9 border-b-2 pb-4 ${
                  item === activeInfo ? "border-black" : "border-transparent"
                }`}
                key={index}
              >
                <h3
                  className={`font-semibold text-lg ${
                    item === activeInfo ? "text-black" : "text-gray-600"
                  }`}
                >
                  {item}
                </h3>
              </button>
            ))}
          </div>
          <div className="flex  mt-8">
            {activeInfo === "Dashboard" && (
              <div className="flex flex-col">
                <p className={`${styles.paragraph} mt-5`}>
                  Hello James (not James?{" "}
                  <span className="text-primary">Log out</span>)
                </p>
                <p className={`${styles.paragraph} mt-5`}>
                  From your account dashboard you can view your{" "}
                  <span className="text-primary">recent orders</span>, manage
                  your{" "}
                  <span className="text-primary">
                    shipping and billing addresses
                  </span>
                  , and edit your
                  <span className="text-primary">
                    {" "}
                    password and account details
                  </span>
                  .
                </p>
              </div>
            )}
            {activeInfo === "Orders" && (
              <div className="flex flex-row justify-between w-[60vw] bg-gray-200 p-6 border-t-2 border-[#A18A68]">
                <Orders />
              </div>
            )}
            {activeInfo === "Downloads" && (
              <div className="flex flex-row justify-between w-[60vw] bg-gray-200 p-6 border-t-2 border-[#A18A68]">
                <p className={`${styles.paragraph}`}>
                  No downloads or documents available yet
                </p>
                <a href="/" className="uppercase text-primary">
                  Browse Product
                </a>
              </div>
            )}
            {activeInfo === "Addresses" && (
              <div className="flex flex-col">
                <p className={`${styles.paragraph}`}>
                  The following addresses will be used on the checkout page by
                  default.
                </p>
                <div className="flex flex-row w-[60vw] mt-6">
                  <div className="flex flex-col w-1/2 items-start">
                    <h3 className="font-semibold text-lg">
                      Billing & Shipping Address
                    </h3>
                    <button
                      className="text-primary font-semibold uppercase mt-8"
                      onClick={handleAddAddress}
                    >
                      Add
                    </button>
                    {isPopupOpen && (
                      <BillingAddress onClose={() => setIsPopupOpen(false)} />
                    )}
                    <p className="font-normal text-gray-600 mt-2">
                      You have not set up this type of address yet.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeInfo === "Account details" && (
              <div className="mt-6 md:w-[60vw]">
                <h1 className="text-primary text-2xl mb-6">Account details</h1>
                <input
                  type="text"
                  className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary"
                  placeholder="First name*"
                />
                <input
                  type="text"
                  className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary"
                  placeholder="Last name*"
                />
                <input
                  type="text"
                  className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-2 border-b-2 border-gray-400 focus:border-primary"
                  placeholder="Display name*"
                />
                <p className="text-gray-400 text-xs mb-6 w-[70vw] md:w-[40vw]">
                  This will be how your name will be displayed in the account
                  section and in reviews.
                </p>
                <Phone>
                  <Phone.Country className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary" />
                  <br />
                  <Phone.Number
                    className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary"
                    placeholder="Phone number*"
                  />
                </Phone>
                <input
                  type="text"
                  className="bg-transparent outline-none w-[70vw] md:w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary"
                  placeholder="Email address*"
                />

                <div className="w-[70vw] md:w-[40vw] mb-10 md:mt-40">
                  <Button
                    text="Save Changes"
                    width="full"
                    round="none"
                    handler={() => console.log()}
                  />
                </div>
              </div>
            )}
            {activeInfo === "Wallet" && <Wallet />}
          </div>
        </>
      )}
      {session == null && (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Account;
