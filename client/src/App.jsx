import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";
// import {
//   INDEX_PATH,
//   LOGIN_PATH,
//   REGISTER_PATH,
// } from "./utils/helper/pathHelper";

/* Pages for routing */
import Index from "./pages/global";
import Login from "./pages/global/login";
import Register from "./pages/global/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
