import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  canisterId,
  idlFactory,
  marketplace_backend,
} from "../../../../declarations/marketplace_backend";
import Loader from "../Loader";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

  const getPrincipalId = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      setUserId(userPrincipal);
    }
  };

  const getCustomerInfo = async () => {
    setLoading(true);
    try {
      const res = await marketplace_backend.getKYCRequest(userId);
      setResult(res);
    } catch (error) {
      console.log(error, "error here");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      setUserInfo(result.ok);
      if (result.err) {
        setNoUser(true);
      }
      setLoading(false);
    }
  }, [result]);

  useEffect(() => {
    getPrincipalId();
  }, []);

  useEffect(() => {
    if (userId) {
      getCustomerInfo();
    }
  }, [userId]);

  return (
    <>
      {userInfo && (
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Account Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {userInfo.firstName} {userInfo.lastName}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Designation
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">Managing Director</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{userInfo.email}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md  font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Organization Name
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{userInfo.organization}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md  font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{userInfo.about}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  KYC Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 w-0 flex-1 truncate">
                          jane-dhoro-identity.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 w-0 flex-1 truncate">
                          foodlovers-kyc.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center px-7 lg:px-28 pt-8 pb-10 h-[70vh]">
          <Loader />
        </div>
      )}
      {noUser && (
        <div className="">
            You do not have an account, please create an account
        </div>
      )}
    </>
  );
};

export default Profile;
