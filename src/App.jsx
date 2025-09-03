import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SidebarLayout from "./layout/SidebarLayout"; // Correct default import

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<SidebarLayout />} />
    </Routes>
  );
}

export default App; // Correct default export for the App component
