import React, { useContext } from "react";
import { Router, Switch } from "react-router-dom";
import { TreesContext } from "./index.js";
import { useFetch } from "./hooks/useFetch.js";
import Tokens from "./pages/tokens.js";
import Register from "./pages/register.js";
import { Home } from "./pages/home.js";

function App({ login }) {
  // const { trees: data } = useContext(TreesContext);
  // console.log(data);
  return (
    // <Router>
    <div className="app">
      <Tokens />
    </div>
    // </Router>
  );
}

export default App;
