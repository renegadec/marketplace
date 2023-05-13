import React from 'react'

const Orders = () => {
    return (
        <div>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Cargo Dispatched</h3>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">02 May 2023</time>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Cargo dispatched from country of origin. Download all documentation to get your Invoice, B/L, Export Certificate and Inspection documents. </p>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700  dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg> Download ZIP</a>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Destination Port Clearing</h3>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">08 May 2023</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Details on clearance of your cargo from our agent will appear here.</p>
                </li>
                <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Cargo Delivered <span className="bg-yellow-600 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">Dispute</span></h3>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">01 February 2023</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Cargo delivered to you. You can raise any disputes if any.</p>
                </li>
            </ol>
        </div>
    )
}

export default Orders