import React, { useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi'
import { HiBars3, HiBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cartdrawer from '../layout/Cartdrawer'
import { IoMdClose } from 'react-icons/io'
import { FaClipboardList } from 'react-icons/fa'

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDraweropen] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const toggleNavDrawer = () => {
        setNavDraweropen(!navDrawerOpen)
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8'>
                {/* Left Logo */}
                <div>
                    <Link to="/" className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-wide drop-shadow-lg hover:scale-105 smooth-transition">
                        SuvarnaRup
                    </Link>
                </div>

                {/* Center - Navigation Links */}
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase smooth-transition'>
                        Silver Jewellery
                    </Link>
                    <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase smooth-transition'>
                        1 Gram Gold Jewellery
                    </Link>
                    <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase smooth-transition'>
                        Top Trending
                    </Link>
                </div>

                {/* Right - Icons */}
                <div className='flex items-center space-x-4'>
                    <Link to="/admin" className="hidden sm:block bg-black px-3 py-1.5 rounded text-sm text-white hover:bg-gray-800 smooth-transition">
                        Admin
                    </Link>
                    {user && (
                        <Link to="/myorders" className='p-2 hover:text-black smooth-transition flex items-center'>
                            <FaClipboardList className='h-5 w-5 text-gray-700' />
                        </Link>
                    )}
                    <Link to="/profile" className='p-2 hover:text-black smooth-transition'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>
                    <button
                        onClick={toggleCartDrawer}
                        className='relative p-2 hover:text-black smooth-transition'
                    >
                        <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
                        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                            {useSelector((state) => state.cart.cart?.products?.length || 0)}
                        </span>
                    </button>
                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden p-2 hover:text-black smooth-transition'
                    >
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
            </nav>

            {/* Cart Drawer */}
            <Cartdrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed top-0 left-0 w-4/5 sm:w-1/2 h-full bg-white shadow-lg transform smooth-transition z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className='flex justify-end p-4'>
                    <button
                        onClick={toggleNavDrawer}
                        className='p-2 hover:text-black smooth-transition'
                    >
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-6'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link
                            to="/collections/all"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black py-2 smooth-transition'
                        >
                            Silver Jewellery
                        </Link>
                        <Link
                            to="/collections/all"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black py-2 smooth-transition'
                        >
                            1 Gram Gold Jewellery
                        </Link>
                        <Link
                            to="/collections/all"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black py-2 smooth-transition'
                        >
                            Top Trending
                        </Link>
                        {user && (
                            <Link
                                to="/myorders"
                                onClick={toggleNavDrawer}
                                className='block text-gray-600 hover:text-black py-2 smooth-transition flex items-center space-x-2'
                            >
                                <FaClipboardList className='h-5 w-5' />
                                <span>My Orders</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar