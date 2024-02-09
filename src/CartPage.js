// src/CartPage.js
import React from 'react';
import { CartProvider } from './CartContext';
import Cart from './Cart';

const CartPage = () => {
  return (
    <CartProvider>
      <div>
        <Cart />
      </div>
    </CartProvider>
  );
};

export default CartPage;
