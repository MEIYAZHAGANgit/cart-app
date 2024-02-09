// src/Cart.js
import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const handleAddItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const handleRemoveItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const handleUpdateQuantity = (item, change) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, change } });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {state.cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleUpdateQuantity(item, 1)}>Increase Quantity</button>
          <button onClick={() => handleUpdateQuantity(item, -1)}>Decrease Quantity</button>
          <button onClick={() => handleRemoveItem(item)}>Remove Item</button>
        </div>
      ))}
      <p>Total Quantity: {state.totalQuantity}</p>
      <p>Total Amount: ${state.totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
