import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import CartDrawer from './CartDrawer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <CartDrawer />
      <BottomNav />
      <main className="relative min-h-[calc(100vh-80px)]">{children}</main>
    </div>
  );
};

export default Layout;