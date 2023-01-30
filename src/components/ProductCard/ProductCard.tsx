import React from "react";
import { Like } from "../../assets"
import { Link } from "react-router-dom";

interface ProductProps {
    id: string,
    image: string,
    type: string,
    desc: string
}

const ProductCard = ({ 
    id,
    image,
    type,
    desc
}: ProductProps) => {

    return (
        <div className="flex flex-col relative bg-productBg w-64 lg:w-72 h-80 justify-start items-center p-0 px-8 box-border rounded-[12px] md:mx-8 mb-14">
            <div className="absolute -top-8 w-60">
                <div className="flex flex-col w-full items-center isolate p-0 box-border">
                    <img
                        src={image}
                        loading="lazy"
                        alt={type}
                        className="h-40 w-52 m-0"
                    />
                </div>
                <div className="flex flex-col justify-start items-start p-0 px-6 lg:px-0 border-box mt-4">
                    <h1 className="text-left whitespace-pre-wrap font-semibold text-primary text-2xl leading-none m-0">
                        {type}
                    </h1>
                    <h3 className="text-left text-black font-light font-xs text leading-none m-0 mt-2">
                        {desc}
                    </h3>
                </div>
                <div className="flex flex-row justify-center items-end p-0 px-6 lg:px-0 mt-9 box-border">

                    <Link to={`../product/${id}`} className="bg-primary hover:bg-gray-400 w-5/6 rounded-[12px] flex isolate justify-center items-start p-2  text-white text-xl box-border">
                        View Deal
                    </Link>
                    {/* <button className="flex relative flex-row justify-start items-start p-0 box-border m-0">
                        <svg className="fill-black hover:fill-primary hover:text-primary" fill="none" stroke="currentColor" width="auto" height="2.5rem" viewBox="0 0 50 39" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.0024 3.42769C30.6792 -0.96245 39.4517 -0.816736 44.9206 3.9023C50.3871 8.62343 50.5756 16.1423 45.4909 21.0466L24.9976 38.7237L4.50908 21.0466C-0.575589 16.1423 -0.384672 8.61094 5.07941 3.9023C10.5532 -0.810491 19.3087 -0.968695 25.0024 3.42769ZM41.4986 6.84364C37.8736 3.71704 32.0252 3.59006 28.2311 6.52515L25.0048 9.01894L21.7762 6.52723C17.9699 3.58798 12.1337 3.71704 8.49899 6.8478C4.89816 9.94942 4.71691 14.9141 8.035 18.1947L25 32.8306L41.965 18.1968C45.2855 14.9141 45.1042 9.95567 41.4986 6.84364Z"/>
                        </svg>
                    </button> */}
                </div>
            </div>
        </div>
    );  
}

export default ProductCard;
