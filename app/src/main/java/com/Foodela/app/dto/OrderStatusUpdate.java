package com.Foodela.app.dto;

import java.time.LocalDateTime;

public class OrderStatusUpdate {
    private Long orderId;
    private String status;
    private String message;
    private LocalDateTime timestamp;

    public OrderStatusUpdate() {}

    public OrderStatusUpdate(Long orderId, String status, String message, LocalDateTime timestamp) {
        this.orderId = orderId;
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
