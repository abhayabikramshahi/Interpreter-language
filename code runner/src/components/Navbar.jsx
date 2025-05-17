import React, { useState, useEffect } from "react";
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <FaCode className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-gray-900 font-bold text-xl tracking-wide select-none cursor-default">
              AbhayaCDZRUNNER
            </h1>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Home
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600 rounded"></span>
            </a>
            <a
              href="/runner"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Code Runner
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600 rounded"></span>
            </a>
            <a
              href="/companies"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Companies
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600 rounded"></span>
            </a>
            <a
              href="/runner"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Try Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/runner"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Code Runner
          </a>
          <a
            href="/companies"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Companies
          </a>
          <a
            href="/runner"
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Try Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
