import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { XMarkIcon as XMarkIconOutline } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { Beans, Brocoli, GroundNuts } from "../../assets/assets";
import {
  canisterId,
  idlFactory,
} from "../../../declarations/marketplace_backend";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Ground Nutties",
    href: "#",
    imageSrc: GroundNuts,
    imageAlt: "Ground nutties",
    price: "$118",
    color: "Natural",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShoppingCart() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cartRawProducts, setRawProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

  // Checks if the user is authenticated and then obtain the principal id
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

  const getCartProducts = async () => {
    const res = await backendActor.getMyCartItemsProducts(userId);
    setRawProducts(res);
  };

  // Converting the images bytes to data to blobs
  useEffect(() => {
    if (cartRawProducts) {
      const convertImage = (image: Uint8Array | number[]): string => {
        const imageContent = new Uint8Array(image);
        const blob = new Blob([imageContent.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
      };

      const productsWithUrl = cartRawProducts.map((product) => ({
        ...product,
        image: convertImage(product.image),
        images: {
          image1: convertImage(product.images.image1),
          image2: convertImage(product.images.image2),
          image3: convertImage(product.images.image3),
        },
      }));
      setProducts(productsWithUrl);
    }
  }, [cartRawProducts]);

  // Get the cart items only, not products
  const getCartItems = async () => {
    const res = await backendActor.getMyCartItems(userId);
    setCartItems(res);
  };

  useEffect(() => {
    if (userId) {
      getCartProducts();
      getCartItems();
    }
  }, [userId]);

  const handleRemove = async (id: String) => {
    const item = cartItems.find((item) => item.id === id);

    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);

    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);

    const itemToRemove = {
      id: item.id,
      dateCreated: item.dateCreated,
      quantity: BigInt(item.quantity),
    };
    const res = backendActor.removeFromCart(userId, itemToRemove);
  };

  // Order summary calculations
  const handleQuantityChange = async (e, id: String) => {
    const newQty = e.target.value;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQty,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    // const res = await backendActor.updateCartItem(userId, )
  };

  const [subtotal, setSubtotal] = useState(null);
  const [shippingEstimate, setShipEstimate] = useState(null);
  const [taxEstimate, setTax] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const shippingPercentage = 0.05;
  const taxPercentage = 0.1;

  useEffect(() => {
    if (products && cartItems) {
      setCalculating(true);
      let subtotal = 0;

      cartItems.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        if (product) {
          subtotal += Number(product.price) * Number(cartItem.quantity);
        }
      });
      setSubtotal(subtotal);
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (subtotal) {
      const shipping = subtotal * shippingPercentage;
      const tax = subtotal * taxPercentage;
      const total = subtotal + shipping + tax;

      setShipEstimate(shipping.toFixed(2));
      setTax(tax.toFixed(2));
      setOrderTotal(total.toFixed(2));
      setCalculating(false);
    }
  }, [subtotal]);

  function getCartItemQuantity(productId) {
    const cartItem = cartItems?.find((item) => item.id === productId);
    return cartItem ? Number(cartItem.quantity) : 0;
  }

  const createMyOrder = async () => {
    const date = new Date();
    const timestamp = date.getTime();
    const lastDigits = timestamp.toString().slice(-8)
    const randomLetters = generateRandomLetters(3)

    const orderProducts = cartItems?.map((cartItem) => {
      const product = cartRawProducts?.find((p) => p.id === cartItem.id);
  
      return {
        id: cartItem.id,
        name: product.name,
        description: product.fullDescription,
        image: product.image,
        quantity: BigInt(cartItem.quantity),
        price: parseFloat(product?.price),
      };
    });

    const convertedCartItems = cartItems?.map((cartItem) => {
      return {
        id: cartItem.id,
        quantity: BigInt(cartItem.quantity),
        dateCreated: cartItem.dateCreated,
      };
    });

    const order = {
      orderId: String(uuidv4()),
      orderNumber: `TSWA-${lastDigits}${randomLetters}`,
      orderProducts,
      orderOwner: userId,
      subtotal: parseFloat(subtotal),
      totalPrice: parseFloat(orderTotal),
      shippingEstimate: parseFloat(shippingEstimate),
      taxEstimate: parseFloat(taxEstimate),
      status: "pending",
      step: BigInt(0),
      dateCreated: BigInt(timestamp),
    };
    const res = await backendActor.createOrder(order)
    const result = await backendActor.removeBatchCartItems(userId , convertedCartItems )
    toast.success("Order have been successfully placed", {
      autoClose: 5000,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  function generateRandomLetters(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "text-indigo-600 border-indigo-600"
                                : "text-gray-900 border-transparent",
                              "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pt-10 pb-8"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {products?.length === 0 && (
              <div className="">
                <h1>Your cart is empty</h1>
              </div>
            )}
            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {products?.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <Link to={`../product/${product.id}`}>
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt="Product image"
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>
                  </Link>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              to={`../product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {product.size}
                            </p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          value={getCartItemQuantity(product.id)}
                          onChange={(e) => handleQuantityChange(e, product.id)}
                          className="max-w-full bg-white rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            onClick={() => handleRemove(product.id)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product?.inStock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product?.inStock
                          ? "In stock"
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal?.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${shippingEstimate}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${taxEstimate}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${orderTotal}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
              onClick={createMyOrder}
                className="w-full rounded-md border border-transparent bg-primary py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Place Order
              </button>
            </div>
          </section>
        </div>

        {/* Related products */}
        <section aria-labelledby="related-heading" className="mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-gray-900"
          >
            You may also like&hellip;
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={relatedProduct.imageSrc}
                    alt={relatedProduct.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={relatedProduct.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {relatedProduct.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}