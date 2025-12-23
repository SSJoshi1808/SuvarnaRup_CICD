import React, { useState } from 'react';

const FilterSider = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const categories = [
    'Necklace',
    'Earrings',
    'Bracelet',
    'Ring'
  ];

  const collections = [
    'Gold',
    'Silver',
    'Diamond',
    'Platinum'
  ];

  const ratings = [
    { label: '4 stars & up', value: 4 },
    { label: '3 stars & up', value: 3 },
    { label: '2 stars & up', value: 2 },
    { label: '1 star & up', value: 1 }
  ];

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    const newRange = [0, value];
    setPriceRange(newRange);
    onFilterChange({ price: newRange });
  };

  const handleCollectionChange = (collection, checked) => {
    const newCollections = checked
      ? [...selectedCollections, collection]
      : selectedCollections.filter((c) => c !== collection);
    setSelectedCollections(newCollections);
    onFilterChange({ collections: newCollections.length > 0 ? newCollections : [] });
  };

  const handleRatingChange = (value) => {
    const newRating = selectedRating === value ? null : value;
    setSelectedRating(newRating);
    onFilterChange({ rating: newRating });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border w-full max-w-xs max-h-screen overflow-y-auto">
      <h3 className="text-2xl font-bold mb-6 text-pink-600">Filters</h3>

      {/* Category */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-3 mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400 transition duration-150"
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const newCategories = e.target.checked
                  ? [...selectedCategories, category]
                  : selectedCategories.filter((c) => c !== category);
                setSelectedCategories(newCategories);
                onFilterChange({ category: newCategories.join(',') });
              }}
            />
            <span className="text-gray-700">{category}</span>
          </label>
        ))}
      </div>

      {/* Collections */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">Collections</h4>
        {collections.map((collection) => (
          <label key={collection} className="flex items-center space-x-3 mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400 transition duration-150"
              checked={selectedCollections.includes(collection)}
              onChange={(e) => handleCollectionChange(collection, e.target.checked)}
            />
            <span className="text-gray-700">{collection}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">Price Range</h4>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-pink-500"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-2">
        <h4 className="font-semibold mb-3 text-gray-800">Rating</h4>
        {ratings.map((rating) => (
          <label key={rating.value} className="flex items-center space-x-3 mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400 transition duration-150"
              checked={selectedRating === rating.value}
              onChange={() => handleRatingChange(rating.value)}
            />
            <span className="text-gray-700">{rating.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSider;
