import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  INDEX_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
} from "./utils/helper/pathHelper";

/* Pages for routing */
import Index from "./pages/global";
import Login from "./pages/global/login";
import Register from "./pages/global/register";

function App() {
  return (
    <Routes>
      <Route path={INDEX_PATH} element={<Index />} />
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={REGISTER_PATH} element={<Register />} />
    </Routes>
  );
}

export default App;
