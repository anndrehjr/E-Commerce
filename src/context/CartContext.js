import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        // Item já existe, atualiza a quantidade
        return {
          ...state,
          items: state.items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Item novo, adiciona ao carrinho
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  const updateQuantity = (itemId, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartTotal = state.items.reduce(
    (total, item) => total + parseFloat(item.price.replace('R$', '').trim()) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
