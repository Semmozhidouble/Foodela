import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { setIsCartOpen, cartItems } = useCart();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 hidden sm:block">
            Foodela
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center bg-slate-100/50 rounded-2xl px-4 py-2.5 w-96 border border-white/50 focus-within:ring-2 ring-primary/20 transition-all">
          <Search size={20} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search for food, restaurants..." 
            className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.button onClick={() => setIsCartOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl hover:bg-slate-100/50 transition-colors relative">
            <ShoppingBag size={24} className="text-slate-700" />
            {cartItems.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
            )}
          </motion.button>
          
          <Link to="/profile">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl hover:bg-slate-100/50 transition-colors hidden sm:block cursor-pointer">
              <User size={24} className="text-slate-700" />
            </motion.div>
          </Link>

          <button className="sm:hidden p-2"><Menu size={24} /></button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;