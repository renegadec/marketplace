import React from 'react'
import Product from './Product'
import { productsData } from '../constants'

const Features = (props) => {
    return (

        <section id='featured' className='box-border m-[70px] flex flex-row justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <Product products={productsData.product.slice(0, 3)}/>
        </section>
    )
}

export default Features