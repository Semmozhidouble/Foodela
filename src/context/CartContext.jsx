import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], restaurantId: null, restaurantName: null };
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      // If adding from a different restaurant, warn (but this is handled in component)
      const newRestaurantId = item.restaurantId || prev.restaurantId;
      const newRestaurantName = item.restaurantName || prev.restaurantName;
      
      const existing = prev.items.find(i => i.id === item.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        };
      }
      return {
        items: [...prev.items, { ...item, quantity: 1 }],
        restaurantId: newRestaurantId,
        restaurantName: newRestaurantName
      };
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updatedItems = prev.items.filter(i => i.id !== id);
      return {
        items: updatedItems,
        restaurantId: updatedItems.length > 0 ? prev.restaurantId : null,
        restaurantName: updatedItems.length > 0 ? prev.restaurantName : null
      };
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i)
    }));
  };

  const clearCart = () => {
    setCart({ items: [], restaurantId: null, restaurantName: null });
  };

  const reorderItems = (itemsToReorder) => {
    setCart(prev => {
      const newItems = [...prev.items];
      itemsToReorder.forEach(item => {
        const existingIndex = newItems.findIndex(i => i.id === item.id);
        if (existingIndex > -1) {
          newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + item.quantity };
        } else {
          newItems.push({ ...item });
        }
      });
      return {
        items: newItems,
        restaurantId: prev.restaurantId || itemsToReorder[0]?.restaurantId,
        restaurantName: prev.restaurantName || itemsToReorder[0]?.restaurantName
      };
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Legacy support - expose cartItems for backward compatibility
  const cartItems = cart.items;

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartItems, 
      isCartOpen, 
      setIsCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      reorderItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);