import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

export function PageTransition({ children, isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle invalid routes
    const validRoutes = ['/', '/products/cadernos', '/products/presente', '/products/canecas', '/products/adesivos'];
    if (!validRoutes.includes(location.pathname)) {
      // Check if it's a product route that's invalid
      if (location.pathname.startsWith('/products/')) {
        navigate('/');
      }
    }
  }, [location, navigate]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

