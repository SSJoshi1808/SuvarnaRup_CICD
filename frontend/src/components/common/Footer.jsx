import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='border-t py-12 bg-[#c55e85]'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4  lg:px-0'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>NewsLetetter</h3>
                <p className='text-gray-750 mb-4'>
                    Be the first to hear about new products exculsive events and online offers
                </p>
                <p className="font-medium text-sm text-gray-750 mb-4 md:mb-6">
                    sign up and get 10% off on your order
                </p>
                {/* newsletter form */}
                <form action="#" className='flex'>
                    <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    className='p-3 w-full text-sm border-t border-l border-b
                    border-gray-300 rounded-l-md focus:outline-none 
                    focus:ring focus:ring-gray-500 transition-all '
                     required id="" />
                    <button type="submit" className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
                        Subscribe
                    </button>
                </form>
            </div>
            {/* Shop Links  */}
            <div>
    <h3 className='text-lg text-gray-800 mb-4'>Shop by Category</h3>
    <ul className='space-y-2 text-gray-750'>

        {/* Based on Type */}
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Necklaces & Chains</Link></li>
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Earrings</Link></li>
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Rings</Link></li>
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Bracelets & Bangles</Link></li>
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Anklets & Toe Rings</Link></li>
        <li><Link to="collections/:collection" className='hover:text-gray-500 transition-colors'>Nose Jewellery</Link></li>

      
    </ul>
</div>

            {/* Support Links */}
            <div >
                <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                <ul className='space-y-2 text-gray-750'>
                
                    <li>
                        <Link to="/about" className='hover:text-gray-500 transition-colors'>About Us</Link>
                    </li>
                    <li>
                        <Link to="/faq" className='hover:text-gray-500 transition-colors'>FAQ's</Link>
                    </li>
                    <li>
                        <Link to="/features" className='hover:text-gray-500 transition-colors'>Features</Link>
                    </li>
                </ul>
            </div>
            {/* Follow US  */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>
                    Follow US
                </h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href="https://www.facebook.com" target='_blank' rel="nopener noreferrer"
                    className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                    </a>
                    <a href="https://www.facebook.com" target='_blank' rel="nopener noreferrer"
                    className='hover:text-gray-300'>
                        <IoLogoInstagram className='h-5 w-5' />
                    </a>
                    <a href="https://www.facebook.com" target='_blank' rel="nopener noreferrer"
                    className='hover:text-gray-300'>
                        <RiTwitterXLine className='h-4 w-5' />
                    </a>

                </div>
                <p className='text-gray-500'>Call Us </p>
                <p>
                    <FiPhoneCall className='inline-block mr-2' />
                    9657236189
                </p>
            </div>
        </div>
        {/* Footer Bottom */}
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
            <p className='text-sm text-gray-750 tracking-tighter text-center'>
              2025 , SuvarnaRup . All Rights Reserved  
            </p>

        </div>
    </footer>
  )
}

export default Footer