import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        🛒 UniMart
      </Link>

    <div className="search-box">
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/browse">Browse</Link>

        <Link to="/wishlist">❤️ Wishlist</Link>

        <Link to="/my-listings">📦 My Listings</Link>

        <Link className="sell-btn" to="/sell">
          + Sell Item
        </Link>

        <Link to="/profile">👤 Profile</Link>

      </div>

    </nav>
  );
}

export default Navbar;