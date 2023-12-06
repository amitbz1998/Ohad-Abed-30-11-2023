import React from "react";
import Navbar from "../navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homePage/HomePage";
import FavoritesPage from "../../pages/favoritesPage/FavoritesPage";

function Layout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default Layout;
