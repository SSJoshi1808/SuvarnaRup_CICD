import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'


const Serachbar = () => {
    const [searchTerm ,setSeatchTerm ] = useState("")
    const [ isOpen ,setIsOpen]=useState(false)
    const handleSerachToggle=()=>{
        setIsOpen(!isOpen)
    }
    const handleSerach=(e)=>{
        e.preventDeafukt();
        console.log("Serach Data",searchTerm);
        setIsOpen(false)
        
    }  
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-400 ${isOpen? "absolute top-0 left-0 w-full bg-white  h-32 z-50" :"w-auto"}`}>
        {isOpen ? (
            <form onSubmit={handleSerach} className='relative flex items-center justify-center w-full'>
                <div className='relative w-1/2'>
                <input type="text"
                 placeholder='Search ' 
                 value={searchTerm} 
                 onChange={e=>setSeatchTerm(e.target.value)}
                 className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'/>
                {/* Search Icon */}
                <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                <HiMagnifyingGlass className="h-6 w-6" />
                </button>
                    
                </div>
                {/* close button */}
                    <button type="button"  
                    onClick={handleSerachToggle}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600'>
                        <HiMiniXMark />
                    </button>
            </form>) : (
            <button  onClick={handleSerachToggle}>
                <HiMagnifyingGlass className='h-6 w-6 ' />
            </button>
        )}
    </div>
  )
  
}

export default Serachbar