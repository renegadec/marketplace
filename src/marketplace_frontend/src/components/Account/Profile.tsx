import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { backendActor } from "../../hooks/config";

const Profile = ({ activate }) => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  // update useStates
  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [isEditEmailMode, setIsEditEmailMode] = useState(false);
  const [isEditCompanyMode, setIsEditCompanyMode] = useState(false);
  const [isEditAboutMode, setIsEditAboutMode] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleFirstNameChange = (value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      firstName: value,
    }));
  };

  const handleLastNameChange = (value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      lastName: value,
    }));
  };

  const handleEmailChange = (value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      email: value,
    }));
  };

  const handleCompanyChange = (value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      organization: value,
    }));
  };

  const handleAboutChange = (value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      about: value,
    }));
  };

  const getPrincipalId = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      setUserId(userPrincipal);
    }
  };

  interface Response {
    err?: any;
    ok?: any;
  }

  const getCustomerInfo = async () => {
    setLoading(true);
    try {
      const res: Response = await backendActor.getKYCRequest(userId);
      if (res.ok) {
        setUserInfo(res.ok);
        setLoading(false);
      } else if (res.err) {
        setNoUser(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error here");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrincipalId();
  }, []);

  useEffect(() => {
    if (userId) {
      getCustomerInfo();
    }
  }, [userId]);

  const initProfileUpdate = async (field: string) => {
    setLoading(true);
    if (field === "first-last-name") {
      await updateProfile();
      setIsEditNameMode(false);
    } else if (field === "organization") {
      await updateProfile()
      setIsEditCompanyMode(false)
    } else if (field === "about") {
      await updateProfile()
      setIsEditAboutMode(false)
    }
  };

  const updateProfile = async () => {
    try {
      const res = await backendActor.updateKYCRequest(
        userInfo.userId,
        userInfo
      );
      console.log(res);
      toast.success("Profile Information updated", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error when updating user information", error);
    }
  };

  return (
    <>
      {userInfo && (
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Account Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div>
              <span className="inline-flex items-center rounded-md bg-red-200 px-2.5 py-0.5 text-sm font-medium text-red-500">
                <svg
                  className="-ml-0.5 mr-1.5 h-2 w-2 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Pending verification
              </span>
            </div>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <form action="">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 items-center flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {isEditNameMode ? (
                      <div className="flex gap-4">
                        <div>
                          <input
                            type="text"
                            value={userInfo.firstName}
                            onChange={(e) =>
                              handleFirstNameChange(e.target.value)
                            }
                            className="w-full/2 bg-transparent rounded-md border-0 py-1 pl-2 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          />
                          <span
                            className={`mt-1 text-red-600 text-xs" ${
                              userInfo.firstName ? `hidden` : `block`
                            }`}
                          >
                            First name is required
                          </span>
                        </div>
                        <div className="">
                          <input
                            type="text"
                            value={userInfo.lastName}
                            onChange={(e) =>
                              handleLastNameChange(e.target.value)
                            }
                            className="w-full/2 bg-transparent rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          />
                          <span
                            className={`mt-1 text-red-600 text-xs" ${
                              userInfo.lastName ? `hidden` : `block`
                            }`}
                          >
                            Last name is required
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="flex-grow">
                        {userInfo.firstName} {userInfo.lastName}
                      </span>
                    )}

                    <span className="ml-4 flex-shrink-0">
                      {isEditNameMode ? (
                        <>
                          <button
                            type="submit"
                            disabled={
                              !userInfo.firstName ||
                              !userInfo.lastName ||
                              loading
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              initProfileUpdate("first-last-name");
                            }}
                            className="rounded-md ml-5 px-3 font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditNameMode(true);
                          }}
                          className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Update
                        </button>
                      )}
                    </span>
                  </dd>
                </div>
              </form>
              {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Designation
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">Managing Director</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div> */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditEmailMode ? (
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={userInfo.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className="w-full bg-transparent rounded-md border-0 py-1 pl-2 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  ) : (
                    <span className="flex-grow">
                      <span className="flex-grow">{userInfo.email}</span>
                    </span>
                  )}

                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsEditEmailMode(!isEditEmailMode)}
                      className="rounded-md  font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {isEditEmailMode ? "Save" : "Update"}
                    </button>
                  </span>
                </dd>
              </div>
              <form action="">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Organization Name
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {isEditCompanyMode ? (
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={userInfo.organization}
                          onChange={(e) => handleCompanyChange(e.target.value)}
                          className="w-full bg-transparent rounded-md border-0 py-1 pl-2 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                        <span
                          className={`mt-1 text-red-600 text-xs" ${
                            userInfo.organization ? `hidden` : `block`
                          }`}
                        >
                          Organization name is required
                        </span>
                      </div>
                    ) : (
                      <span className="flex-grow">{userInfo.organization}</span>
                    )}
                    <span className="ml-4 flex-shrink-0">
                      {isEditCompanyMode ? (
                        <button
                          type="submit"
                          disabled={!userInfo.organization || loading}
                          onClick={(e) => {
                            e.preventDefault();
                            initProfileUpdate("organization");
                          }}
                          className="rounded-md ml-5 px-3 font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setIsEditCompanyMode(true)
                          } }
                          className="rounded-md  font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Update
                        </button>
                      )}
                    </span>
                  </dd>
                </div>
              </form>
              <form action="">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditAboutMode ? (
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={userInfo.about}
                        onChange={(e) => handleAboutChange(e.target.value)}
                        className="w-full bg-transparent rounded-md border-0 py-1 pl-2 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <span
                          className={`mt-1 text-red-600 text-xs" ${
                            userInfo.about ? `hidden` : `block`
                          }`}
                        >
                          About name is required
                        </span>
                    </div>
                  ) : (
                    <span className="flex-grow">{userInfo.about}</span>
                  )}
                  <span className="ml-4 flex-shrink-0">
                   {isEditAboutMode ?  <button
                      type="submit"
                      disabled={!userInfo.about || loading}
                      onClick={(e) => {
                        e.preventDefault()
                        initProfileUpdate("about")
                      }}
                      className="rounded-md ml-5 px-3 font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Save
                    </button> :  <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsEditAboutMode(true)
                      }}
                      className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                    Update
                    </button>}
                  </span>
                </dd>
              </div>
              </form>
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
                          {userInfo.firstName}-identiy.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                          className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md font-medium text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
        <div className="text-gray-600">
          Nothing to see yet! Lets get to know you... Complete your{" "}
          <button
            className="font-bold text-primary"
            onClick={() => activate("Account")}
          >
            account details.
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
