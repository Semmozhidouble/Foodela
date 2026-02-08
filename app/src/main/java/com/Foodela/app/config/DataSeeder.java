package com.Foodela.app.config;

import com.Foodela.app.model.MenuItem;
import com.Foodela.app.model.Restaurant;
import com.Foodela.app.model.User;
import com.Foodela.app.repository.MenuItemRepository;
import com.Foodela.app.repository.RestaurantRepository;
import com.Foodela.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(RestaurantRepository restaurantRepository, 
                                    MenuItemRepository menuItemRepository,
                                    UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        return args -> {
            // Create test user if not exists
            if (userRepository.findByEmail("test@foodela.com").isEmpty()) {
                User testUser = new User();
                testUser.setEmail("test@foodela.com");
                testUser.setPassword(passwordEncoder.encode("test123"));
                testUser.setName("Test User");
                testUser.setCreatedAt(LocalDateTime.now());
                testUser.setUpdatedAt(LocalDateTime.now());
                
                userRepository.save(testUser);
                System.out.println("✅ Test user created: test@foodela.com / test123");
            }
            
            // Only seed if database is empty
            if (restaurantRepository.count() == 0) {
                // Create Restaurants
                Restaurant burgerHouse = createRestaurant(
                    "The Burger House",
                    "Juicy gourmet burgers crafted to perfection",
                    "American",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
                    4.8,
                    25,
                    2.99
                );

                Restaurant sushiMaster = createRestaurant(
                    "Sushi Master",
                    "Authentic Japanese cuisine with fresh ingredients",
                    "Japanese",
                    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
                    4.9,
                    35,
                    3.99
                );

                Restaurant pizzaCorner = createRestaurant(
                    "Pizza Corner",
                    "Traditional Italian pizzas baked in wood-fired ovens",
                    "Italian",
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
                    4.7,
                    30,
                    2.49
                );

                Restaurant veggieDeli = createRestaurant(
                    "Green Veggie Delight",
                    "Fresh and healthy vegetarian meals",
                    "Vegetarian",
                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
                    4.6,
                    20,
                    1.99
                );

                // Save restaurants
                restaurantRepository.saveAll(Arrays.asList(burgerHouse, sushiMaster, pizzaCorner, veggieDeli));

                // Create Menu Items for Burger House
                createMenuItem(burgerHouse, "Classic Burger", "Beef patty with lettuce, tomato, and special sauce", 12.99, "Burgers", false, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80");
                createMenuItem(burgerHouse, "Cheese Deluxe", "Double beef with cheddar and bacon", 15.99, "Burgers", false, "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80");
                createMenuItem(burgerHouse, "Veggie Burger", "Plant-based patty with avocado", 11.99, "Burgers", true, "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80");
                createMenuItem(burgerHouse, "Crispy Fries", "Golden french fries", 4.99, "Sides", true, "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&q=80");

                // Create Menu Items for Sushi Master
                createMenuItem(sushiMaster, "California Roll", "Crab, avocado, and cucumber", 9.99, "Rolls", false, "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80");
                createMenuItem(sushiMaster, "Salmon Nigiri", "Fresh salmon over sushi rice", 12.99, "Nigiri", false, "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&q=80");
                createMenuItem(sushiMaster, "Spicy Tuna Roll", "Tuna with spicy mayo", 11.99, "Rolls", false, "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&q=80");
                createMenuItem(sushiMaster, "Miso Soup", "Traditional Japanese soup", 3.99, "Soups", true, "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80");

                // Create Menu Items for Pizza Corner
                createMenuItem(pizzaCorner, "Margherita", "Tomato, mozzarella, and basil", 13.99, "Pizza", true, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80");
                createMenuItem(pizzaCorner, "Pepperoni", "Classic pepperoni pizza", 15.99, "Pizza", false, "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80");
                createMenuItem(pizzaCorner, "Quattro Formaggi", "Four cheese blend", 16.99, "Pizza", true, "https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=400&q=80");
                createMenuItem(pizzaCorner, "Caesar Salad", "Fresh romaine with parmesan", 7.99, "Salads", true, "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80");

                // Create Menu Items for Veggie Delight
                createMenuItem(veggieDeli, "Buddha Bowl", "Quinoa, chickpeas, and veggies", 11.99, "Bowls", true, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80");
                createMenuItem(veggieDeli, "Avocado Toast", "Sourdough with smashed avocado", 8.99, "Toast", true, "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&q=80");
                createMenuItem(veggieDeli, "Green Smoothie", "Spinach, banana, and almond milk", 5.99, "Drinks", true, "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&q=80");
                createMenuItem(veggieDeli, "Hummus Plate", "Homemade hummus with pita", 6.99, "Appetizers", true, "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80");

                menuItemRepository.saveAll(burgerHouse.getMenuItems());
                menuItemRepository.saveAll(sushiMaster.getMenuItems());
                menuItemRepository.saveAll(pizzaCorner.getMenuItems());
                menuItemRepository.saveAll(veggieDeli.getMenuItems());

                System.out.println("✅ Database seeded with sample restaurants and menu items!");
            }
        };
    }

    private Restaurant createRestaurant(String name, String description, String cuisine, 
                                        String image, Double rating, Integer deliveryTime, 
                                        Double deliveryFee) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(name);
        restaurant.setDescription(description);
        restaurant.setCuisine(cuisine);
        restaurant.setImage(image);
        restaurant.setRating(rating);
        restaurant.setDeliveryTime(deliveryTime);
        restaurant.setDeliveryFee(deliveryFee);
        restaurant.setIsOpen(true);
        restaurant.setAddress("Downtown, New York");
        return restaurant;
    }

    private void createMenuItem(Restaurant restaurant, String name, String description, 
                                 Double price, String category, Boolean isVegetarian, 
                                 String image) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price);
        menuItem.setCategory(category);
        menuItem.setIsVegetarian(isVegetarian);
        menuItem.setImage(image);
        menuItem.setIsAvailable(true);
        menuItem.setRestaurant(restaurant);
        restaurant.getMenuItems().add(menuItem);
    }
}
