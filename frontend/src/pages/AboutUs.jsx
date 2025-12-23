import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-pink-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#c55e85]">About Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#c55e85]">
          <h2 className="text-2xl font-semibold mb-4 text-[#c55e85]">Our Story</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome to SuvarnaRup , your premier destination for exquisite jewellery. Founded with a passion for craftsmanship and beauty, we've been adorning lives with timeless pieces since 2025. Our journey began with a simple vision: to make high-quality jewellery accessible to everyone while maintaining the highest standards of craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#c55e85]">
            <h3 className="text-xl font-semibold mb-3 text-[#c55e85]">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide our customers with exceptional jewellery pieces that celebrate life's special moments and everyday beauty, while ensuring the highest standards of quality and customer service.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#c55e85]">
            <h3 className="text-xl font-semibold mb-3 text-[#c55e85]">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted name in jewellery retail, known for our innovative designs, quality craftsmanship, and commitment to customer satisfaction.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#c55e85]">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <h4 className="font-semibold mb-2 text-[#c55e85]">Quality Assurance</h4>
              <p className="text-gray-700">Every piece is carefully inspected to meet our high standards</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <h4 className="font-semibold mb-2 text-[#c55e85]">Expert Craftsmanship</h4>
              <p className="text-gray-700">Created by skilled artisans with years of experience</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <h4 className="font-semibold mb-2 text-[#c55e85]">Customer Service</h4>
              <p className="text-gray-700">Dedicated support team to assist you at every step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;