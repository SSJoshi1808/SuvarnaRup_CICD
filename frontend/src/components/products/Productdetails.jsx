import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';

const Productdetails = ({ productId: propId }) => {
  const { id: routeId } = useParams();
  const productId = propId || routeId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBtnDisabled, setBtnDisabled] = useState(false);

  const getImageUrl = (imgArray) => {
    if (!Array.isArray(imgArray) || !imgArray.length) return null;
    const firstImage = imgArray[0];
    if (firstImage.url) return firstImage.url;
    return Object.values(firstImage).join('');
  };

  const handleAddtoCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }

    if (!(quantity > 0)) {
      toast.error("Please select a valid quantity");
      return;
    }

    setBtnDisabled(true);
    dispatch(addToCart({
      productId: productId,
      quantity,
      category: selectedProduct.category,
      collections: selectedProduct.collections
    }))
      .then(() => {
        toast.success("Product added to cart");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add to cart");
      })
      .finally(() => {
        setBtnDisabled(false);
      });
  };

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
        setSelectedProduct(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details");
      }
    };
    fetchProduct();
  }, [productId]);

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2'>
            <img
              src={selectedProduct?.img ? getImageUrl(selectedProduct.img) : '/placeholder.jpg'}
              alt={selectedProduct?.name}
              className='w-full h-auto object-cover rounded'
            />
          </div>
          <div className='md:w-1/2 md:ml-10'>
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct?.name}</h1>
            <p className='text-lg text-gray-600 mb-1 line-through'>₹{selectedProduct?.price}</p>
            <p className='text-xl text-gray-500 mb-2'>₹{selectedProduct?.discountPrice}</p>
            <p className='text-gray-600 mb-4'>{selectedProduct?.category}</p>
            <p className='text-gray-600 mb-4'>{selectedProduct?.collections}</p>

            {/* Quantity Controls */}
            <div className='mb-6'>
              <p className='text-gray-700'>Quantity</p>
              <div className='flex items-center space-x-4 mt-2'>
                <button
                  className='px-2 py-1 bg-gray-200 rounded text-lg'
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <span className='text-lg'>{quantity}</span>
                <button
                  className='px-2 py-1 bg-gray-200 rounded text-lg'
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddtoCart}
              className={`py-2 px-6 rounded w-full mb-4 ${isBtnDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`}
              disabled={isBtnDisabled}
            >
              {user ? "ADD TO CART" : "LOGIN TO ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;

