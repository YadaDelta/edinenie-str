import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import House from "./pages/House";
import Apartment from "./pages/Apartment";

const App = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/" element={<Main />} />
      <Route path="/houses/:id" element={<House />} />
      <Route path="/apartments/:id" element={<Apartment user={user} />} />
    </Routes>
  );
};

export default App;
