'use client';

import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load saved cart from localStorage once, on first mount
  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save to localStorage automatically whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, selectedColor, selectedSize) {
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`;
    const existingItem = cartItems.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, selectedColor, selectedSize, quantity: 1, cartItemId },
      ]);
    }
  }

  function removeFromCart(cartItemId) {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
  }

  function updateQuantity(cartItemId, quantity) {
    setCartItems(
      cartItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}