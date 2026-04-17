import './App.css';
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";


function App() {
  
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Pages/Login"));
  return (
   <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
  );
}

export default App;
