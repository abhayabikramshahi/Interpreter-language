import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Runner from './pages/Runner'
import Companies from './pages/Companies'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/runner" element={<Runner />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App