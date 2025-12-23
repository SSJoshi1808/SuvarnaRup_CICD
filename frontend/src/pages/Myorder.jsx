import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const Myorder = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto p-4 sm:p-6 flex justify-center items-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='max-w-7xl mx-auto p-4 sm:p-6'>
                <div className='text-red-500 text-center'>{error}</div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order ID</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                        {order.orderItem && order.orderItem[0] && (
                                            <img
                                                src={order.orderItem[0].image}
                                                alt={order.orderItem[0].name}
                                                className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                                            />
                                        )}
                                    </td>
                                    <td className='py-2 px-4'>{order._id}</td>
                                    <td className='py-2 px-4'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className='py-2 px-4'>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                                    <td className='py-2 px-4'>{order.orderItem && order.orderItem[0] ? order.orderItem[0].name : 'N/A'}</td>
                                    <td className='py-2 px-4'>₹{order.totalPrice}</td>
                                    <td className='py-2 px-4'>
                                        <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myorder;
