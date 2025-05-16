import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [houses, setHouses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await axios.get("http://localhost:8080/api/houses");
      setHouses(response.data);
    };
    fetchHouses();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src="../../main/edinenie_logo.png" alt="" />
        </div>
        <div className="menu-links">
          <Link className="nav-link" to="/">
            Главная
          </Link>
          <div
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Link className="nav-link" to="/">
              Объекты ↓
            </Link>
            {isOpen && (
              <div className="dropdown-content">
                {houses.map((item) => (
                  <div key={item.house_id}>
                    <Link to={`/houses/${item.house_id}`}>{item.address}</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="navbar-auth">
          {localStorage.getItem("token") !== null ? (
            <Link className="nav-link" to="/profile">
              Профиль
            </Link>
          ) : (
            <>
              <Link className="nav-link no-decor" to="/register">
                Регистрация
              </Link>
              <Link className="nav-link" to="/login">
                Логин
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
