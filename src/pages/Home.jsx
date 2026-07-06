import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home({
  products,
  search,
  setSearch,
  category,
  setCategory,
  priceFilter,
  setPriceFilter,
  wishlist,
  setWishlist,
}) {
      const navigate = useNavigate();
      const toggleWishlist = (product) => {
  const exists = wishlist.find((p) => p.id === product.id);

  if (exists) {
    setWishlist(wishlist.filter((p) => p.id !== product.id));
  } else {
    setWishlist([...wishlist, product]);
  }
};
    console.log("PRODUCTS FROM APP:", products);
  const filteredProducts = products
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
   .filter((item) => {
  if (category === "All") return true;
  if (!item.category) return true; // IMPORTANT FIX
  return item.category === category;
})
    .filter((item) => {
      if (priceFilter === "All") return true;
      if (priceFilter === "Under50") return item.price < 50;
      if (priceFilter === "Under100") return item.price < 100;
      if (priceFilter === "Under250") return item.price < 250;
      if (priceFilter === "250+") return item.price >= 250;
      return true;
    });
    console.log("FILTERED PRODUCTS:", filteredProducts);
    
  return (
  <div>
   <Navbar
  search={search}
  setSearch={setSearch}
/>

    {/* HERO */}
    <section className="hero">
      <h1>Campus Marketplace</h1>

      <p>
        Buy & Sell Books, Electronics, Hostel Essentials and more within your
        college.
      </p>

      <div className="hero-stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <span>Active Items</span>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <span>Students</span>
        </div>

        <div className="stat-card">
          <h2>120+</h2>
          <span>Items Sold</span>
        </div>
      </div>
    </section>

 

    {/* CATEGORY FILTER */}
    <section className="filter-box">
      <h2>Categories</h2>

      <div className="category-list">
        <button onClick={() => setCategory("All")}>All Items</button>
        <button onClick={() => setCategory("Books")}>📚 Books</button>
        <button onClick={() => setCategory("Electronics")}>💻 Electronics</button>
        <button onClick={() => setCategory("Calculators")}>🧮 Calculators</button>
        <button onClick={() => setCategory("Notes")}>📝 Notes</button>
        <button onClick={() => setCategory("Furniture")}>🪑 Furniture</button>
        <button onClick={() => setCategory("Hostel")}>🎒 Hostel</button>
      </div>

      <h2>Price Range</h2>

      <div className="category-list">
        <button onClick={() => setPriceFilter("All")}>All</button>
        <button onClick={() => setPriceFilter("Under50")}>Under ₹50</button>
        <button onClick={() => setPriceFilter("Under100")}>Under ₹100</button>
        <button onClick={() => setPriceFilter("Under250")}>Under ₹250</button>
        <button onClick={() => setPriceFilter("250+")}>₹250+</button>
      </div>
    </section>

    {/* PRODUCTS */}
    <section className="featured">
      <div className="section-header">
        <h2>Latest Items</h2>
        <span>{filteredProducts.length} items available</span>
      </div>
<div className="product-list">
  {filteredProducts.map((item) => (
  <div className="product-card" key={item.id}>
<button
  className="favorite-btn"
  onClick={(e) => {
    e.stopPropagation();
    toggleWishlist(item);
  }}
>
  {wishlist.some((p) => p.id === item.id) ? "❤️" : "🤍"}
</button>
 

      {/* Product Image */}
      <div className="image-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="product-image"
        />

      
      </div>

      {/* Product Details */}
      <div className="product-content">

        <div className="price-row">
          <h2 className="price">₹{item.price}</h2>

          <span className="condition">
            {item.condition || "Good"}
          </span>
        </div>

        <h3 className="product-title">
          {item.title}
        </h3>

        <p className="location">
          📍 {item.location || "Campus Center"}
        </p>

        <p className="seller">
          👤 {item.seller}
        </p>

        <p className="time">
          🕒 {item.time || "2 hours ago"}
        </p>

        <button
          className="details-btn"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          View Details →
        </button>

      </div>

    </div>
  ))}
</div>
    </section>

    <Footer />
  </div>
);
}

export default Home;