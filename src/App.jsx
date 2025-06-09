import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Runner from './pages/Runner'
import Navbar from './components/Navbar'
import ComingSoon from './pages/ComingSoon'

// Layout component to wrap pages with common elements
const Layout = ({ children }) => {
  return (
   <>
   {children}
   </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        Public routes
        {/* <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        <Route path="/runner" element={
          <Layout>
            <Runner />
          </Layout>
        } />
        
      
  
        {/* Catch all route - redirect to home */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */} */
        <Route path="*" element={
          <Layout>
            <ComingSoon />
          </Layout>
        } />

      </Routes>
    </Router>
  )
}

export default App