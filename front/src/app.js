import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Tokens from "./pages/tokens.js";
import Register from "./pages/register.js";
import { Home } from "./pages/home.js";
import Account from "./pages/account.js";
import Settings from "./pages/settings.js";
import { DashboardLayout } from "./components/dashboard-layout.js";
import { theme } from "./theme/index.js";

function App({ login }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <DashboardLayout>
          <Routes>
            <Route path="/profile" element={<Account />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
