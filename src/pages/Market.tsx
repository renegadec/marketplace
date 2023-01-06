import { useState } from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import Button from "../components/Button/Button";
import { ProductCard } from "../components";
import { productsData } from "../constants";

const categories = ["All", "Fruits", "Nuts", "Legumes", "Spices"]

const Market = () => {
    const [activeCategory, setActiveCategory] = useState("All")
    return (
        <div className="flex flex-col place-items-center p-8 pt-12 min-h-screen w-full font-mont">
          <Searchbar />
          <div className="hidden xl:flex flex-row w-full justify-around px-28 pt-12">
            {categories.map((catgeory) => (
              <Button 
                text={catgeory}
                handler={() => setActiveCategory(catgeory)}
                variant={catgeory === activeCategory ? 'primary' : 'secondary'}
                size="large" />
            ))}
          </div>
          <div className="flex w-full place-items-start pt-8 lg:px-36">
              <h3>Showing All {productsData['product'].length} Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {productsData['product'].slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id}
                type={product.type}
                desc={product.desc}
                image={product.image}
              />
            ))}
          </div>
          <div className="flex w-full lg:px-36">
            <div className="flex bg-primary rounded-[12px] w-full py-8 justify-center items-center">
              <h3 className="text-2xl text-white font-extrabold">
                Create an account now and get 20% <span className="text-yellow-200">discount</span> on first purchase!
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {productsData['product'].slice(6).map((product) => (
              <ProductCard 
                type={product.type}
                desc={product.desc}
                image={product.image}
              />
            ))}
          </div>
        </div>
    )
  }

export default Market
