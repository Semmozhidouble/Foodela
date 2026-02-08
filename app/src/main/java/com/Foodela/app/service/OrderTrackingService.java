package com.Foodela.app.service;

import com.Foodela.app.dto.OrderStatusUpdate;
import com.Foodela.app.model.Order;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderTrackingService {

    private final SimpMessagingTemplate messagingTemplate;

    public OrderTrackingService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void broadcastOrderUpdate(Long orderId, Order.OrderStatus status, String message) {
        OrderStatusUpdate update = new OrderStatusUpdate(
            orderId,
            status.toString(),
            message,
            LocalDateTime.now()
        );

        // Send update to specific order topic
        messagingTemplate.convertAndSend("/topic/orders/" + orderId, update);
    }

    public void simulateOrderProgress(Long orderId) {
        // Simulate order status progression in background
        new Thread(() -> {
            try {
                Thread.sleep(5000); // Wait 5 seconds
                broadcastOrderUpdate(orderId, Order.OrderStatus.CONFIRMED, "Restaurant confirmed your order");

                Thread.sleep(10000); // Wait 10 more seconds
                broadcastOrderUpdate(orderId, Order.OrderStatus.PREPARING, "Your food is being prepared");

                Thread.sleep(15000); // Wait 15 more seconds
                broadcastOrderUpdate(orderId, Order.OrderStatus.OUT_FOR_DELIVERY, "Your order is on the way");

                Thread.sleep(20000); // Wait 20 more seconds
                broadcastOrderUpdate(orderId, Order.OrderStatus.DELIVERED, "Order delivered! Enjoy your meal!");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
