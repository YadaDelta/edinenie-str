import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  const [apartments, setApartments] = useState(null);

  if (user) {
    useEffect(() => {
      const fetchApartments = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/book/apartments/${user.id}`
        );
        setApartments(response.data);
      };
      fetchApartments();
    }, []);
  }

  if (!user) {
    return <h2>Пожалуйста, войдите в систему для доступа к вашему профилю.</h2>;
  }
  if (!apartments) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Имя пользователя: {user.username}</p>
      Забронированные квартиры:
      {apartments.map((item) => (
        <div key={item.apartment_id}>
          <Link to={`/apartments/${item.apartment_id}`}>{item.number}</Link>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
