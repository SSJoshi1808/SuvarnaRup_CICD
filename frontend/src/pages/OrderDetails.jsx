import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDeliver: false,
            paymentMethod: "Paypal",
            shippingMethod: "Standard",
            shippingAddress: { city: "New York", country: "USA" },
            orderItems: [
                {
                    productId: 1,
                    name: 'Necklace 1',
                    quantity: '1',
                    price: 5000,
                    img: "https://picsum.photos/200?random=1",
                },
                {
                    productId: 2,
                    name: 'Necklace 2',
                    quantity: '1',
                    price: 5000,
                    img: "https://picsum.photos/200?random=2",
                },
            ],
        };
        setOrderDetails(mockOrderDetails);
    }, [id]);

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                Order Details
            </h2>

            {!orderDetails ? (
                <p>No order details found</p>
            ) : (
                <div className='p-4 sm:p-6 rounded-lg border'>
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='text-lg md:text-xl font-semibold'>
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className='text-gray-600'>
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetails.isPaid
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>

                            <span className={`${orderDetails.isDeliver
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isDeliver ? "Delivered" : "Pending Delivered"}
                            </span>
                        </div>
                    </div>

                    {/* Order Info */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                            <p>Shipping Method: {orderDetails.shippingMethod}</p>
                            <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
                        </div>
                    </div>
                    {/* Product details */}
                    <div className='overflow-x-auto'>
    <h4 className='text-lg font-semibold mb-4'>Products</h4>
    <table className='min-w-full text-gray-600 mb-4 border-collapse border border-gray-200'>
        <thead className='bg-gray-100'>
            <tr>
                <th className='py-2 px-4 border border-gray-200 text-left'>Name</th>
                <th className='py-2 px-4 border border-gray-200 text-left'>Unit Price</th>
                <th className='py-2 px-4 border border-gray-200 text-left'>Quantity</th>
                <th className='py-2 px-4 border border-gray-200 text-left'>Total</th>
            </tr>
        </thead>
        <tbody>
            {orderDetails?.orderItems?.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                    <td className='py-2 px-4 flex items-center gap-2'>
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded" />
                        {item.name}
                    </td>
                    <td className='py-2 px-4'>${item.price}</td>
                    <td className='py-2 px-4'>{item.quantity}</td>
                    <td className='py-2 px-4'>${item.price * item.quantity}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

                </div>
            )}
        </div>
    );
};

export default OrderDetails;
