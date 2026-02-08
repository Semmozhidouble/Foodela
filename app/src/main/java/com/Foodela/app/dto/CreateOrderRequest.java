package com.Foodela.app.dto;

import java.util.List;

public class CreateOrderRequest {
    private Long restaurantId;
    private List<OrderItemRequest> items;
    private String deliveryAddress;
    private String deliveryInstructions;
    private String paymentMethod; // COD, UPI, CREDIT_CARD, DEBIT_CARD, WALLET

    public static class OrderItemRequest {
        private Long menuItemId;
        private Integer quantity;

        public OrderItemRequest() {}

        public OrderItemRequest(Long menuItemId, Integer quantity) {
            this.menuItemId = menuItemId;
            this.quantity = quantity;
        }

        public Long getMenuItemId() { return menuItemId; }
        public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public CreateOrderRequest() {}

    public CreateOrderRequest(Long restaurantId, List<OrderItemRequest> items, String deliveryAddress, 
                              String deliveryInstructions, String paymentMethod) {
        this.restaurantId = restaurantId;
        this.items = items;
        this.deliveryAddress = deliveryAddress;
        this.deliveryInstructions = deliveryInstructions;
        this.paymentMethod = paymentMethod;
    }

    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getDeliveryInstructions() { return deliveryInstructions; }
    public void setDeliveryInstructions(String deliveryInstructions) { this.deliveryInstructions = deliveryInstructions; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
