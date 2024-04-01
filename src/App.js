import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AuthRedirect from "./AuthRedirect";

import HomePage from "./pages/Home/HomePage";
import FeedPage from "./pages/Home/pages/FeedPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthRedirect />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<Navigate replace to="feed" />} />
            <Route path="feed" element={<FeedPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
