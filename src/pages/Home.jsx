import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import CategoryStrip from './CategoryStrip';
import FeaturedSection from './FeaturedSection';
import Recommendations from './Recommendations';
import CartDrawer from '../components/CartDrawer';
import { restaurantAPI } from '../services/apiService';
import { useCinematic } from '../context/CinematicContext';
import CinematicToggle from '../components/CinematicToggle';
import SoundToggle from '../components/SoundToggle';

export default function Home() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isCinematic } = useCinematic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurants
        const restaurants = await restaurantAPI.getAll().catch(() => []);
        
        // Filter for featured (mock logic: top rated or specific flag)
        const featured = restaurants.filter(r => r.rating >= 4.5).slice(0, 5);
        setFeaturedRestaurants(featured.length > 0 ? featured : []);

        // Mock recommendations from restaurant menus
        // In a real app, this would be a dedicated endpoint like restaurantAPI.getRecommendations()
        const recommendations = [];
        if (restaurants.length > 0) {
          // Try to get items from the first few restaurants
          for (let i = 0; i < Math.min(3, restaurants.length); i++) {
            const menu = await restaurantAPI.getMenuByCategories(restaurants[i].id).catch(() => []);
            if (menu && menu.length > 0 && menu[0].items) {
              recommendations.push(...menu[0].items.slice(0, 2).map(item => ({...item, restaurantName: restaurants[i].name})));
            }
          }
        }
        setRecommendedItems(recommendations.slice(0, 4));
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`min-h-screen selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden relative transition-colors duration-700 ${isCinematic ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
      {/* Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {/* Cinematic Overlay */}
      <div className={`fixed inset-0 bg-black/90 z-40 pointer-events-none transition-opacity duration-700 ${isCinematic ? 'opacity-100' : 'opacity-0'}`} />
      
      <Hero />
      <CategoryStrip />
      <FeaturedSection restaurants={featuredRestaurants} loading={loading} />
      <Recommendations items={recommendedItems} loading={loading} />
      <CartDrawer />
      <CinematicToggle />
      <SoundToggle />
    </div>
  );
}