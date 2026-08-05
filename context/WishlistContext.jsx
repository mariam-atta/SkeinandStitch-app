'use client';

import { createContext, useState, useEffect, useContext } from 'react';

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlistItems');
    if (saved) setWishlistItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  function toggleWishlist(product) {
    const alreadySaved = wishlistItems.some((item) => item.id === product.id);

    if (alreadySaved) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;

export function useWishlist() {
  return useContext(WishlistContext);
}