package com.Foodela.app.service;

import com.Foodela.app.dto.MenuCategoryDTO;
import com.Foodela.app.dto.MenuItemDTO;
import com.Foodela.app.dto.RestaurantDTO;
import com.Foodela.app.model.Restaurant;
import com.Foodela.app.repository.MenuItemRepository;
import com.Foodela.app.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    public RestaurantService(RestaurantRepository restaurantRepository, MenuItemRepository menuItemRepository) {
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<RestaurantDTO> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(RestaurantDTO::fromRestaurant)
                .collect(Collectors.toList());
    }

    public RestaurantDTO getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return RestaurantDTO.fromRestaurant(restaurant);
    }

    public List<MenuItemDTO> getRestaurantMenu(Long restaurantId) {
        // Verify restaurant exists
        restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return menuItemRepository.findByRestaurantId(restaurantId).stream()
                .map(MenuItemDTO::fromMenuItem)
                .collect(Collectors.toList());
    }
    
    public List<MenuCategoryDTO> getRestaurantMenuByCategory(Long restaurantId) {
        // Verify restaurant exists
        restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        List<MenuItemDTO> menuItems = menuItemRepository.findByRestaurantId(restaurantId).stream()
                .map(MenuItemDTO::fromMenuItem)
                .collect(Collectors.toList());

        // Group by category
        Map<String, List<MenuItemDTO>> groupedByCategory = menuItems.stream()
                .collect(Collectors.groupingBy(item -> 
                    item.getCategory() != null ? item.getCategory() : "Other"));

        // Convert to MenuCategoryDTO list
        return groupedByCategory.entrySet().stream()
                .map(entry -> new MenuCategoryDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
