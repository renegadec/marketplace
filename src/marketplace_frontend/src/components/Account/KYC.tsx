import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthClient } from "@dfinity/auth-client";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { backendActor } from "../../hooks/config";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { uploadFile } from "../../storage-config/functions";
import { useDropzone } from "react-dropzone";
import { countryListAllIsoData } from "../../constants";
import Loader from "../Loader";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  username: string;
  firstName: string;
  lastName: string;
  about: string;
  organization: string;
  email: string;
  country: string;
  province: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  photoPhoto: File;
  kycID: File;
  proofOfAddress: File;
};

export default function KYC() {
  const { storageInitiated } = useSelector((state: RootState) => state.global);

  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const schema = z.object({
    username: z.string().min(3).max(3),
    firstName: z.string().min(3).max(3),
    lastName: z.string().min(3).max(3),
    about: z.string().min(20).max(500),
    organization: z.string().min(3).max(3),
    email: z.string().email(),
    country: z.string().min(3).max(3),
    province: z.string().min(3).max(3),
    phone: z.string().min(10).max(20),
    address: z.string().min(3).max(3),
    city: z.string().min(3).max(3),
    zipCode: z.string().min(5).max(3),
    photoPhoto: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
    kycID: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
    proofOfAddress: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  });

  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [organization, setOrg] = useState("");
  const [zipcode, setZip] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setPP] = useState(null);
  const [kycID, setKYCID] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);

  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const getPrincipalId = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      setUserId(userPrincipal);
    }
  };

  useEffect(() => {
    getPrincipalId();
  }, []);

  const handleSave = async (data) => {

   console.log("It's working", data)
    // if (saving) {
    //   console.log("Very busy for now");
    // } else {
    //   setSaving(true);
    //   const date = new Date();
    //   const timestamp = date.getTime();

    //   const profilePhotoUrl = await uploadAsset(profilePhoto);
    //   console.log("profilePhoto saved", profilePhotoUrl);

    //   setStep(2);

    //   const kycIDUrl = await uploadAsset(kycID);
    //   console.log("kyc id saved", kycIDUrl);

    //   setStep(3);

    //   const proofOfAddressUrl = await uploadAsset(proofOfAddress);
    //   console.log("proof of Address saved", proofOfAddressUrl);

    //   const kycRequest = {
    //     id: String(uuidv4()),
    //     userId: userId,
    //     userName: username,
    //     firstName: firstName,
    //     lastName: lastName,
    //     about: about,
    //     email: email,
    //     organization: organization,
    //     country: country,
    //     streetAdrees: streetAddress,
    //     city: city,
    //     province: province,
    //     zipCode: BigInt(zipcode),
    //     phoneNumber: BigInt(phone),
    //     profilePhoto: profilePhotoUrl,
    //     kycIDCopy: kycIDUrl,
    //     proofOfAddressCopy: proofOfAddressUrl,
    //     status: "pending",
    //     dateCreated: BigInt(timestamp),
    //   };

    //   const res = await backendActor.createKYCRequest(kycRequest);

    //   if (res === true) {
    //     setShow(true);
    //   } else {
    //     setShow(false);
    //   }
    //   setSaving(false);
    //   window.location.reload();
    // }
  };

  const uploadAsset = async (file) => {
    if (storageInitiated) {
      const file_path = location.pathname;
      try {
        const assetUrl = await uploadFile(file, file_path);
        console.log("This file was successfully uploaded:", file.name);
        return assetUrl;
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
    }
  };

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (saving) {
      handleScrollToTop();
    }
  }, [saving]);

  // ------------------------------------FILE DRAGE AND DROP--------------------------------------------------------
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPP(acceptedFiles);
    },
  });

  return (
    <>
      {saving && (
        <div className="flex flex-col gap-5 justify-center items-center px-7 lg:px-28 pt-8 pb-10 h-[70vh]">
          <h1 className="text-xl text-gray-500">
            We're saving your information. It should be done in under a minute.
            Thank you for your patience.
          </h1>
          <h1 className="text-lg text-gray-500 mt-3">
            Step <span className="text-gray-700">{step}</span> of{" "}
            <span className="text-gray-700">3</span>:{" "}
            <span className="block">
              {step === 1 && "Saving your data…"}
              {step === 2 &&
                "Processing your request. Thanks for your patience."}
              {step === 3 && "Finalizing. Almost there. :)"}
            </span>
          </h1>

          <Loader />
        </div>
      )}
      {!saving && (
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Company Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        tswaanda.com/
                      </span>
                      <input
                        required
                        {...register("username")}
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="foodlovers"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={3}
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about company.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Photo
                  </label>

                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <label className="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <span>Change</span>
                      <input
                        required
                        {...register("profilePhoto")}
                        id="profile-photo-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(e) => setPP(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {profilePhoto && (
                    <>
                      <span>File attached:</span>{" "}
                      <span>{profilePhoto.name}</span>
                    </>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="kyc-di"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    National ID Copy
                  </label>

                  <div className="mt-2 flex items-center gap-x-3">
                    <label className="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <span>Upload file</span>
                      <input
                        required
                        {...register("kycID")}
                        id="kyc-id"
                        name="file-upload"
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(e) => setKYCID(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {kycID && (
                    <>
                      <span>File attached:</span> <span>{kycID.name}</span>
                    </>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="proof-of-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Proof of Address Copy
                  </label>

                  <div className="mt-2 flex items-center gap-x-3">
                    <label className="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <span>Upload file</span>
                      <input
                        required
                        {...register("proofOfAddress")}
                        id="proof-of-address"
                        name="file-upload"
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(e) => setProofOfAddress(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {proofOfAddress && (
                    <>
                      <span>File attached:</span>{" "}
                      <span>{proofOfAddress.name}</span>
                    </>
                  )}
                </div>

                {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                KYC Documents{" "}
                <span className="text-xs leading-5 text-gray-600">
                  (ID & Proof of Address)
                </span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-secondary"
                    >
                      <span>Upload a file</span>
                      <input
                      required
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={(e) => setCP(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, PDF up to 10MB
                  </p>
                  {coverPhoto && (
                    <>
                      <span>File attached:</span> <span>{coverPhoto.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div> */}
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("firstName")}
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <span className="error-message">Name is required</span>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("lastName")}
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastname(e.target.value)}
                      autoComplete="family-name"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("email")}
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Organization name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("organization")}
                      id="organization"
                      name="organization"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrg(e.target.value)}
                      autoComplete="organization"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="phone"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {countryListAllIsoData.map((country, index) => (
                        <option key={index}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("streetAddress")}
                      type="text"
                      name="street-address"
                      id="street-address"
                      value={streetAddress}
                      onChange={(e) => setStreet(e.target.value)}
                      autoComplete="street-address"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("city")}
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="address-level2"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("province")}
                      type="text"
                      name="region"
                      id="region"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      autoComplete="address-level1"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      {...register("zipCode")}
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={zipcode}
                      onChange={(e) => setZip(e.target.value)}
                      autoComplete="postal-code"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Save
            </button>
          </div>

          <>
            <div
              aria-live="assertive"
              className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
              <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                  show={show}
                  as={Fragment}
                  enter="transform ease-out duration-300 transition"
                  enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                  enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                          <p className="text-sm font-medium text-gray-900">
                            Successfully saved!
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            If you wish to update, use profile tab
                          </p>
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                          <button
                            type="button"
                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              setShow(false);
                            }}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </>
        </form>
      )}
    </>
  );
}
