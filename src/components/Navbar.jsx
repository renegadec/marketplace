import React from 'react';
import { logo } from "../assets";
import { navLinks } from '../constants/';

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between py-4 px-6 bg-white'>
            <img src={logo} alt="logo" className='w-[167px] h-[33.98px] rounded-full' />
            <div className='flex items-center justify-end'>
                <ul className='flex items-center justify-end mr-8'>
                    {navLinks.map((nav, index) => (
                        <li 
                            key={nav.id}
                            className='inline-block px-4 py-2 text-black font-mont'
                        >
                            {nav.title}
                        </li>
                    ))}
                </ul>
                <div>
                    <button className='px-4 py-2 w-[106px] h-[41px] bg-gray-300 text-primary rounded-[8px] font-mont'>
                        Sign in
                    </button>
                    <button className='px-4 py-2 w-[106px] h-[41px] bg-primary text-white rounded-[8px] font-mont ml-4'>
                        Sign up
                    </button>
                </div>
            </div>
            
        </nav>
    )
}

export default Navbar