import { useEffect, useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { idlFactory } from "../../../declarations/tswaanda_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  canisterId,
  idlFactory as marketIdl,
} from "../../../declarations/marketplace_backend";
import { AuthClient } from "@dfinity/auth-client";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const navigate = useNavigate();
  const [productItem, setProductItem] = useState(null);
  const [product, setProduct] = useState(null);
  const [result, setRes] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [addingtocart, setAddingToCart] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [checking, setChecking] = useState(false);

  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });
  const dashId = "56r5t-tqaaa-aaaal-qb4gq-cai"

  const dashboardActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: dashId,
  });

  const marketActor = Actor.createActor(marketIdl, {
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

  useEffect(() => {
    getPrincipalId();
  }, []);

  const details = [
    {
      name: "Weighting",
      items: [
        `Total Weight: ${product?.additionalInformation.weight} KG, Unit Weight: 20KG`,
      ],
    },
    {
      name: "Reviews",
      items: ["Great product"],
    },
    {
      name: "Shipping",
      items: [
        "Shipping will be initiated on down payments",
        "Available for shipping to SA, AU, EU",
      ],
    },
  ];

  useEffect(() => {
    if (id) {
      setChecking(true);
      setLoading(true);
      const getProduct = async () => {
        const result = await dashboardActor.getProductById(id);
        setRes(result);
      };
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    if (result) {
      setProductItem(result.ok);
    }
  }, [result]);

  useEffect(() => {
    if (productItem) {
      const convertImage = (image: Uint8Array | number[]): string => {
        const imageContent = new Uint8Array(image);
        const blob = new Blob([imageContent.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
      };

      const productWithUrl = {
        ...productItem,
        image: convertImage(productItem.image),
        images: {
          image1: convertImage(productItem.images.image1),
          image2: convertImage(productItem.images.image2),
          image3: convertImage(productItem.images.image3),
        },
      };
      if (productWithUrl) {
        const mainImage = productWithUrl.image;
        const image1 = productWithUrl.images.image1;
        const image2 = productWithUrl.images.image2;
        const image3 = productWithUrl.images.image3;

        const updatedImages = [mainImage, image1, image2, image3];
        setImages(updatedImages);
      }
      setProduct(productWithUrl);
      setLoading(false);
    }
  }, [productItem]);

  const getCartItems = async () => {
    const res = await marketActor.getMyCartItems(userId);
    setCartItems(res);
    setAddingToCart(false);
  };

  useEffect(() => {
    if (userId) {
      getCartItems();
    }
  }, [userId]);

  useEffect(() => {
    if (cartItems) {
      const item = cartItems.find((item) => item.id === id);
      if (item) {
        setInCart(true);
      }
      setChecking(false);
    }
  }, [cartItems]);

  const handleAddToCart = async () => {
    if (userId && id && !checking && !inCart) {
      setAddingToCart(true);
      const date = new Date();
      const timestamp = date.getTime();
      const cartItem = {
        id: id,
        quantity: 1,
        dateCreated: timestamp,
      };
      const res = await marketActor.addToCart(userId, cartItem);
      getCartItems();
    } else if (userId === null) {
      toast.warning("You are not logged in", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      console.log("Checking");
    }
  };

  console.log("Adding to cart", addingtocart)

  const handleGoToCart = () => {
    navigate("/shopping-cart");
  };

  return (
    <div className="bg-white">
      {!loading && (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {images?.map((image, index) => (
                    <Tab
                      key={index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {images?.map((image, index) => (
                  <Tab.Panel key={index}>
                    <img
                      src={image}
                      alt="product image"
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product?.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  $ {product?.price}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product?.rating > rating
                            ? "text-primary"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">4 out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product?.fullDescription }}
                />
              </div>

              <div className="mt-6">
                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    onClick={!inCart && !checking ? handleAddToCart : null}
                    disabled={addingtocart}
                    className="flex max-w-xs gap-3 flex-1 items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    {inCart && <CheckIcon className="h-7 w-10" />}
                    {addingtocart ? (
                      <span>Adding to cart....</span>
                    ) : (
                      <span>
                        {inCart ? "Added to tswaanda" : "Add to tswaanda"}
                      </span>
                    )}
                    {/* <ShoppingCartIcon  className="h-7 w-10"/> */}
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
                {inCart && (
                  <div className="sm:flex-col1 mt-3 flex">
                    <button
                      onClick={handleGoToCart}
                      className="flex max-w-xs gap-3 flex-1 items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      <span> Go to Cart</span>
                    </button>
                  </div>
                )}
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="h-screen">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
