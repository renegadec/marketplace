import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../constants";
import { Button, ProductCard, Loader } from "../components";

import { Instagram, Facebook, Mail } from "../assets/social/socials.js";

const initReviews = [
    {
        name: "Scarlet Johnson",
        stars: 3,
        date: "6 May, 2022",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet."
    }
]

const minOrder = 50;
const infoItems = ["Description", "Additional Information", "Reviews (1)"]

const preload = src => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
})

const preloadAllImages = srcs => Promise.all(srcs.map(preload))

const Product = () => {

    const fieldRef = useRef<HTMLInputElement>(null);

    let { id } = useParams();
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(minOrder);
    const [activeInfo, setActiveInfo] = useState("Description");
    const [reviews, setReviews] = useState(initReviews);
    const [loading, setLoading] = useState(true);

    const changeQty = (increment: boolean) => {
        if(increment) { 
            setQty(qty + 1);
            return
        } 
        if(qty > minOrder) setQty(qty - 1)
    }

    const images = productsData['product'][id]['images']

    const preloaded = async () => {
        await preloadAllImages(images)
            .then(
                (result) => { 
                    console.log(result);
                }
            )
            .finally(() => 
                setTimeout(() => {
                    setLoading(false)
                    const element = document.getElementById(`top-${id}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 400)              
            )
    }

    const scrollImage = (isRight: boolean) => {
        if(isRight) {
            if(activeImg === (productsData['product'][id]['images'].length - 1)) {
                setActiveImg(0)
            } else {
                setActiveImg(activeImg + 1)
            }
        } else {
            if(activeImg === 0) {
                setActiveImg((productsData['product'][id]['images'].length - 1))
            } else {
                setActiveImg(activeImg - 1)
            }           
        }
    }

    useEffect(() => {
        preloaded();
    },[id])

    if(loading) return (
        <div className="flex justify-center items-center px-7 lg:px-28 pt-8 pb-10 h-[70vh]">
            <Loader />
        </div>
    )

    return (
        <div className="px-7 lg:px-28 pt-8 pb-10">     
            <section ref={fieldRef} id={`top-${id}`}> 
                <div className="grid grid-rows-1 md:flex flex-row mb-12">
                        <div className="hidden lg:ml-20 md:w-1/12 justify-center lg:flex flex-col md:justify-start md:items-start">
                            {productsData['product'][id]['images'].map((imageSrc, index) => (
                                <button onClick={() => setActiveImg(index)}
                                    key={index}
                                    className="h-24 w-24 my-2 rounded-[8px] border-primary hover:border-gray-400 border-2">
                                    <img className="h-full w-full"
                                        src={`${imageSrc}`} 
                                        alt="Product Image" />
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center object-cover md:px-8 md:py-2 md:w-5/12 mb-[10rem] md:mb-0">
                            <img 
                                className=" border-primary border-2 rounded-[8px]"
                                src={`${productsData['product'][id]['images'][activeImg]}`} 
                                alt="Product Image" 
                            />
                            <div className="flex lg:hidden justify-between w-full px-6 mt-[-12rem]">
                                <button onClick={() => scrollImage(false)} className="flex justify-center items-center rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                        <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/>
                                    </svg>
                                </button>
                                <button onClick={() => scrollImage(true)} className="flex justify-center items-center  rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                        <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    <div className="flex flex-col py-2 md:w-5/12">
                        <h1 className="font-extrabold text-3xl">
                            {productsData['product'][id]['type']}
                        </h1>
                        <div className="flex flex-row mt-4">
                            <h3 className="font-semibold md:text-xl mr-6">
                                Price/KG
                            </h3>
                            <h3 className="font-medium md:text-xl text-[#A18A68]">
                                $ 15,00
                            </h3>
                        </div>
                        <div className="flex flex-row mt-12">
                            <div className="flex flex-row mr-4">
                                {[0,1,2,3,4].map((item, index) => (
                                    <button className="mx-[1px]" key={index}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9528 6.90406C17.8343 6.53958 17.511 6.28153 17.1301 6.24706L11.934 5.77533L9.88047 0.967631C9.72886 0.614414 9.38388 0.386444 8.9999 0.386444C8.61592 0.386444 8.27081 0.614414 8.12016 0.967631L6.06664 5.77533L0.869746 6.24706C0.488789 6.28222 0.166197 6.54026 0.0469935 6.90406C-0.0715235 7.26853 0.0379296 7.6683 0.326051 7.92099L4.25387 11.3651L3.09575 16.4659C3.01102 16.8409 3.15659 17.2288 3.46778 17.4537C3.63505 17.5753 3.83157 17.636 4.02878 17.636C4.19825 17.636 4.36785 17.5909 4.51933 17.5003L8.9999 14.8212L13.4797 17.5003C13.8083 17.6967 14.2215 17.6787 14.532 17.4537C14.8432 17.2288 14.9888 16.8409 14.9041 16.4659L13.7459 11.3651L17.6738 7.92099C17.9617 7.6683 18.0713 7.26936 17.9528 6.90406Z" fill="black"/>
                                        </svg>
                                    </button>))}
                            </div>
                            <h3 className="text-gray-600 text-lg">
                                1 customer review
                            </h3>
                        </div>
                        <div>
                            <p className="font-semibold text-xl text-gray-600 mt-2">
                                {productsData['product'][id]['desc']}
                            </p>
                        </div>
                        <div className="flex flex-row items-center mt-6">
                            <div className="flex flex-row bg-gray-200 py-1 px-4">
                                <button onClick={() => changeQty(false)}>
                                    -
                                </button>
                                <input 
                                    className="flex text-center focus:outline-none bg-transparent h-8 w-8 mx-2"
                                    type="number" 
                                    defaultValue={qty} />
                                <button onClick={() => changeQty(true)}>
                                    +
                                </button>
                            </div>
                            <p className="font-semibold text-lg mx-4">
                                Kgs
                            </p>
                            <div className="w-48">
                                <Button 
                                    text="Place Order" 
                                    width="full"
                                    round="none"
                                    outline="primary"
                                    variant="secondary"
                                    handler={() => console.log()}/>
                            </div>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex border-r-2 border-gray-200 pr-6">
                                <button className="group">
                                    <svg className="fill-primary h-4 w-5" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                        <path clipRule="evenodd" d="M9.88013 2.01405C11.0249 0.77861 12.6287 0.0520888 14.3262 0C17.3273 0 19.7603 2.39588 19.7603 5.35135C19.7603 8.85038 15.8104 12.6852 13.4415 14.9851C13.2282 15.1921 13.0278 15.3868 12.8442 15.5676L10.5915 17.7859C10.4527 17.9228 10.2643 17.9998 10.0678 18H9.6924C9.49594 17.9998 9.30759 17.9228 9.16876 17.7859L6.91609 15.5676C6.73248 15.3868 6.53202 15.1921 6.31874 14.9851C3.94983 12.6852 0 8.85038 0 5.35135C0 2.39588 2.43292 0 5.43407 0C7.13157 0.0520888 8.73538 0.77861 9.88013 2.01405ZM9.88027 15.7328L12.0539 13.6215C14.0596 11.6756 17.7844 8.03664 17.7844 5.35123C17.7844 4.44299 17.416 3.57235 16.7611 2.93287C16.1061 2.29339 15.2189 1.93805 14.2967 1.94583C12.7606 2.08626 11.3741 2.91055 10.5324 4.18367C10.4381 4.30499 10.2923 4.37677 10.1372 4.37826H9.69255C9.46171 4.37765 9.24364 4.27385 9.09974 4.0961C8.27139 2.8699 6.92358 2.07925 5.43421 1.94583C3.52439 1.94583 1.97617 3.47048 1.97617 5.35123C1.97617 8.03664 5.70098 11.6756 7.70664 13.6215L9.88027 15.7328Z" fill="#707070"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex ml-2">
                                <img className="h-4 w-5 ml-2" 
                                    src={Mail} 
                                    alt="Mail" />                            
                                <img className="h-4 w-5 ml-2" 
                                    src={Facebook} 
                                    alt="Facebook" />
                                <img className="h-4 w-5 ml-2" 
                                    src={Instagram} 
                                    alt="Instagram" />                                
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="flex flex-col mr-6">
                                <p className="font-semibold text-primary text-sm">Min Order:</p>
                                <p className="font-semibold text-primary text-sm">Categories:</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-sm text-gray-600">{minOrder}</p>
                                <p className="font-semibold text-sm text-gray-600">Fruits</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            <div className="flex flex-row md:ml-24">
                {infoItems.map((item, index) => (
                    <button onClick={() => setActiveInfo(item)} key={index}
                        className={`mr-8 border-b-2 pb-6 ${item === activeInfo ? 'border-black' : 'border-transparent'}`}>
                        <h3 className={`font-semibold text-sm md:text-xl ${item === activeInfo ? 'text-black' : 'text-gray-600'}`}>
                            {item} 
                        </h3>
                    </button>                    
                ))}
            </div>
            <div className="md:ml-24 mt-8">
                {activeInfo === infoItems[0] && (
                    <p className=" text-gray-600 text-sm md:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.
                    </p>
                )}
                {activeInfo === infoItems[1] && (
                    <>
                        <p className="font-semibold text-sm md:text-md text-black mb-6">
                            Weight: <span className="text-gray-600 ml-2">1kg per pack</span>
                        </p>
                        <p className="font-semibold text-sm md:text-md text-black mb-6">
                            Packaging Dimensions: <span className="text-gray-600 ml-2">15 x 10 x 1 cm</span>
                        </p>
                        <p className="font-semibold text-sm md:text-md text-black mb-6">
                            Colours: <span className="text-gray-600 ml-2">Dark Purple</span>
                        </p> 
                        <p className="font-semibold text-sm md:text-md text-black mb-6">
                            Materials: <span className="text-gray-600 ml-2">Plastic Packing</span>
                        </p>                                                  
                    </>
                )}
                {activeInfo === infoItems[2] && (
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col lg:w-1/2">
                            <p className="font-semibold text-sm md:text-xl mb-10">
                                1 Review for {productsData['product'][id]['type']}
                            </p>
                            {reviews.map((review, index) => (
                                <div key={index}>
                                    <div className="flex flex-row w-4/5 mb-2">
                                        <div className="w-1/2">
                                            <p className="font-semibold text-sm md:text-xl">
                                                {review.name}
                                            </p>
                                        </div>
                                        <div className="flex w/12">
                                            <p className="font-semibold text-sm md:text-xl text-gray-600">
                                                {review.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mr-4 mb-4">
                                        {[0,1,2,3,4].map((item, index) => (
                                            <div className="mr-2" key={index}>
                                                {index >= review.stars ?
                                                (<svg width="9" height="9" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black"/>
                                                </svg>) :
                                                (<svg width="9" height="9" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.9528 6.90406C17.8343 6.53958 17.511 6.28153 17.1301 6.24706L11.934 5.77533L9.88047 0.967631C9.72886 0.614414 9.38388 0.386444 8.9999 0.386444C8.61592 0.386444 8.27081 0.614414 8.12016 0.967631L6.06664 5.77533L0.869746 6.24706C0.488789 6.28222 0.166197 6.54026 0.0469935 6.90406C-0.0715235 7.26853 0.0379296 7.6683 0.326051 7.92099L4.25387 11.3651L3.09575 16.4659C3.01102 16.8409 3.15659 17.2288 3.46778 17.4537C3.63505 17.5753 3.83157 17.636 4.02878 17.636C4.19825 17.636 4.36785 17.5909 4.51933 17.5003L8.9999 14.8212L13.4797 17.5003C13.8083 17.6967 14.2215 17.6787 14.532 17.4537C14.8432 17.2288 14.9888 16.8409 14.9041 16.4659L13.7459 11.3651L17.6738 7.92099C17.9617 7.6683 18.0713 7.26936 17.9528 6.90406Z" fill="black"/>
                                                </svg>)}
                                            </div>))}
                                    </div>
                                    <p className="font-normal text-sm md:text-xl text-gray-600">
                                        {review.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="ml-24">
                <h1 className="font-bold mt-10 text-3xl text-primary">Related Products</h1>
            </div>
            
            <div className="flex flex-col justify-center md:flex-row ml-12 mt-16">
            
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
        </div>
    )
}

export default Product