import React, { useContext } from "react";
import { Card } from "../components/Card/Card";


export const Home = ({
  cartItems,
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  addCartToDrawer,
  addCartToFavorite,
  isLoading,
}) => {
  

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        addDrawer={(obj) => addCartToDrawer(obj)}
        addFavorite={(obj) => addCartToFavorite(obj)}

        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/remove-item.svg"
              alt="Remove"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск ... "
          />
        </div>
      </div>

      <div className="d-flex flex-wrap ">{renderItems()}</div>
    </div>
  );
};
