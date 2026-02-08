import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants } from '../data/mockData';

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
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Heart size={40} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No favorites yet</h2>
            <p className="text-slate-500 mb-8">Start exploring and save your favorite restaurants!</p>
            <Link to="/restaurants" className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all">
              Explore Restaurants
            </Link>
          </div>
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