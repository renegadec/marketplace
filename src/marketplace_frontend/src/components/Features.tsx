import React from 'react'
import ProductCard from './ProductCard/ProductCard'
import { productsData } from '../constants'

const Features = (props) => {
    return (
        <section className="">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl mb-16 font-bold tracking-tight text-primary">Best Selling Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {productsData['product'].slice(0, 3).map((product) => (
                        <div className='group relative' key={product.id}>
                            <div className='flex justify-center w-full lg:aspect-none lg:h-80'>
                                <ProductCard 
                                    key={product.id}
                                    id={String(product.id - 1)}
                                    type={product.type}
                                    desc={product.desc}
                                    image={product.image}
                                />
                            </div>
                        </div>       
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Features