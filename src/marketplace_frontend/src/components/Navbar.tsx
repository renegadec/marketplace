
import React, { useEffect, useState, useContext } from 'react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from '../constants';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from '../style';
import { UserContext } from '../UserContext';

import { useAuth } from "../hooks";

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isAppsOpen, setIsAppsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const { session, setSession } = useContext(UserContext)

    const { login, logout } = useAuth(session, setSession);

    function toggleMenuItem(selection: 'Notifications' | 'Apps' | 'Profile') {
        
        switch(selection) {
            case 'Notifications':
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsAppsOpen(false)
                setIsProfileOpen(false)
                break
            case 'Apps':
                setIsAppsOpen(!isAppsOpen)
                setIsNotificationsOpen(false)
                setIsProfileOpen(false)
                break
            case 'Profile':
                setIsProfileOpen(!isProfileOpen)
                setIsAppsOpen(false)
                setIsNotificationsOpen(false)
                break
        }
    }

    return (
        <nav className="bg-white pb-4">
            {!session ?
                (<div className="px-6 pt-6 lg:px-8">
                    <div>
                        <nav className="flex h-9 items-center justify-between" aria-label="Global">
                            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                                <Link to="/" className="-m-1.5 p-1.5">
                                    <img className="h-8" src="./logo.png" alt="logo" />
                                </Link>
                            </div>
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                                {navigation.map((item) => (
                                    <NavLink key={item.name} to={item.to} className="font-semibold text-gray-900 hover:text-gray-900">
                                        {item.name}
                                    </NavLink>
                                ))}
                                <a href="https://tswaanda.medium.com/" target="_blank" className="font-semibold text-gray-900 hover:text-gray-900">Blog</a>
                            </div>
                            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                                <button
                                    onClick={() => login(
                                        () => navigate("/account"),
                                        () => console.log('Error')
                                    )}
                                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-primary hover:ring-gray-900/20"
                                >
                                    Log in
                                </button>
                            </div>
                        </nav>
                        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                            <div className="flex h-9 items-center justify-between">
                                <div className="flex">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                    className="h-8"
                                    src="./logo.png"
                                    alt="logo"

                                    />
                                </a>
                                </div>
                                <div className="flex">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                </div>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                    >
                                        {item.name}
                                    </NavLink>
                                    ))}
                                    <a href="https://tswaanda.medium.com/" 
                                        target="_blank" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
                                            Blog
                                    </a>
                                </div>
                                <div className="py-6">
                                    <a
                                        onClick={() => login(
                                            () => navigate("/account"),
                                            // () => console.log('Error'),
                                            () => setMobileMenuOpen(false)
                                        )}
                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10 cursor-pointer"
                                    >
                                    Log in
                                    </a>
                                </div>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Dialog>
                    </div>
                </div>)
                :
                null
            }
        </nav>
    )
}

export default Navbar;