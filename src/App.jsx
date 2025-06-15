import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import './App.css';
import RunnerPage from './pages/Runner';
import Docs from './pages/Docs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/runner" element={<RunnerPage />}></Route>
        <Route path="/docs" element={<Docs />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;