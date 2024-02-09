
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        totalAmount: state.totalAmount + action.payload.price,
      };

    case 'REMOVE_ITEM':
      const updatedCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        cartItems: updatedCart,
        totalQuantity: state.totalQuantity - action.payload.quantity,
        totalAmount: state.totalAmount - action.payload.price * action.payload.quantity,
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += action.payload.change;
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedItems,
        totalQuantity: state.totalQuantity + action.payload.change,
        totalAmount: state.totalAmount + action.payload.price * action.payload.change,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Fetch your JSON data and update the initial state here
    // Replace the placeholder URL with your actual API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_JSON_API_URL');
        const data = await response.json();
        // Update state with fetched data
        // For example: dispatch({ type: 'SET_DATA', payload: data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
