import React from "react";
import s from "./Card.module.scss";

export const Card = ({ title, price, imageUrl }) => {
  return (
    <div className={s.card}>
      <div className={s.favorite}>
        <img src="/img/unliked.svg" alt="" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <button className="button ">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  );
};
