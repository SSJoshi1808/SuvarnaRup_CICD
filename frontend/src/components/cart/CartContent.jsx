import React, { useEffect } from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';

const CartContent = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user?._id, guestId]);

  const handleQuantityChange = (product, operation) => {
    let newQuantity = product.quantity;

    if (operation === 'increment') {
      // Prevent excessive quantities
      if (newQuantity < 99) {
        newQuantity++;
      }
    } else if (operation === 'decrement') {
      // Ensure quantity stays at least 1
      if (newQuantity > 1) {
        newQuantity--;
      }
    }

    if (newQuantity !== product.quantity) {
      dispatch(updateCartItemQuantity({
        productId: product.productId,
        quantity: newQuantity,
        category: product.category,
        collections: product.collections,
        guestId,
        userId: user?._id
      }));
    }
  };

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart({
      productId: product.productId,
      category: product.category,
      collections: product.collections,
      guestId,
      userId: user?._id
    }));
  };
  const getImageUrl = (imgArray) => {
    if (!imgArray || !Array.isArray(imgArray) || imgArray.length === 0) return null;

    const firstImage = imgArray[0];

    // Handle object with _id and numbered properties (0, 1, 2, etc.)
    if (typeof firstImage === 'object' && !Array.isArray(firstImage) && '_id' in firstImage) {
      // Filter out the _id property and join the remaining characters
      const chars = Object.entries(firstImage)
        .filter(([key]) => key !== '_id')
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([_, value]) => value);
      return chars.join('');
    }

    // Handle regular string URL
    if (typeof firstImage === 'string') {
      return firstImage;
    }

    return null;
  };


  const calculateTotal = () => {
    return cart?.products?.reduce((total, product) => total + (product.price * product.quantity), 0) || 0;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {cart?.products?.map((product) => (
        <div key={product.productId} className='flex items-start justify-between py-4 border-b'>
          <div className="flex item-start">
            <img
              src={getImageUrl(product.img)}
              alt={product.name || 'Product Image'}
              className='w-20 h-24 object-cover mr-4 rounded'
              onError={(e) => e.target.src = '/placeholder.jpg'}
            />

            <div>
              <h3 className='text-lg font-medium'>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                ₹{product.price.toLocaleString()}
              </p>
              <p className='text-xs text-gray-400'>
                {product.category} - {product.collections}
              </p>
              {/* <div className='flex items-center mt-2'>
                <button 
                  className='border rounded px-2 py-1 text-xl font-medium'
                  onClick={() => handleQuantityChange(product, 'decrement')}
                >
                  -
                </button>
                <span className='mx-4'>{product.quantity}</span>
                <button 
                  className='border rounded px-2 py-1 text-xl font-medium'
                  onClick={() => handleQuantityChange(product, 'increment')}
                >
                  +
                </button>
              </div> */}
            </div>
          </div>
          <div>
            <p className='font-medium'>₹{(product.price * product.quantity).toLocaleString()}</p>
            <button onClick={() => handleRemoveItem(product)}>
              <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600' />
            </button>
          </div>
        </div>
      ))}
      {cart?.products?.length > 0 && (
        <div className='mt-4 text-right'>
          <p className='text-xl font-bold'>Total: ₹{calculateTotal().toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CartContent;