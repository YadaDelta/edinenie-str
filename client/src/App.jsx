import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import House from "./pages/House";
import Apartment from "./pages/Apartment";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser({ username: response.data.username, id: response.data.id });
        })
        .catch((error) => {
          console.log("Ошибка при проверке токена:", error);
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

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
