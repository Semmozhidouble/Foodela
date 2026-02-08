package com.Foodela.app.controller;

import com.Foodela.app.dto.CreateOrderRequest;
import com.Foodela.app.dto.OrderDTO;
import com.Foodela.app.model.User;
import com.Foodela.app.service.OrderService;
import com.Foodela.app.service.OrderTrackingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderTrackingService orderTrackingService;

    public OrderController(OrderService orderService, OrderTrackingService orderTrackingService) {
        this.orderService = orderService;
        this.orderTrackingService = orderTrackingService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request, 
                                         Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("message", "Authentication required")
            );
        }

        try {
            User user = (User) authentication.getPrincipal();
            OrderDTO order = orderService.createOrder(request, user.getId());
            
            // Start simulated order tracking
            orderTrackingService.simulateOrderProgress(order.getId());
            
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
            );
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId, 
                                      Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("message", "Authentication required")
            );
        }

        try {
            User user = (User) authentication.getPrincipal();
            OrderDTO order = orderService.getOrderById(orderId, user.getId());
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
            );
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyOrders(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("message", "Authentication required")
            );
        }

        User user = (User) authentication.getPrincipal();
        List<OrderDTO> orders = orderService.getUserOrders(user.getId());
        return ResponseEntity.ok(orders);
    }
}
