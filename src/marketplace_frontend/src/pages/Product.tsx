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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { toast } from "react-toastify";
import { adminBackendActor, backendActor } from "../hooks/config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [addingtocart, setAddingToCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [checking, setChecking] = useState(true);

  const getPrincipalId = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      setUserId(userPrincipal);
    } else {
      setChecking(false);
    }
  };

  const details = [
    {
      name: "Weighting",
      items: [`Total Weight: ${product?.weight} KG, Unit Weight: 20KG`],
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

  interface Response {
    err?: any;
    ok?: any;
  }

  useEffect(() => {
    if (id) {
      getPrincipalId();
      setLoading(true);
      const getProduct = async () => {
        const result: Response = await adminBackendActor.getProductById(id);
        if (result.ok) {
          setProduct(result.ok);
          setLoading(false);
        } else {
          console.log(result.err);
        }
      };
      getProduct();
    }
  }, [id]);

  const getCartItems = async () => {
    const res: Response = await backendActor.getMyCartItem(userId);
    if (res.ok) {
      setCartItem(res.ok)
    } else {
      setChecking(false)
    };
    setAddingToCart(false);
  };

  useEffect(() => {
    if (userId) {
      getCartItems();
    }
  }, [userId]);

  useEffect(() => {
    if (cartItem) {
      if (cartItem.id === id) {
        setInCart(true);
      }
      setChecking(false);
    }
  }, [cartItem]);

  const handleAddToCart = async () => {
   if (cartItem && !checking) {
    toast.warning("Sorry, you can only have one product in the cart at a time", {
      autoClose: 5000,
      position: "top-center",
      hideProgressBar: true,
    });
   } else {
    if (userId && id && !checking && !inCart) {
      setAddingToCart(true);
      const date = new Date();
      const timestamp = date.getTime();
      const cartItem = {
        id: id,
        quantity: 1,
        dateCreated: timestamp,
      };
      const res = await backendActor.addToCart(userId, cartItem);
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
   }
  };

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
                  {product?.images.map((image, index) => (
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
                {product?.images.map((image, index) => (
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
