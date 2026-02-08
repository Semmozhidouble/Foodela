import React, { createContext, useContext, useState, useEffect } from 'react';
import websocketService from '../services/websocket';
import { orderAPI } from '../services/apiService';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

const statusSteps = {
  'PLACED': 0,
  'CONFIRMED': 1,
  'PREPARING': 2,
  'OUT_FOR_DELIVERY': 3,
  'DELIVERED': 4
};

export const OrderProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Connect WebSocket only when there's an active order
  useEffect(() => {
    if (activeOrder) {
      websocketService.connect(() => {
        console.log('🔌 WebSocket connected for order tracking');
        setIsConnected(true);
      });

      return () => {
        websocketService.disconnect();
        setIsConnected(false);
      };
    }
  }, [activeOrder]);

  // Subscribe to active order updates
  useEffect(() => {
    if (activeOrder && isConnected) {
      websocketService.subscribeToOrder(activeOrder.id, (update) => {
        console.log('📬 Order update received:', update);
        
        setActiveOrder(prev => ({
          ...prev,
          status: update.status,
          statusStep: statusSteps[update.status] || prev.statusStep,
          lastUpdate: update.timestamp,
          message: update.message
        }));
      });

      return () => {
        websocketService.unsubscribeFromOrder(activeOrder.id);
      };
    }
  }, [activeOrder, isConnected]);

  const placeOrder = async (orderDetails) => {
    try {
      const response = await orderAPI.create(orderDetails);
      
      const newOrder = {
        ...response,
        statusStep: statusSteps[response.status] || 0,
        message: 'Order placed successfully'
      };
      
      setActiveOrder(newOrder);
      setOrderHistory(prev => [newOrder, ...prev]);
      
      return { success: true, order: newOrder };
    } catch (error) {
      console.error('Failed to place order:', error);
      return { success: false, error: error.message };
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const orders = await orderAPI.getMyOrders();
      setOrderHistory(orders);
    } catch (error) {
      console.error('Failed to fetch order history:', error);
    }
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
  };

  return (
    <OrderContext.Provider value={{ 
      activeOrder, 
      orderHistory, 
      placeOrder,
      fetchOrderHistory,
      clearActiveOrder,
      isConnected
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
