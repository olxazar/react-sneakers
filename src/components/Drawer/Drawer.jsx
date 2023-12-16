import React, { useState, useContext } from "react";
import axios from "axios";

import { AppContext } from "../../App";
import { Info } from "../Info";

import s from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({ onRemove, onCloseDrawer, opened, items = [] }) => {
  const [orderId, setOrderId] = useState(null);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  const tax = (totalPrice * 0.05).toFixed(2);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://e75d32837d55faad.mokky.dev/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://e75d32837d55faad.mokky.dev/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  return (
    <div className={`${s.overlay} ${opened ? s.overlayVisible : ""}`}>
      <div className={s.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onCloseDrawer}
            className="cu-p"
            src="/img/remove-item.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex   ">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20 ">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex ">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/remove-item.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{tax} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
            image={
              isComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
            description={
              isComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
};
