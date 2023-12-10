import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ onClickDrawer }) => {
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
          <span>1205 руб.</span>
        </li>
        <Link to="/favorites">
          <li className="cu-p mr-20">
            <img className="" width={18} height={18} src="/img/favorite.svg" />
            <span>Закладки</span>
          </li>
        </Link>
        <li className="cu-p">
          <img width={18} height={18} src="/img/profile.svg" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
};
