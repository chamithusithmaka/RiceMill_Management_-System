import React from 'react';
import './App.css';
import RegistrationPage from "./pages/user/RegistrationPage";
import LoginPage from "./pages/user/LoginPage";
import Dashboard from "./pages/user/Dashboard";
import SeedSeller from './pages/user/SeedSeller';
import Employee from './pages/user/Employee';
import Role from './components/Employee/Role';
import AddEmployee from './components/Employee/AddEmployee';
import EmployeeDetail from './pages/user/EmployeeDetail';
import Attendance from './components/Employee/Attendance';
import EmployeeSalary from './components/Employee/employeeSalary';
import Supply from './pages/user/Supply';
import SeedType from './components/Supply/SeedTypes';
import AllSupply from './components/Supply/AllSupplies';
import AddSupply from './components/Supply/AddSupply';
import AddSeedSeller from './components/SeedSeller/AddSeedSeller';
import AllSellers from './components/SeedSeller/AllSellers';
import Transaction from './components/SeedSeller/Transaction';

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
        <Route path="/employee/:employeeId" element={<EmployeeDetail />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/salary" element={<EmployeeSalary />} />
        <Route path="/supply" element={<Supply />} />
        <Route path="/seedType" element={<SeedType />} />
        <Route path="/addsupply" element={<AddSupply />} />
        <Route path="/allsupplies" element={<AllSupply />} />
        <Route path="/addseller" element={<AddSeedSeller />} />
        <Route path="/allsellers" element={<AllSellers />} />
        <Route path="/transaction" element={<Transaction />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
