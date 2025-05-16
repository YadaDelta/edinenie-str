import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LayoutGraphic from "../components/LayoutGraphic";
import Nav from "../components/Nav";

const Apartment = ({ user }) => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  console.log(apartment);
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
      <Nav />
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-section">
            <h2>Информация об объекте:</h2>
            <p>{apartment.house_name}</p>
            <p>
              {apartment.type}, номер {apartment.number}
            </p>
            <p>Площадь {apartment.area} м2.</p>
            <div>Цена: {apartment.price}</div>
            {user ? (
              <form onSubmit={handleSubmit}>
                <button type="submit">Забронировать</button>
              </form>
            ) : (
              <div>
                Зарегистрируйтесь для возможности бронирования квартиры.
              </div>
            )}
            <div>
              <LayoutGraphic apt_number={apartment.number} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apartment;
