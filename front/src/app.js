import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Tokens from "./pages/tokens.js";
import Register from "./pages/register.js";
import { Home } from "./pages/home.js";
import Dashboard from "./pages/dashboard.js";
import Settings from "./pages/settings.js";
import { DashboardLayout } from "./components/dashboard-layout.js";
import Login from "./pages/login.js";
import { useAuthState } from "./logic/authentication/auth-context.js";

function App() {
  const authInfo = useAuthState();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            authInfo.user.authenticated ? (
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/tokens"
          element={
            authInfo.user.authenticated ? (
              <DashboardLayout>
                <Tokens />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            authInfo.user.authenticated ? (
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
