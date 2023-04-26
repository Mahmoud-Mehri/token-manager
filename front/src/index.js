import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app.js";
import { configureStore } from "./logic/store.js";
import { AuthProvider } from "./logic/authentication/auth-provider.js";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.js";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
