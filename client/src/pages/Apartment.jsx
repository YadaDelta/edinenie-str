import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Apartment = ({ user }) => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  console.log(user);
  useEffect(() => {
    const fetchApartment = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/apartments/${id}`
      );
      setApartment(response.data);
    };
    fetchApartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(apartment);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/book/apartment",
        { user_id: user.id, apt_id: apartment.apartment_id }
      );
      console.log(response);
      alert("Бронирование успешно");
    } catch (error) {
      console.error(error);
      alert("Бронирование провалилось");
    }
  };

  if (!apartment) return <div>Загрузка...</div>;

  return (
    <>
      <div>
        Информация о квартире:
        <h1>{apartment.number}</h1>
        Цена: {apartment.price}
      </div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <button type="submit">Забронировать</button>
        </form>
      ) : (
        <div>Зарегистрируйтесь для возможности бронирования квартиры.</div>
      )}
    </>
  );
};

export default Apartment;
