// import React, { useEffect, useRef, useState } from 'react'
// import { FaFilter } from 'react-icons/fa';
// import FilterSider from '../components/products/FilterSider';
// import SortOption from './SortOption';
// import ProductGrid from '../components/products/ProductGrid';

// const CollectionPage = () => {
//     const [products, setProducts] = useState([]);
//     const sidebarRf = useRef(null);
//     const [isSideBarOpen, setIsSideBarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSideBarOpen(!isSideBarOpen);
//     };

//     const handleClickOutSide = (e) => {
//         if (sidebarRf.current && !sidebarRf.current.contains(e.target)) {
//             setIsSideBarOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutSide);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutSide);
//         };
//     },[]);

//     useEffect(() => {
//         setTimeout(() => {
//             const fetchedProducts = [
//                 { _id: 1, name: "Product 1", price: 100, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
//                 { _id: 2, name: "Product 2", price: 100, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
//                 { _id: 3, name: "Product 3", price: 100, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
//                 { _id: 4, name: "Product 4", price: 100, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
//                 { _id: 5, name: "Product 5", price: 100, images: [{ url: "https://picsum.photos/500/500?random=7" }] },
//                 { _id: 6, name: "Product 6", price: 100, images: [{ url: "https://picsum.photos/500/500?random=8" }] },
//                 { _id: 7, name: "Product 7", price: 100, images: [{ url: "https://picsum.photos/500/500?random=9" }] },
//                 { _id: 8, name: "Product 8", price: 100, images: [{ url: "https://picsum.photos/500/500?random=10" }] },
//             ];
//             setProducts(fetchedProducts);
//         }, 1000);
//     }, []);

//     return (
//         <div className='flex flex-col lg:flex-row'>
//             {/* Mobile filter button */}
//             <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
//                 <FaFilter className='mr-2' />Filters
//             </button>

//             {/* Filter sidebar */}
//             <div
//                 ref={sidebarRf}
//                 className={`${
//                     isSideBarOpen ? "translate-x-0" : "-translate-x-full"
//                 } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto 
//                 transition-transform duration-300 lg:static lg:translate-x-0`}>
//                 <FilterSider />
//             </div>
//             <div className='flex-grow py-4'>
//                 <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
//                 {/* Sort Options */}
//                 <SortOption />
//                 {/* product grid */}
//                 <ProductGrid products={products}/>
//             </div>
//         </div>
//     );
// };

// export default CollectionPage;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import FilterSider from "../components/products/FilterSider";
import SortOption from "./SortOption";
import ProductGrid from "../components/products/ProductGrid";
import { fetchProductsByFilters } from '../redux/slices/productSlice';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const sidebarRf = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: [],
    collections: [],
    price: [0, 2000],
    rating: null
  });

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutSide = (e) => {
    if (sidebarRf.current && !sidebarRf.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    // Get all filter parameters from URL
    const categoryFromUrl = searchParams.get('category')?.split(',') || [];
    const collectionsFromUrl = searchParams.get('collections')?.split(',') || [];
    const priceMinFromUrl = Number(searchParams.get('price_min')) || 0;
    const priceMaxFromUrl = Number(searchParams.get('price_max')) || 2000;
    const ratingFromUrl = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;

    setFilters({
      categories: categoryFromUrl,
      collections: collectionsFromUrl,
      price: [priceMinFromUrl, priceMaxFromUrl],
      rating: ratingFromUrl
    });

    // Dispatch initial filter request
    dispatch(fetchProductsByFilters({
      category: categoryFromUrl.join(','),
      collections: collectionsFromUrl.join(','),
      price_min: priceMinFromUrl,
      price_max: priceMaxFromUrl,
      rating: ratingFromUrl
    }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (filters.categories.length > 0 || filters.collections.length > 0 || filters.rating || filters.price[0] !== 0 || filters.price[1] !== 2000) {
      // Construct filter object for API
      const filterParams = {
        ...(filters.categories.length > 0 && { category: filters.categories.join(',') }),
        ...(filters.collections.length > 0 && { collections: filters.collections.join(',') }),
        ...(filters.rating && { rating: filters.rating }),
        price_min: filters.price[0],
        price_max: filters.price[1]
      };

      dispatch(fetchProductsByFilters(filterParams));
    }
  }, [filters, dispatch]);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters
    };
    setFilters(updatedFilters);

    // Update URL parameters
    const params = new URLSearchParams();
    if (updatedFilters.categories.length > 0) params.set('category', updatedFilters.categories.join(','));
    if (updatedFilters.collections.length > 0) params.set('collections', updatedFilters.collections.join(','));
    if (updatedFilters.rating) params.set('rating', updatedFilters.rating.toString());
    params.set('price_min', updatedFilters.price[0].toString());
    params.set('price_max', updatedFilters.price[1].toString());
    
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRf}
        className={`${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white shadow-md transition-transform duration-300 
        lg:static lg:translate-x-0 lg:w-1/4 p-4`}
      >
        <FilterSider onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-grow py-4 px-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort Options */}
        <SortOption />
        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
