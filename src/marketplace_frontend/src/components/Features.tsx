import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { marketplace_backend } from "../../../declarations/marketplace_backend";
import Loader from "./Loader";
// import { productsData } from '../constants'

const Features = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  interface Product {
    id: number;
    name: string;
    minOrder: number;
    additionalInformation: AdditionalInformation;
    shortDescription: string;
    category: string;
    fullDescription: string;
    price: number;
    image: string;
    smallImages: {
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

  const getAllProducts = async (): Promise<Product[]> => {
    setLoading(true);
    try {
      const products = await marketplace_backend.getProducts();

      const convertImage = (image: Uint8Array | number[]): string => {
        const imageContent = new Uint8Array(image);
        const blob = new Blob([imageContent.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
      };

      const productsWithUrl = products.map((product) => ({
        ...product,
        image: convertImage(product.image),
        smallImages: {
          image1: convertImage(product.smallImages.image1),
          image2: convertImage(product.smallImages.image2),
          image3: convertImage(product.smallImages.image3),
        },
      }));
      setProducts(productsWithUrl);
      setLoading(false);
      return productsWithUrl;
    } catch (e) {
      setLoading(false);
      console.log(e, "Error");
    }
  };

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
                  id={product.id}
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
