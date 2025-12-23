import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContent from '../cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Cartdrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const handleCheckOut = () => {
        if (!user) {
            toast.error("Please login to proceed with checkout");
            toggleCartDrawer();
            navigate("/login");
            return;
        }

        if (!cart?.products?.length) {
            toast.error("Your cart is empty");
            return;
        }

        toggleCartDrawer();
        navigate("/CheckOut");
    };

    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-3/4 md:w-1/2 lg:w-[30rem] h-full bg-white shadow-lg transform smooth-transition flex flex-col z-50 
                ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Close Button */}
            <div className='flex justify-end p-4 border-b'>
                <button
                    onClick={toggleCartDrawer}
                    className='p-2 hover:text-black smooth-transition'
                >
                    <IoMdClose className='h-6 w-6 text-gray-600' />
                </button>
            </div>

            {/* Cart Contents with scrollable area */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-6'>Your Cart</h2>
                <CartContent />
            </div>

            {/* Checkout button fixed at the bottom */}
            <div className="p-4 bg-white border-t sticky bottom-0">
                <button
                    onClick={handleCheckOut}
                    className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 smooth-transition'
                >
                    {user ? "Checkout" : "Login to Checkout"}
                </button>
                <p className='text-sm text-gray-500 mt-2 text-center'>
                    Shipping, taxes, and discount codes calculated at checkout
                </p>
            </div>
        </div>
    );
};

export default Cartdrawer;
