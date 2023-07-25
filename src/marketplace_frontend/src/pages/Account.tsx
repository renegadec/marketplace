import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Profile from '../components/Account/Profile';
import Wallet from "../components/Wallet";
import Billing from '../components/Account/Billing';

import Notifications from "../components/Account/Notifications";
import KYC from "../components/Account/KYC";

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon },
  { name: "Account", icon: CogIcon },
  { name: "Security", icon: KeyIcon },
  { name: "Notifications", icon: BellIcon },
  { name: "Plan & Billing", icon: CreditCardIcon },
  { name: "Integrations", icon: SquaresPlusIcon },
];

const payments = [
  {
    id: 1,
    date: "1/1/2023",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Account() {
  const [activeInfo, setActiveInfo] = useState("Profile");
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const setAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        setSession(true);
      } else {
        setSession(false);
      }
    };
    setAuth();
  }, []);

  useEffect(() => {
    if (session === false) {
      setSession(false);
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <>
      {session && (
        <div className="h-full">
          <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveInfo(item.name)}
                      className={classNames(
                        item.name === activeInfo
                          ? "bg-gray-50 text-primary hover:bg-white"
                          : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                        "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                      )}
                      aria-current={
                        item.name === activeInfo ? "page" : undefined
                      }
                    >
                      <item.icon
                        className={classNames(
                          item.name === activeInfo
                            ? "text-primary"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Profile */}
              {activeInfo === "Profile" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <Profile activate={setActiveInfo} />
                </div>
              )}

              {/* Account */}
              {activeInfo === "Account" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <KYC />
                </div>
              )}

              {/* Security */}
              {activeInfo === "Security" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <h3 className="flex justify-center items-center">
                    Coming Soon
                  </h3>
                </div>
              )}

              {/* Notifications */}
              {activeInfo === "Notifications" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <Notifications />
                </div>
              )}

              {/* Plan & Billing */}
              {activeInfo === "Plan & Billing" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <Billing />
                </div>
              )}

              {/* Integrations */}
              {activeInfo === "Integrations" && (
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <Wallet />
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {session == null && (
        <div className="">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
