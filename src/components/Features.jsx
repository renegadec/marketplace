import React from 'react'
import Product from './Product'
import { productsData } from '../constants'

const Features = (props) => {
    return (
        <section id='featured' className='px-[90px] py-[60px]'>
            <div>
                <h1 className='font-bold text-black text-3xl'>Featured Products</h1>
            </div>
            <div  className='box-border m-[70px] flex flex-row justify-center'>
                <Product products={productsData.product}/>
            </div>
        </section>
        
    )
}

export default Features