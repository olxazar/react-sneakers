import React from "react";

export const Header = () => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="headerLeft d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />
        <div>
          <h3>REACT SNEAKERS</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex text-center">
        <li className="mr-30">
          <img className="" width={18} height={18} src="/img/basket.svg" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src="/img/profile.svg" />
        </li>
      </ul>
    </header>
  );
};
