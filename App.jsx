import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantMenu from './pages/RestaurantMenu';
import CartDrawer from './components/CartDrawer';
import Profile from './pages/Profile';
import Restaurants from './pages/Restaurants';
import BottomNav from './components/BottomNav';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <CartDrawer />
          <BottomNav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/profile" element={<Profile />} />
              {/* Add other routes here later */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;