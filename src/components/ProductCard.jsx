import { useNavigate } from "react-router-dom";

function ProductCard({ id, title, price, seller }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>₹{price}</p>
      <p>Seller: {seller}</p>

      <button onClick={() => navigate(`/product/${id}`)}>
        View Details
      </button>
    </div>
  );
}

export default ProductCard;