import { React, useContext } from "react";

import { Card } from "../components/Card/Card";
import { AppContext } from "../App";

export const Favorites = () => {
  const { favorites, addCartToFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap ">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            addFavorite={addCartToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
