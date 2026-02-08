import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('activeOrder');
    return saved ? JSON.parse(saved) : null;
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('activeOrder', JSON.stringify(activeOrder));
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Simulate real-time updates
  useEffect(() => {
    if (activeOrder && activeOrder.statusStep < 3) {
      const timer = setTimeout(() => {
        setActiveOrder(prev => ({ ...prev, statusStep: prev.statusStep + 1 }));
      }, 5000); // Advance status every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderDetails,
      statusStep: 0,
      timestamp: new Date().toISOString(),
    };
    setActiveOrder(newOrder);
    setOrderHistory(prev => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ activeOrder, orderHistory, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);