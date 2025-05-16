import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AptCard from "../components/AptCard";

const House = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const fetchHouse = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/houses/${id}`
      );
      setHouse(response.data);
    };
    fetchHouse();
  }, [id]);

  if (!house) return <div>Загрузка...</div>;

  return (
    <>
      <Nav />
      <div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="text-section">
              <h2>{house.address}</h2>
              {house.description}
            </div>
            <div className="image-section">
              <img src={`/house_image/${house.image}`} alt="Многоэтажный дом" />
            </div>
          </div>
        </div>
        <h1 className="center-h">Доступные объекты:</h1>
        <div className="aptBlock">
          <div className="aptGallery">
            {house.apartments.map((item) => (
              <div key={item.id}>
                <AptCard apt={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default House;
