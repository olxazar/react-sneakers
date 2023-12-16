import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer/Drawer";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";

export const AppContext = createContext({});

export const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponce, cartItemsResponce, favoritesResponce] =
          await Promise.all([
            axios.get("https://e75d32837d55faad.mokky.dev/items"),
            axios.get("https://e75d32837d55faad.mokky.dev/cart"),
            axios.get("https://e75d32837d55faad.mokky.dev/favorites"),
          ]);

        setIsLoading(false);

        setCartItems(cartItemsResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

  const addCartToDrawer = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://e75d32837d55faad.mokky.dev/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://e75d32837d55faad.mokky.dev/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const removeCartFromDrawer = (id) => {
    try {
      axios.delete(`https://e75d32837d55faad.mokky.dev/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удаление объекта");
    }
  };

  const addCartToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://e75d32837d55faad.mokky.dev/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://e75d32837d55faad.mokky.dev/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId === Number(id)));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setDrawerOpened,
        setCartItems,
        addCartToDrawer,
        addCartToFavorite,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onRemove={removeCartFromDrawer}
          items={cartItems}
          onCloseDrawer={() => setDrawerOpened(false)}
          opened={drawerOpened}
        />
        <Header onClickDrawer={() => setDrawerOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                addCartToDrawer={addCartToDrawer}
                addCartToFavorite={addCartToFavorite}
                isLoading={isLoading}
              ></Home>
            }
          ></Route>

          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};
