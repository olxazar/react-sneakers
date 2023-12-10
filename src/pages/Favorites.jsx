import React from "react";
import { Card } from "../components/Card/Card";

export const Favorites = ({ items, addCartToFavorite }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap ">
        {items.map((item, index) => (
          <Card
            key={index}
            addFavorite={addCartToFavorite}
            favorited={true}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
