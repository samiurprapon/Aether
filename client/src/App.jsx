import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";
import {
  INDEX_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
} from "./utils/helper/pathHelper";

/* Pages for routing */
import Index from "./pages/global";
import Login from "./pages/global/login";
import Register from "./pages/global/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={INDEX_PATH} element={<Index />} />
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route path={SIGNUP_PATH} element={<Register />} />
        <Route path="*" element={<h3>404 Not Found!</h3>} />
      </Routes>
    </Router>
  );
}

export default App;
