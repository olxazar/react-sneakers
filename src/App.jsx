import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

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
      const itemsResponce = await axios.get(
        "https://e75d32837d55faad.mokky.dev/items"
      );
      const cartItemsResponce = await axios.get(
        "https://e75d32837d55faad.mokky.dev/cart"
      );
      const favoritesResponce = await axios.get(
        "https://e75d32837d55faad.mokky.dev/favorites"
      );

      setIsLoading(false);

      setCartItems(cartItemsResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }
    fetchData();
  }, []);

  const addCartToDrawer = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://e75d32837d55faad.mokky.dev/cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://e75d32837d55faad.mokky.dev/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log("Ошибка при добавлении товара в корзину");
    }
  };

  const removeCartFromDrawer = (id) => {
    axios.delete(`https://e75d32837d55faad.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addCartToFavorite = async (obj) => {
    console.log(obj);
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://e75d32837d55faad.mokky.dev/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          "https://e75d32837d55faad.mokky.dev/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      ("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id === Number(id)));
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
        cartItems,
      }}
    >
      <div className="wrapper clear">
        {drawerOpened && (
          <Drawer
            onRemove={removeCartFromDrawer}
            items={cartItems}
            onCloseDrawer={() => setDrawerOpened(false)}
          />
        )}
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
        </Routes>
      </div>
    </AppContext.Provider>
  );
};
