import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Button } from "../components";
import { Phone } from 'react-telephone';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const infoItems = ["Dashboard", "Orders", "Downloads", "Addresses", "Account details", "Logout"]

const Account = () => {
    const [activeInfo, setActiveInfo] = useState("Dashboard");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(true)

    let session = useContext(UserContext);

    useEffect(() => {
        if(session === null) navigate('/login')
    },[])

    if(!isMounted) {
        return null
    }

    return (
        <div className="flex flex-col place-items-center p-8 pt-12 min-h-screen w-full font-mont overflow-x-hidden">
            <h1 className="font-semibold text-4xl mb-8">
                My Account
            </h1>
            <div className="flex flex-row ml-24 items-start w-full">
                {infoItems.map((item, index) => (
                    <button onClick={() => setActiveInfo(item)} 
                        className={`mr-9 border-b-2 pb-4 ${item === activeInfo ? 'border-black' : 'border-transparent'}`} key={index}>
                        <h3 className={`font-semibold text-lg ${item === activeInfo ? 'text-black' : 'text-gray-600'}`}>
                            {item} 
                        </h3>
                    </button>                    
                ))}
            </div>
            <div className="flex ml-12 mt-8">
                {activeInfo === "Dashboard" &&
                    (<div className="flex flex-col">
                        <p>Hello James (not James? <span className="text-primary">Log out</span>)</p>
                        <p>From your account dashboard you can view your <span className="text-primary">recent orders</span>, 
                            manage your <span className="text-primary">shipping and billing addresses</span>, and edit your 
                            <span className="text-primary"> password and account details</span>.</p>
                    </div>)}
                {activeInfo === "Orders" &&
                    (<div className="flex flex-row justify-between w-[90vw] bg-gray-200 p-6 border-t-2 border-[#A18A68]">
                        <p>No order has been made yet</p>
                        <a href="/" className="uppercase text-primary">
                            Browse Product
                        </a>
                    </div>)}   
                {activeInfo === "Downloads" &&
                    (<div className="flex flex-row justify-between w-[90vw] bg-gray-200 p-6 border-t-2 border-[#A18A68]">
                        <p>No downloads or documents available yet</p>
                        <a href="/" className="uppercase text-primary">
                            Browse Product
                        </a>
                    </div>)}
                {activeInfo === "Addresses" &&
                    (<div className="flex flex-col">
                        <p>The following addresses will be used on the checkout page by default.</p>
                        <div className="flex flex-row w-[90vw] mt-6">
                            <div className="flex flex-col w-1/2 items-start">
                                <h3 className="font-semibold text-lg">
                                    Billing address
                                </h3>
                                <button className="text-primary font-semibold uppercase mt-8">
                                    Add
                                </button>
                                <p className="font-normal text-gray-600 mt-2">
                                    You have not set up this type of address yet.
                                </p>
                            </div>
                            <div className="flex flex-col w-1/2 items-start">
                                <h3 className="font-semibold text-lg">
                                    Shipping address
                                </h3>
                                <button className="text-primary font-semibold uppercase mt-8">
                                    Add
                                </button>
                                <p className="font-normal text-gray-600 mt-2">
                                    You have not set up this type of address yet.
                                </p>
                            </div>
                        </div>
                    </div>)}   
                    {activeInfo === "Account details" &&
                        (<div className="flex flex-col items-center mt-6">
                            <h1 className="font-semibold text-4xl mb-6">
                                Account details
                            </h1>
                            <input 
                                type="text" 
                                className="bg-transparent outline-none w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary" 
                                placeholder="First name*" />
                            <input 
                                type="text" 
                                className="bg-transparent outline-none w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary" 
                                placeholder="Last name*" />
                            <input 
                                type="text" 
                                className="bg-transparent outline-none w-[40vw] mb-2 border-b-2 border-gray-400 focus:border-primary" 
                                placeholder="Display name*" />
                            <p className="text-gray-400 text-xs mb-6 w-[40vw]">
                                This will be how your name will be displayed in the account section and in reviews.
                            </p>
                            <Phone>
                                <Phone.Country 
                                    className="bg-transparent outline-none w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary"  
                                /><br />
                                <Phone.Number 
                                    className="bg-transparent outline-none w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary" 
                                    placeholder="Phone number*" 
                                />
                            </Phone>
                            <input 
                                type="text" 
                                className="bg-transparent outline-none w-[40vw] mb-10 border-b-2 border-gray-400 focus:border-primary" 
                                placeholder="Email address*" />
                            
                            <div className="w-[40vw] mt-40">
                                <Button 
                                    text="Save Changes"
                                    width="full"
                                    round="none"
                                    handler={() => console.log()} />
                            </div>                                                                  
                        </div>)}                   
            </div>
        </div>
    )
}

export default Account;