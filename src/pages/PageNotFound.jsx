import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-8xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-6">
          Seems like you've hit a dead end. This page doesn't exist or might have been moved.
        </p>
        <p className="text-gray-500 text-sm mb-8 italic">
          “Not all who wander are lost, but you might be.” 😅
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-red-500/30"
        >
          Take Me Home
        </Link>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
