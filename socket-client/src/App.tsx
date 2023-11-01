import { useState, useEffect } from "react";

// import "./App.css";
import { Route, Routes } from "react-router-dom";
import SocketC from "./Socket";
import { Link } from "react-router-dom";
import Products from "./UseDefferedValue";

function App() {
  return (
    <div>
      <h1> Main </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Socket</Link>
          </li>
          <li>
            <Link to="/usedefferedvalue">UseDefferedValue</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SocketC />} />
        <Route path="/usedefferedvalue" element={<Products />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </div>
  );
}

export default App;
