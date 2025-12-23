import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data || []);
            } catch (error) {
                console.error("Failed to fetch new arrivals:", error);
            }
        };
        fetchNewArrivals();
    }, []);

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 300;
        scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
        }
        return () => {
            if (container) container.removeEventListener("scroll", updateScrollButtons);
        };
    }, [newArrivals]);

    const getImageUrl = (imgArray) => {
        const firstImage = imgArray?.[0];
        if (!firstImage || typeof firstImage !== 'object') return null;

        const entries = Object.entries(firstImage)
            .filter(([key]) => !isNaN(key)) // only numeric keys
            .sort((a, b) => a[0] - b[0])    // sort by key
            .map(([, value]) => value);     // get values only

        return entries.join('');
    };


    return (
        <section>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Newest Treasures Just Landed—Shop Now!
                </p>
                <div className='absolute right-3 bottom-[-30px] flex space-x-2'>
                    <button
                        onClick={() => scroll('left')}
                        className={`p-2 rounded border bg-white text-black ${!canScrollLeft && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!canScrollLeft}
                    >
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className={`p-2 rounded border bg-white text-black ${!canScrollRight && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!canScrollRight}
                    >
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className='container mx-auto overflow-x-auto flex space-x-6 relative scroll-smooth no-scrollbar'
            >
                {newArrivals.length === 0 ? (
                    <p className="text-center w-full py-20 text-gray-500">No new arrivals available at the moment.</p>
                ) : (
                    newArrivals.map((product, index) => {
                        const imageUrl = getImageUrl(product?.img) || '/placeholder.jpg';

                        return (
                            <div
                                key={product._id}
                                className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative rounded-lg overflow-hidden shadow'
                            >
                                <img
                                    src={imageUrl}
                                    alt={product?.name || 'New Arrival'}
                                    className='w-full h-[500px] object-cover'
                                />

                                <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4'>
                                    <Link to={`/product/${product._id}`} className='block'>
                                        <h4 className='font-medium'>{product.name}</h4>
                                        <p className='mt-1'>${product.price}</p>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
