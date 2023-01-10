import React from 'react'
import ProductCard from './ProductCard/ProductCard'
import { productsData } from '../constants'

const Features = (props) => {
    return (

        <section id='featured' className='m-[70px] flex flex-col justify-center'>
            <div className='flex justify-center items-center flex-col pb-7'>
                <h1 className='text-3xl font-bold text-primary'>Featured Products</h1>
                <hr className='w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />
                <h3 className='text-2xl text-black'>These are the top performing products.</h3>
            </div>
            <div className="px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-12">
                {productsData['product'].slice(0, 3).map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={String(product.id - 1)}
                        type={product.type}
                        desc={product.desc}
                        image={product.image}
                    />
                ))}
            </div>
        </section>
    )
}

export default Features