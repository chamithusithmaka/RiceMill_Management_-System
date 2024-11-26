import React from 'react';
import './App.css';
import RegistrationPage from "./pages/user/RegistrationPage";
import LoginPage from "./pages/user/LoginPage";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      
        
        
        
        <Routes>
        
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" exact element={<LoginPage />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
