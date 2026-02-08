package com.Foodela.app.dto;

import com.Foodela.app.model.Restaurant;

public class RestaurantDTO {
    private Long id;
    private String name;
    private String description;
    private String cuisine;
    private String restaurantType;
    private String image;
    private Double rating;
    private Integer deliveryTime;
    private Double deliveryFee;
    private Boolean isOpen;
    private String address;

    public RestaurantDTO() {}

    public RestaurantDTO(Long id, String name, String description, String cuisine, String restaurantType, String image,
                         Double rating, Integer deliveryTime, Double deliveryFee, Boolean isOpen, String address) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cuisine = cuisine;
        this.restaurantType = restaurantType;
        this.image = image;
        this.rating = rating;
        this.deliveryTime = deliveryTime;
        this.deliveryFee = deliveryFee;
        this.isOpen = isOpen;
        this.address = address;
    }

    public static RestaurantDTO fromRestaurant(Restaurant restaurant) {
        return new RestaurantDTO(
            restaurant.getId(),
            restaurant.getName(),
            restaurant.getDescription(),
            restaurant.getCuisine(),
            restaurant.getRestaurantType(),
            restaurant.getImage(),
            restaurant.getRating(),
            restaurant.getDeliveryTime(),
            restaurant.getDeliveryFee(),
            restaurant.getIsOpen(),
            restaurant.getAddress()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public String getRestaurantType() { return restaurantType; }
    public void setRestaurantType(String restaurantType) { this.restaurantType = restaurantType; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(Integer deliveryTime) { this.deliveryTime = deliveryTime; }
    public Double getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Double deliveryFee) { this.deliveryFee = deliveryFee; }
    public Boolean getIsOpen() { return isOpen; }
    public void setIsOpen(Boolean isOpen) { this.isOpen = isOpen; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
