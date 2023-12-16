import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../App";

export const Header = ({ onClickDrawer }) => {
  const { cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex text-center">
        <li onClick={onClickDrawer} className="mr-30 cu-p">
          <img className="" width={18} height={18} src="/img/basket.svg" />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="/favorites">
          <li className="cu-p mr-20">
            <img className="" width={18} height={18} src="/img/favorite.svg" />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to="/orders">
          <li className="cu-p">
            <img width={18} height={18} src="/img/profile.svg" />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
};
