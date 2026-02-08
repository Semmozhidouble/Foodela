import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants } from '../data/mockData';
import EmptyState from '../components/EmptyState';

const Favorites = () => {
  const { favorites } = useFavorites();
  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-800">My Favorites</h1>
        </div>

        {favoriteRestaurants.length === 0 ? (
          <EmptyState 
            icon={Heart}
            title="No favorites yet"
            description="Start exploring and save your favorite restaurants!"
            actionText="Explore Restaurants"
            actionLink="/restaurants"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={restaurant.id} 
                data={restaurant} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;