package com.Foodela.app.dto;

import java.util.List;

public class MenuCategoryDTO {
    private String name;
    private List<MenuItemDTO> items;

    public MenuCategoryDTO() {}

    public MenuCategoryDTO(String name, List<MenuItemDTO> items) {
        this.name = name;
        this.items = items;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<MenuItemDTO> getItems() { return items; }
    public void setItems(List<MenuItemDTO> items) { this.items = items; }
}
