package com.Foodela.app.service;

import com.Foodela.app.dto.OrderStatusUpdate;
import com.Foodela.app.model.Order;
import com.Foodela.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OrderSimulationService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Random random = new Random();

    private final String[] deliveryPartnerNames = {
        "Michael Rodriguez", "Sarah Johnson", "David Chen", "Emily Williams", 
        "James Martinez", "Lisa Anderson", "Robert Taylor", "Maria Garcia"
    };

    private final String[] deliveryPartnerPhotos = {
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
    };

    @Async
    public void simulateOrderProgress(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order == null) return;

            // Step 1: Restaurant Confirms (after 30 seconds)
            Thread.sleep(30000);
            if (!orderRepository.existsById(orderId)) return;
            
            order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus(Order.OrderStatus.CONFIRMED);
            order.setAcceptedAt(LocalDateTime.now());
            orderRepository.save(order);
            
            sendUpdate(orderId, "CONFIRMED", "Restaurant has confirmed your order!");

            // Step 2: Preparing (after 2 minutes)
            Thread.sleep(120000);
            if (!orderRepository.existsById(orderId)) return;
            
            order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus(Order.OrderStatus.PREPARING);
            order.setPreparingAt(LocalDateTime.now());
            orderRepository.save(order);
            
            sendUpdate(orderId, "PREPARING", "Your food is being prepared!");

            // Step 3: Ready (after 10 minutes)
            Thread.sleep(600000);
            if (!orderRepository.existsById(orderId)) return;
            
            order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus(Order.OrderStatus.READY);
            order.setReadyAt(LocalDateTime.now());
            
            // Assign delivery partner
            int partnerIndex = random.nextInt(deliveryPartnerNames.length);
            order.setDeliveryPartnerName(deliveryPartnerNames[partnerIndex]);
            order.setDeliveryPartnerPhone(generatePhoneNumber());
            order.setDeliveryPartnerPhoto(deliveryPartnerPhotos[partnerIndex]);
            
            orderRepository.save(order);
            
            sendUpdate(orderId, "READY", "Your order is ready for pickup!");

            // Step 4: Out for Delivery (after 2 minutes)
            Thread.sleep(120000);
            if (!orderRepository.existsById(orderId)) return;
            
            order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus(Order.OrderStatus.OUT_FOR_DELIVERY);
            order.setOutForDeliveryAt(LocalDateTime.now());
            orderRepository.save(order);
            
            sendUpdate(orderId, "OUT_FOR_DELIVERY", order.getDeliveryPartnerName() + " is on the way!");

            // Step 5: Delivered (after 15 minutes)
            Thread.sleep(900000);
            if (!orderRepository.existsById(orderId)) return;
            
            order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus(Order.OrderStatus.DELIVERED);
            order.setDeliveredAt(LocalDateTime.now());
            order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
            orderRepository.save(order);
            
            sendUpdate(orderId, "DELIVERED", "Your order has been delivered. Enjoy your meal!");

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.err.println("Error in order simulation: " + e.getMessage());
        }
    }

    private void sendUpdate(Long orderId, String status, String message) {
        OrderStatusUpdate update = new OrderStatusUpdate(
            orderId,
            status,
            message,
            LocalDateTime.now()
        );
        
        messagingTemplate.convertAndSend("/topic/orders/" + orderId, update);
        System.out.println("📤 Sent WebSocket update: Order #" + orderId + " -> " + status);
    }

    private String generatePhoneNumber() {
        return String.format("+1 (%03d) %03d-%04d", 
            random.nextInt(900) + 100,
            random.nextInt(900) + 100,
            random.nextInt(9000) + 1000);
    }
}
