import React from "react";
import {  Like } from "../assets"
import { styled } from "@mui/material/styles";
import { productsData } from "../constants";

const Product = (props) => {
    const products = props.products.map((product) => {
        return (
            <div key={product.id} className="flex relative bg-productBg w-[384px] h-[535px] justify-start items-start p-0 box-border rounded-[12px] mx-6">
                <div className="flex absolute isolate flex-col justify-start items-start p-0 box-border left-0 top-0">
                    <img
                        src={product.image}
                        loading="lazy"
                        alt={product.type}
                        className="h-[286px] w-[361px] object-cover m-0"
                    />
                </div>
                <div className="flex absolute flex-col justify-start items-start p-0 border-box left-[35px] mt-[315px]">
                    <h1 className="text-left whitespace-pre-wrap text-black font-bold text-[32px] leading-none m-0">
                        {product.type}
                    </h1>
                    <h3 className="text-left text-gray-500 font-bold text-[20px] leading-none m-0 mt-5">
                        {product.desc}
                    </h3>
                </div>
                <div className="flex absolute isolate flex-row justify-start items-start p-0 box-border left-[298px] top-[446px]">
                    <div className="flex relative isolate flex-row justify-start items-start p-0 box-border w-[53px] h-[54px] m-0">
                        <img 
                            src={Like} 
                            loading="lazy" 
                            alt={"Vector"} 
                        />
                    </div>
                </div>
                <button className="bg-primary rounded-[12px] flex absolute isolate flex-row justify-start items-start p-[15px] font-bold text-black text-2xl box-border left-[37px] top-[443px]">
                    View Deal
                </button>
            </div>
        );
    });

    return <div className="flex justify-between">{products}</div>
    
}

export default Product;
