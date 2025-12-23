import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOption = () => {
  const [searchParam,setSearchParams]=useSearchParams();
  const handleSortChange=(e)=>{
    const sortBy = e.target.value;
    searchParam.set("sortBy",sortBy);
    setSearchParams(searchParam);
  }
  return (
    <div className='mb-4 flex items-center justify-end'>
      <select name=""
      onChange={handleSortChange}
      id="sort" 
      value={searchParam.get("sortBy")||""}
      className='border pd-2 rounded-md focus:outline-none'>
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>

      </select>
    </div>
  )
}

export default SortOption