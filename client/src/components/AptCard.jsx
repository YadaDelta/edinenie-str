import React from "react";
import { Link } from "react-router-dom";

const AptCard = ({ apt }) => {
  return (
    <>
      <Link className="aptLink" to={`/apartments/${apt.id}`}>
        <div className="aptCard">
          <img
            className="aptCardImage"
            src={`/apt_image/${apt.thumbnail}`}
            alt="Фото объекта"
          />
          <div className="aptCardInfo">
            <h3>{`${apt.type} ${apt.number}`}</h3>
            <p>{apt.price} рублей</p>
            <p>{apt.area} м2</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AptCard;
