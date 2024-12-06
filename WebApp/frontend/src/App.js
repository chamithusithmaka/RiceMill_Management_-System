import React from 'react';
import './App.css';
import RegistrationPage from "./pages/user/RegistrationPage";
import LoginPage from "./pages/user/LoginPage";
import Dashboard from "./pages/user/Dashboard";
import SeedSeller from './pages/user/SeedSeller';
import Employee from './pages/user/Employee';
import Role from './components/Employee/Role';
import AddEmployee from './components/Employee/AddEmployee';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      
        
        
        
        <Routes>
        
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path ="/seedseller" element={<SeedSeller />}/>
        <Route path ="/employee" element={<Employee />}/>
        <Route path ="/role" element={<Role />}/>
        <Route path ="/addemployee" element ={<AddEmployee />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
