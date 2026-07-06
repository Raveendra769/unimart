import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Wishlist from "./pages/Wishlist";
// Pages
import MyListings from "./pages/MyListings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseItems from "./pages/BrowseItems";
import SellItem from "./pages/SellItem";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";

// Assets
import dsa from "./assets/dsa.jpg";
import hp from "./assets/hp.jpg";

/* =========================
   INITIAL PRODUCTS
========================= */
const getInitialProducts = () => {
  const saved = localStorage.getItem("products");

  return saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          title: "DSA Book",
          price: 350,
          seller: "Rahul",
          description: "Best book for DSA preparation for students.",
          image: dsa,
          condition: "Like New",
          location: "Engineering Block",
          time: "2 hours ago",
          category: "Books",
        },
        {
          id: 2,
          title: "HP Laptop",
          price: 28000,
          seller: "Priya",
          description: "Good condition laptop, works perfectly.",
          image: hp,
          condition: "Good",
          location: "Campus Center",
          time: "1 day ago",
          category: "Electronics",
        },
      ];
};

/* =========================
   APP COMPONENT
========================= */
function App() {
  const [products, setProducts] = useState(() => getInitialProducts());
const [wishlist, setWishlist] = useState(() => {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
});

  // Search & Filters (global state)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  /* =========================
     SAVE TO LOCALSTORAGE
  ========================= */
 useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
}, [products]);

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route
        path="/"
        element={
          <Home
  products={products}
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
  priceFilter={priceFilter}
  setPriceFilter={setPriceFilter}
  wishlist={wishlist}
  setWishlist={setWishlist}
/>
        }
      />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= BROWSE ================= */}
      <Route
        path="/browse"
        element={<BrowseItems products={products} />}
      />

      {/* ================= SELL ITEM ================= */}
      <Route
        path="/sell"
        element={
          <SellItem
            products={products}
            setProducts={setProducts}
          />
        }
      />

      {/* ================= PROFILE ================= */}
      <Route path="/profile" element={<Profile />} />

      {/* ================= PRODUCT DETAILS ================= */}
      <Route
        path="/product/:id"
        element={<ProductDetails products={products} />}
      />
<Route
  path="/wishlist"
  element={<Wishlist wishlist={wishlist} />}
/>
<Route
  path="/my-listings"
  element={
    <MyListings
      products={products}
      setProducts={setProducts}
    />
  }
/>
    </Routes>
  );
}

export default App;