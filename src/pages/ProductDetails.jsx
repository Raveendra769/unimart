import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="details-container">
        <h2>Product not found</h2>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category
  );

  return (
    <div className="details-container">

      {/* PRODUCT DETAILS */}
      <div className="details-grid">

        {/* LEFT SIDE */}
        <div className="details-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="details-info">

          <h1>{product.title}</h1>

          <h2 className="price">
            ₹{product.price}
          </h2>

          <div className="description">
            {product.description}
          </div>

          <div className="info-box">

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Condition:</strong>{" "}
              {product.condition || "Like New"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {product.location || "College Campus"}
            </p>

            <p>
              <strong>Posted:</strong>{" "}
              {product.time || "Today"}
            </p>

          </div>

          {/* Seller */}

          <div className="seller-card">

            <div className="seller-avatar">
              {product.seller.charAt(0).toUpperCase()}
            </div>

            <div>

              <h3>{product.seller}</h3>

              <span>Student Seller</span>

            </div>

          </div>

          <button className="message-btn">
            💬 Message Seller
          </button>

          <div className="bottom-buttons">

            <button>
              📞 Call
            </button>

            <button>
              💰 Make Offer
            </button>

          </div>

          <div className="safety-box">
            🛡 Meet in a public place and inspect the item before purchasing.
          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}

      <div className="related-section">

        <h2>Related Products</h2>

        {relatedProducts.length > 0 ? (

          <div className="related-grid">

           {relatedProducts.slice(0, 3).map((item) => (

<div
  className="related-card"
  key={item.id}
  onClick={() => navigate(`/product/${item.id}`)}
>

  <div className="related-image">
    <img
      src={item.image}
      alt={item.title}
    />
  </div>

  <div className="related-content">

    <div className="related-top">

      <h3>{item.title}</h3>

      <span className="related-condition">
        {item.condition || "Good"}
      </span>

    </div>

    <p className="related-price">
      ₹{item.price}
    </p>

    <p className="related-location">
      📍 {item.location || "Campus"}
    </p>

    <p className="related-seller">
      👤 {item.seller}
    </p>

    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/product/${item.id}`);
      }}
    >
      View Details
    </button>

  </div>

</div>

))}

          </div>

        ) : (

          <div className="no-related">
            No related products found.
          </div>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;