import React, { useState } from 'react'
import { logo } from '../../assets'
import { supabase } from '../../config/supabase'
import { useNavigate } from "react-router-dom"

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rpassword, setRPassword] = useState("")
    const navigate = useNavigate();

    const SignUpHandler = async (e) => {  
        
        e.preventDefault()

        if(password !== rpassword) {
            alert("Passwords do not match");
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        }) 

        if(data.user) {
            navigate("/market")
        }

        if(error) {
            alert(error.message)
        }

    }

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="h-8 mr-2" src={logo} alt="logo" />   
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-primary">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary">Your email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className=" border border-primary text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:border-primary dark:placeholder-gray-400 dark:text-black  dark:focus:border-primary" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="border border-primary text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5  dark:border-primary dark:placeholder-gray-400 dark:text-black  dark:focus:border-primary" required />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-primary">Confirm Password</label>
                                <input type="password" onChange={(e) => setRPassword(e.target.value)} name="confirm_password" id="confirm_password" placeholder="••••••••" className="border border-primary text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5  dark:border-primary dark:placeholder-gray-400 dark:text-black  dark:focus:border-primary" required />
                            </div>
                            <button type="submit" onClick={(e) => SignUpHandler(e)} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 ring-primary focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-700 dark:focus:ring-primary">Sign up</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" className="font-medium text-primary hover:underline dark:text-primary">Sign In</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp