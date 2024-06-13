import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PdfViewer from './pages/PdfViewer';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={< Login/>} />
          <Route path="/pdf/:id" element={<PdfViewer />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;
