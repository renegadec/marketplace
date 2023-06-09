import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { canisterId, idlFactory } from "../../../declarations/marketplace_backend";
import Loader from "./Loader";
import { Actor, HttpAgent } from "@dfinity/agent";

const Features = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [loadedProducts, setLoaded] = useState(null);

  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

  interface Product {
    id: string;
    name: string;
    minOrder: number;
    additionalInformation: AdditionalInformation;
    shortDescription: string;
    category: string;
    fullDescription: string;
    price: number;
    image: string;
    images: {
      image1: string;
      image2: string;
      image3: string;
    };
  }

  interface AdditionalInformation {
    price: number;
    weight: number;
    availability: string;
  }

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const products = await backendActor.getProducts();
      setLoaded(products);
    } catch (e) {
      setLoading(false);
      console.log(e, "Error");
    }
  };

  useEffect(() => {
    if (loadedProducts) {
      const convertImage = (image: Uint8Array | number[]): string => {
        const imageContent = new Uint8Array(image);
        const blob = new Blob([imageContent.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
      };

      const productsWithUrl = loadedProducts.map((product) => ({
        ...product,
        image: convertImage(product.image),
        images: {
          image1: convertImage(product.images.image1),
          image2: convertImage(product.images.image2),
          image3: convertImage(product.images.image3),
        },
      }));
      setProducts(productsWithUrl);
      setLoading(false);
    }
  }, [loadedProducts]);

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center px-7 lg:px-28 pt-8 pb-10 h-[70vh]">
        <Loader />
      </div>
    );

  return (
    <section className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl mb-16 font-bold tracking-tight text-primary">
          Best Selling Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.slice(0, 3).map((product) => (
            <div className="group relative" key={product.id}>
              <div className="flex justify-center w-full lg:aspect-none lg:h-80">
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  type={product.name}
                  desc={product.shortDescription}
                  image={product.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
