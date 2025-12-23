import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [

    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all our products. Items must be unworn and in their original packaging with tags attached. Please contact our customer service team to initiate a return.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates during checkout.'
    },
    {
      question: 'How do I care for my jewellery?',
      answer: 'We recommend storing your jewellery in a cool, dry place and cleaning it regularly with a soft cloth. Avoid exposure to chemicals and remove jewellery before swimming or showering.'
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic and come with a certificate of authenticity. We source our materials from trusted suppliers and maintain strict quality control.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal. All payments are processed securely through our payment gateway.'
    },

  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-semibold text-left">{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <FiChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-6 bg-gray-50 rounded-b-lg shadow-md">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;