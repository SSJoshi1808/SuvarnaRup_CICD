import React from 'react';
import { FaShippingFast, FaLock, FaGem, FaExchangeAlt, FaHeadset, FaAward } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaGem className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: 'Premium Quality',
      description: 'Handcrafted jewellery made with the finest materials and attention to detail.'
    },
    {
      icon: <FaShippingFast className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: 'Fast Shipping',
      description: 'Quick and reliable delivery to your doorstep with real-time tracking.'
    },
    {
      icon: <FaLock className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: 'Secure Shopping',
      description: 'Protected payments and secure checkout process for your peace of mind.'
    },
    {
      icon: <FaExchangeAlt className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy with full refund guarantee.'
    },
    {
      icon: <FaHeadset className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: '24/7 Support',
      description: 'Dedicated customer service team available round the clock to assist you.'
    },
    {
      icon: <FaAward className="w-12 h-12 text-[#c55e85] mb-4" />,
      title: 'Authenticity Guaranteed',
      description: 'Certificate of authenticity provided with every purchase.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Our Features</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Discover what makes SuvarnaRup the perfect choice for your jewellery needs. We combine traditional craftsmanship with modern convenience to provide you with the best shopping experience.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-[#c55e85] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Experience the Difference</h2>
        <p className="max-w-2xl mx-auto">
          Join thousands of satisfied customers who have chosen ComplieTab for their jewellery needs. Our commitment to quality and service sets us apart from the rest.
        </p>
      </div>
    </div>
  );
};

export default Features;