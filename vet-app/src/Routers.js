import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginComponent from "./components/login/login";
import ProtectedRoute from "./components/productos/productos";
import Offcanvas from "./components/template/offcanvas";
import Dashboard from "./pages/Dashboard";

const Routers = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/cam" element={<Offcanvas />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/productos" element={<ProtectedRoute />} />
    </Routes>
  </BrowserRouter>
);

export default Routers;