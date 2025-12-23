import React from 'react'
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
const Topbar = () => {
  return (
     <div className="bg-[#EC7FA9] text-white p-4">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className=' hidden md:flex item-center space-x-4'>
          <a href="#" className="hover:text-grey-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-grey-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-grey-300">
            <RiTwitterXLine className="h-4 w-5" />
          </a>
        </div>

        <div className='text-sm hidden md:block'>
            <a href="tel:+9657236189 " className='hover:text-grey-300'>
                9657236189
            </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar