import React from 'react'
import firstpic from "../../assets/8.jpg"
import secondpic from "../../assets/9.jpg"
import { Link } from 'react-router-dom'


const CollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0 '>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
        {/* Womens  */}
        <div className="relative flex-1"> 
            <img src= { firstpic } 
            className='w-full h-[700px] object-cover' />
            <div className='absolute bottom-8 left-1 bg-white bg-opacity-90 p-4'>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                     SilvaElegance Collection
                </h2>
                <Link to="collections/:collection"
                className='text-gray-900 underline'
                >Shop Now </Link>
            </div>
        </div>
        {/* Golden Collection */}
        <div className="relative flex-1"> 
            <img src= { secondpic } 
            className='w-full h-[700px] object-cover' />
            <div className='absolute bottom-8 left-1 bg-white bg-opacity-90 p-4'>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                SuvarnaLite Collection
                </h2>
                <Link to="collections/:collection"
                className='text-gray-900 underline'
                >Shop Now </Link>
            </div>
        </div>


        </div>
    </section>
  )
}

export default CollectionSection