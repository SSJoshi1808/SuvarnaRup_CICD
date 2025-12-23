import React from 'react'
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product, index) => {
        // Reconstruct image URL from img[0] if it's split
        let imageUrl = '';
        if (product.img && Array.isArray(product.img) && product.img.length > 0) {
          const imgObject = product.img[0];
          // Combine all character values into a string
          imageUrl = Object.values(imgObject).join('');
        }

        return (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className='bg-white p-4 rounded-lg'>
              <div className="w-full mb-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name || 'Product Image'}
                    className="w-full h-auto object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <h3 className='text-sm mb-2'>{product.name}</h3>
              <p className='text-gray-500 font-medium text-sm tracking-tighter'>
                ₹{product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;
