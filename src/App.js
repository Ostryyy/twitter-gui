import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { AuthProvider } from "./AuthContext";
import AuthRedirect from "./AuthRedirect";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <AuthRedirect />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
