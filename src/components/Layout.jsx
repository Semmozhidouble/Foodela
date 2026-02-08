import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import CartDrawer from './CartDrawer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  // Hide BottomNav on auth pages to reduce distraction
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`min-h-screen bg-slate-50 transition-colors duration-300 ${!isAuthPage ? 'pb-24 md:pb-0' : ''}`}>
      <Navbar />
      <CartDrawer />
      {!isAuthPage && <BottomNav />}
      <main className="relative w-full">{children}</main>
    </div>
  );
};

export default Layout;