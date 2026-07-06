import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Wishlist({ wishlist }) {
  const navigate = useNavigate();

  return (
    <>
     <Navbar
  search=""
  setSearch={() => {}}
/>

      <div style={{ padding: "40px" }}>
        <h1>❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <h3>Your wishlist is empty.</h3>
        ) : (
          <div className="product-list">
            {wishlist.map((item) => (
              <div className="product-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                />

                <div className="product-content">
                  <h3>{item.title}</h3>

                  <h2 className="price">₹{item.price}</h2>

                  <p>{item.seller}</p>

                  <button
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;