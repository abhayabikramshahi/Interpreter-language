import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import './App.css';
import RunnerPage from './pages/Runner';
import Docs from './pages/Docs';
import About from './pages/About';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEO />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/runner" element={<RunnerPage />}></Route>
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/seo" element={<div>Contact Page</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;