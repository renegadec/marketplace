import React, {useState} from "react";
import handler from "../api/subscribe";

function SubscribeForm() {
    const [state, setState] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("")
    // 0 - initial , 1 - loading, 2 - success, 3 - error

    const subscribe =async (e) => {
        e.preventDefault();
        setState(1);
        setErrorMsg("")
        console.log(e.target[0].value);
        const errHandler = console.log
   
        try {
            handler(email, errHandler)
            setState(2);
        } catch (e) {
            setErrorMsg(e);
            setState(3)
        }
    }

    return (
    <section>
        {state === 2 ? (
            <p className="flex justify-center font-medium mt-4 text-xl text-primary pb-5">
                Thanks for subscribing!
            </p>
        ) : (
            <div className="py-8 px-4 mx-auto lg:my-24 max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md sm:text-center">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-primary">Sign up for our newsletter</h2>
                    <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress,    announcements and exclusive discounts feel free to sign up with your email.</p>
                    <form onSubmit={subscribe}>
                        <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                            <div className="relative w-full">
                                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z">
                                        </path>
                                    </svg>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-primary sm:rounded-none sm:rounded-l-lg focus:ring-primary focus:border-primary dark:bg-white dark:border-primary dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary dark:focus:border-primary" placeholder="Enter your email" type="email" id="email" required />
                            </div>
                            <div>
                                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-primary rounded-lg border cursor-pointer bg-primary-700 border-primary sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                            </div>
                        </div>
                        <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-600 newsletter-form-footer dark:text-gray-700">
                            We care about the protection of your data.   
                            <a href="#" className="font-medium text-primary dark:text-primary hover:underline">Read our Privacy Policy</a>.
                        </div>
                        {
                            state === 3 ? (
                                <p className="text-red-500 mt-3">{errorMsg}</p>
                            ) : (
                                ""
                            )
                        }
                    </form>
                </div>
            </div>
        )}
        
    </section>
    );
}

export default SubscribeForm;