import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';

const PayPalBtn = ({ onSuccess, onError }) => {
  const { cart } = useSelector((state) => state.cart);

  // Calculate total amount from cart
  const amount = cart?.products?.reduce(
    (total, product) => total + (product.price * product.quantity),
    0
  ) || 0;

  return (
    <PayPalScriptProvider options={{
      "client-id": "AZ6PNLpcyJ8y-V7AgbDrUpIQ3Z5RjW_nkEaATaR_ow9O2OqbEqNXO84ilGoA2ULo01iU9lkXfLy2UUcl"
    }}>
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: amount.toString()
              },
              description: 'SuvarnaRup Jewelry Purchase'
            }]
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const orderDetails = await actions.order.capture();
            onSuccess(orderDetails);
          } catch (error) {
            console.error('PayPal capture error:', error);
            onError(error);
          }
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalBtn;