import React from 'react'
import Product from './Product'
import { productsData } from '../constants'

const Features = (props) => {
    return (
        <section id='featured' className='box-border m-[70px] flex flex-row justify-center'>
            <Product products={productsData.product}/>
        </section>
    )
}

export default Features