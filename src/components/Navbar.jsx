import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaBars, FaTimes, FaInfoCircle, FaBook, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/runner', label: 'Code Runner' },
  { path: '/about', label: 'About' },
  { path: '/docs', label: 'Docs' },
  { path: '/contact', label: 'Contact' }
];

const infoNavItems = [
  { path: '/about', label: 'About', icon: <FaInfoCircle className="inline mr-1" /> },
  { path: '/docs', label: 'Docs', icon: <FaBook className="inline mr-1" /> },
  { path: '/contact', label: 'Contact', icon: <FaEnvelope className="inline mr-1" /> }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ path, label, isMobile = false }) => {
    const baseClasses = isMobile
      ? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
      : 'text-white font-medium hover:text-blue-400 transition-colors duration-200 relative group';

    const activeClasses = isActive(path)
      ? isMobile
        ? 'text-blue-400 bg-gray-900'
        : 'text-blue-400'
      : isMobile
        ? 'text-white hover:text-blue-400 hover:bg-gray-900'
        : '';

    return (
      <Link to={path} className={`${baseClasses} ${activeClasses}`}>
        {label}
        {!isMobile && (
          <span className={`block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-400 rounded ${
            isActive(path) ? 'max-w-full' : ''
          }`}></span>
        )}
      </Link>
    );
  };

  return (
    <header className="w-full z-50 sticky top-0 left-0 backdrop-blur-md bg-black/90 shadow-md">
      {/* Top Info Bar */}
      <div className="bg-gray-900 border-b border-gray-800 text-white text-sm py-1 px-4 flex justify-end space-x-6 backdrop-blur-md">
        {infoNavItems.map(({ path, label, icon }) => (
          <Link key={path} to={path} className="hover:underline flex items-center gap-1">
            {icon}{label}
          </Link>
        ))}
      </div>
      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-lg shadow-lg'
          : 'bg-black/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaCode className="h-8 w-8 text-blue-400 mr-2" />
              <h1 className="text-white font-bold text-xl tracking-wide select-none cursor-default">
                Abhaya Language
              </h1>
            </Link>
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ path, label }) => (
                <NavLink key={path} path={path} label={label} />
              ))}
             
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-colors duration-200"
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
          } overflow-hidden bg-black/90 shadow-lg backdrop-blur-md`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ path, label }) => (
              <NavLink key={path} path={path} label={label} isMobile />
            ))}
            {/* Info Links */}
            <div className="border-t border-gray-800 mt-2 pt-2 flex flex-col gap-2">
              {infoNavItems.map(({ path, label, icon }) => (
                <Link key={path} to={path} className="flex items-center gap-1 text-white hover:underline px-3 py-1">
                  {icon}{label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
