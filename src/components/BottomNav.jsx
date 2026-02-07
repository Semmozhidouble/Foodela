import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const location = useLocation();
  const { setIsCartOpen, cartItems } = useCart();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 pb-safe pt-2 px-6 md:hidden z-40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-md mx-auto pb-4">
        <Link to="/" className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-slate-400'}`}>
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        </Link>
        
        <Link to="/restaurants" className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${isActive('/restaurants') ? 'text-primary' : 'text-slate-400'}`}>
          <Search size={24} strokeWidth={isActive('/restaurants') ? 2.5 : 2} />
        </Link>
        
        <button onClick={() => setIsCartOpen(true)} className="p-2 rounded-xl transition-all flex flex-col items-center gap-1 text-slate-400 relative">
          <ShoppingBag size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-white"></span>
          )}
        </button>
        
        <Link to="/profile" className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-slate-400'}`}>
          <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;