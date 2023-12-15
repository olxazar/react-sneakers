import React, { useContext } from "react";
import { AppContext } from "../App";

export const Info = ({ title, image, description }) => {
  const { setDrawerOpened } = useContext(AppContext);

  return (
    <div class="cartEmpty d-flex align-center justify-center flex-column flex">
      <img class="mb-20" width="120px" height="150px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p class="opacity-6">{description}</p>
      <button onClick={() => setDrawerOpened(false)} class="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
