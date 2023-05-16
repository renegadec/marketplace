import React from "react";
import { useState } from "react";
import SearchBar from "../components/Searchbar/Searchbar";
import Button from "../components/Button/Button";
import { ProductCard } from "../components";
import { productsData } from "../constants";

const categories = ["All", "Fruits", "Nuts", "Legumes", "Spices", "Vegetables"]

const Market = () => {
    const [activeCategory, setActiveCategory] = useState("All")

    const [products, setProducts] = useState(productsData['product']);
    const [filteredProducts, setFiltedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const [searchNotFound, setSearchNotFound] = useState(false);

    const handleSearch = (query) => {
      setSearchQuery(query);

      const filtered = products.filter((product) => 
        product.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length === 0) {
        setSearchNotFound(true);
      } else {
        setSearchNotFound(false)
        
      }
      setFiltedProducts(filtered);
    }
    return (
        <div className="flex flex-col place-items-center p-8 pt-12 min-h-screen w-full">
          <SearchBar onSearch={handleSearch} />

          <div className="hidden xl:flex flex-row w-full justify-around px-28 pt-12">
            {categories.map((category) => (
              <Button
                key={category}
                text={category}
                handler={() => setActiveCategory(category)}
                variant={category === activeCategory ? 'primary' : 'secondary'}
                size="large" />
            ))}
          </div>
            <div className="flex w-full place-items-start pt-8 lg:px-36">
              <h3>
                Showing {searchQuery ? `${filteredProducts.length} Results` : `All ${productsData['product'].length} Results`}
              </h3>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-5 lg:grid-cols-3 pt-12">
            {searchNotFound ? (
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
            ) : (
              filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 6).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={String(product.id - 1)}
                    type={product.type}
                    desc={product.desc}
                    image={product.image}
                  />
                ))
                ) : (
                  products.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      id={String(product.id - 1)}
                      type={product.type}
                      desc={product.desc}
                      image={product.image}
                    />
                  ))
                )
            )}
          </div>
          {!searchNotFound && (
            <div className="flex w-full lg:px-36">
              <div className="flex bg-primary rounded-[12px] w-full py-8 justify-center items-center">
                <h3 className="md:text-2xl text-white font-extrabold px-3 text-center">
                  Create an account now and get 20% <span className="text-yellow-200">discount</span> on first purchase!
                </h3>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-5 lg:grid-cols-3 pt-12">
            {searchNotFound ? (
              null
            ) : (
              filteredProducts.length > 0 ? (
                filteredProducts.slice(6).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={String(product.id - 1)}
                    type={product.type}
                    desc={product.desc}
                    image={product.image}
                  />
                ))
                ) : (
                  products.slice(6).map((product) => (
                    <ProductCard
                      key={product.id}
                      id={String(product.id - 1)}
                      type={product.type}
                      desc={product.desc}
                      image={product.image}
                    />
                  ))
                )
            )}
          </div>
        </div>
    )
  }

export default Market
