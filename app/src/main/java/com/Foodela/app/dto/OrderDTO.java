package com.Foodela.app.dto;

import com.Foodela.app.model.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {
    private Long id;
    private Long restaurantId;
    private String restaurantName;
    private Double totalAmount;
    private Double deliveryFee;
    private Double taxAmount;
    private String status;
    private String paymentMethod;
    private String paymentStatus;
    private String deliveryAddress;
    private String deliveryInstructions;
    private Integer estimatedDeliveryTime;
    private List<OrderItemDTO> items;
    private LocalDateTime createdAt;

    public static class OrderItemDTO {
        private Long id;
        private String itemName;
        private Integer quantity;
        private Double price;

        public OrderItemDTO() {}

        public OrderItemDTO(Long id, String itemName, Integer quantity, Double price) {
            this.id = id;
            this.itemName = itemName;
            this.quantity = quantity;
            this.price = price;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getItemName() { return itemName; }
        public void setItemName(String itemName) { this.itemName = itemName; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }

    public OrderDTO() {}

    public OrderDTO(Long id, Long restaurantId, String restaurantName, Double totalAmount,
                    Double deliveryFee, Double taxAmount, String status, String paymentMethod, 
                    String paymentStatus, String deliveryAddress, String deliveryInstructions,
                    Integer estimatedDeliveryTime, List<OrderItemDTO> items, LocalDateTime createdAt) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.totalAmount = totalAmount;
        this.deliveryFee = deliveryFee;
        this.taxAmount = taxAmount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.deliveryAddress = deliveryAddress;
        this.deliveryInstructions = deliveryInstructions;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.items = items;
        this.createdAt = createdAt;
    }

    public static OrderDTO fromOrder(Order order) {
        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
            .map(item -> new OrderItemDTO(
                item.getId(),
                item.getMenuItem().getName(),
                item.getQuantity(),
                item.getPrice()
            ))
            .collect(Collectors.toList());

        return new OrderDTO(
            order.getId(),
            order.getRestaurant().getId(),
            order.getRestaurant().getName(),
            order.getTotalAmount(),
            order.getDeliveryFee(),
            order.getTaxAmount(),
            order.getStatus().toString(),
            order.getPaymentMethod() != null ? order.getPaymentMethod().toString() : null,
            order.getPaymentStatus() != null ? order.getPaymentStatus().toString() : null,
            order.getDeliveryAddress(),
            order.getDeliveryInstructions(),
            order.getEstimatedDeliveryTime(),
            itemDTOs,
            order.getCreatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    public Double getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Double deliveryFee) { this.deliveryFee = deliveryFee; }
    public Double getTaxAmount() { return taxAmount; }
    public void setTaxAmount(Double taxAmount) { this.taxAmount = taxAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getDeliveryInstructions() { return deliveryInstructions; }
    public void setDeliveryInstructions(String deliveryInstructions) { this.deliveryInstructions = deliveryInstructions; }
    public Integer getEstimatedDeliveryTime() { return estimatedDeliveryTime; }
    public void setEstimatedDeliveryTime(Integer estimatedDeliveryTime) { this.estimatedDeliveryTime = estimatedDeliveryTime; }
    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
