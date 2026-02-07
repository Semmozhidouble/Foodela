export const restaurants = [
  {
    id: 1,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.8,
    time: "25-35 min",
    tags: ["Japanese", "Sushi", "Premium"],
    priceRange: "$$$"
  },
  {
    id: 2,
    name: "Burger Lab",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    rating: 4.5,
    time: "15-25 min",
    tags: ["American", "Burgers", "Fast Food"],
    priceRange: "$$"
  },
  {
    id: 3,
    name: "La Pizzeria",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    rating: 4.7,
    time: "30-40 min",
    tags: ["Italian", "Pizza", "Pasta"],
    priceRange: "$$"
  },
  {
    id: 4,
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    rating: 4.9,
    time: "20-30 min",
    tags: ["Healthy", "Salads", "Vegan"],
    priceRange: "$$$"
  }
];

export const categories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burger", icon: "🍔" },
  { id: 3, name: "Sushi", icon: "🍣" },
  { id: 4, name: "Vegan", icon: "🥗" },
];

export const menuItems = [
  {
    id: 1,
    restaurantId: 1,
    name: "Volcano Roll",
    description: "Spicy tuna, cucumber, topped with salmon, spicy mayo and tobiko",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1617196034496-64ac796002bb?w=800&q=80",
    category: "Signature Rolls",
    rating: 4.8,
    isVeg: false
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Truffle Nigiri Platter",
    description: "Selection of premium fish topped with black truffle shavings",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
    category: "Nigiri",
    rating: 4.9,
    isVeg: false
  },
  {
    id: 3,
    restaurantId: 1,
    name: "Miso Glazed Black Cod",
    description: "Sustainably sourced cod marinated in sweet miso glaze",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    category: "Hot Dishes",
    rating: 4.7,
    isVeg: false
  },
  {
    id: 4,
    restaurantId: 1,
    name: "Avocado Maki",
    description: "Fresh avocado rolled with sushi rice and nori",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    category: "Maki",
    rating: 4.5,
    isVeg: true
  }
];

export const currentUser = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 012-3456",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80",
  address: "123 Innovation Dr, Tech City, TC 90210"
};

export const orderHistory = [
  {
    id: "ORD-2024-001",
    restaurantId: 1,
    restaurantName: "Sushi Master",
    date: "Feb 24, 2024",
    status: "Delivered",
    total: 42.50,
    items: "Volcano Roll, Miso Soup, Green Tea",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80"
  },
  {
    id: "ORD-2024-002",
    restaurantId: 2,
    restaurantName: "Burger Lab",
    date: "Feb 20, 2024",
    status: "Delivered",
    total: 28.90,
    items: "Classic Burger, Fries, Coke",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"
  }
];