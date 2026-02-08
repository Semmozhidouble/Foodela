package com.Foodela.app.dto;

import com.Foodela.app.model.MenuItem;

public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String category;
    private Boolean isVegetarian;
    private Boolean isAvailable;

    public MenuItemDTO() {}

    public MenuItemDTO(Long id, String name, String description, Double price, String image,
                       String category, Boolean isVegetarian, Boolean isAvailable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.isVegetarian = isVegetarian;
        this.isAvailable = isAvailable;
    }

    public static MenuItemDTO fromMenuItem(MenuItem menuItem) {
        return new MenuItemDTO(
            menuItem.getId(),
            menuItem.getName(),
            menuItem.getDescription(),
            menuItem.getPrice(),
            menuItem.getImage(),
            menuItem.getCategory(),
            menuItem.getIsVegetarian(),
            menuItem.getIsAvailable()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getIsVegetarian() { return isVegetarian; }
    public void setIsVegetarian(Boolean isVegetarian) { this.isVegetarian = isVegetarian; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
}
