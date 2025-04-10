import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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
    <div>
      <h1>{house.address}</h1>
      Доступные квартиры:
      {house.apartments.map((item) => (
        <div key={item.id}>
          <Link to={`/apartments/${item.id}`}>{item.number}</Link>
        </div>
      ))}
    </div>
  );
};

export default House;
