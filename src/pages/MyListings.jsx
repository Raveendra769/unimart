import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyListings.css";
import { useNavigate } from "react-router-dom";
function MyListings({ products, setProducts }) {
    const navigate = useNavigate();
  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="my-listings">

        <div className="heading">
          <h1>📦 My Listings</h1>
          <p>{products.length} Products Listed</p>
        </div>

        {products.length === 0 ? (
          <div className="empty">
            <h2>No Products Yet</h2>
            <p>Click Sell Item to add your first product.</p>
          </div>
        ) : (
          <div className="listing-grid">

            {products.map((item) => (
              <div className="listing-card" key={item.id}>

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="listing-content">

                  <h2>{item.title}</h2>

                  <h3>₹{item.price}</h3>

                  <p>📍 {item.location}</p>

                  <p>{item.condition}</p>

                  <div className="listing-buttons">

                   <button
  className="edit-btn"
  onClick={() =>
    navigate("/sell", {
      state: {
        product: item,
      },
    })
  }
>
  ✏ Edit
</button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(item.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

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

export default MyListings;