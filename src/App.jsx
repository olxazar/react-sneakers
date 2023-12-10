import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    axios.get("https://e75d32837d55faad.mokky.dev/items").then((res) => {
      setItems(res.data);
    });
    axios.get("https://e75d32837d55faad.mokky.dev/cart").then((res) => {
      setCartItems(res.data);
    });
    axios.get("https://e75d32837d55faad.mokky.dev/favorites").then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const addCartToDrawer = (obj) => {
    axios.post("https://e75d32837d55faad.mokky.dev/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const removeCartFromDrawer = (id) => {
    axios.delete(`https://e75d32837d55faad.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addCartToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://e75d32837d55faad.mokky.dev/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          "https://e75d32837d55faad.mokky.dev/favorites",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {'Не удалось добавить в избранное'}
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
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
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              addCartToDrawer={addCartToDrawer}
              addCartToFavorite={addCartToFavorite}
            ></Home>
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Favorites
              items={favorites}
              addCartToFavorite={addCartToFavorite}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};
