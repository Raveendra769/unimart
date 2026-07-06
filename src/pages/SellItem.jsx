import { useState } from "react";
import "./SellItem.css";
import { useNavigate, useLocation } from "react-router-dom";
function SellItem({ products, setProducts }) {
  const locationState = useLocation();
const editProduct = locationState.state?.product;
const [title, setTitle] = useState(editProduct?.title || "");
const [price, setPrice] = useState(editProduct?.price || "");
const [seller, setSeller] = useState(editProduct?.seller || "");
const [category, setCategory] = useState(
  editProduct?.category || "Books"
);
const [condition, setCondition] = useState(
  editProduct?.condition || "Like New"
);  const [location, setLocation] = useState(
  editProduct?.location || ""
);
  const [description, setDescription] = useState(
  editProduct?.description || ""
);
 const [image, setImage] = useState(
  editProduct?.image || ""
);
const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      seller,
      category,
      condition,
      location,
      description,
      image,
      time: "Just Now",
    };

  setProducts([...products, newProduct]);

setTitle("");
setPrice("");
setSeller("");
setCategory("Books");
setCondition("Like New");
setLocation("");
setDescription("");
setImage("");

navigate("/");

  };

  return (
    <div className="sell-container">

      <h1>
  {editProduct ? "Edit Product" : "Sell Your Item"}
</h1>

      <form className="sell-form" onSubmit={handleSubmit}>

        {/* Image Upload */}

        <div className="upload-box">

          {image ? (
            <img src={image} alt="preview" />
          ) : (
            <p>📷 Upload Product Image</p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

        </div>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Books</option>
          <option>Electronics</option>
          <option>Calculators</option>
          <option>Notes</option>
          <option>Furniture</option>
          <option>Hostel</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>

        <input
          type="text"
          placeholder="Seller Name"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          rows="5"
          placeholder="Describe your product..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editProduct ? "Update Product" : "Publish Item"}
        </button>

      </form>

    </div>
  );
}

export default SellItem;