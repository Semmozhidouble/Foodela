import React from 'react';
import Hero from '../components/home/Hero';
import CategoryStrip from '../components/home/CategoryStrip';
import FeaturedSection from '../components/home/FeaturedSection';
import Recommendations from '../components/home/Recommendations';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Hero />
      <CategoryStrip />
      <FeaturedSection />
      <Recommendations />
      <CartDrawer />
    </div>
  );
}