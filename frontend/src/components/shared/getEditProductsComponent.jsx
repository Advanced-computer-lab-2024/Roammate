import { useEffect, useState } from "react";
import { fetchProducts, updateProduct } from "../../services/api"; // Adjust the import according to your API service structure

const GetProductsWithEdit = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    seller: "",
    ratings: 0,
    reviews: "",
    quantity: 1,
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProducts = () => {
    setShowProducts((prev) => !prev);
    if (!showProducts) {
      loadProducts();
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedDetails({
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      seller: product.seller,
      ratings: product.ratings,
      reviews: product.reviews || "",
      quantity: product.quantity,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = async () => {
    try {
      await updateProduct(editingProduct._id, updatedDetails);
      setEditingProduct(null); // Close the edit form
      loadProducts(); // Refresh products
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product."); // Set error state to inform user
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleProducts}>
        {showProducts ? "Hide Products" : "Show Products"}
      </button>
      {showProducts && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0" }}>{product.name}</h3>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100px" }}
              />
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Seller:</strong> {product.seller}
              </p>
              <p>
                <strong>Ratings:</strong> {product.ratings || "No rating"}
              </p>
              <p>
                <strong>Reviews:</strong> {product.reviews || "No reviews"}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>

              <button onClick={() => handleEditClick(product)}>Edit</button>

              {editingProduct && editingProduct._id === product._id && (
                <div>
                  <h4>Edit Product</h4>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={updatedDetails.name}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Image URL:
                    <input
                      type="text"
                      name="image"
                      value={updatedDetails.image}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={updatedDetails.price}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={updatedDetails.description}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Seller:
                    <input
                      type="text"
                      name="seller"
                      value={updatedDetails.seller}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Ratings:
                    <input
                      type="number"
                      name="ratings"
                      value={updatedDetails.ratings}
                      min="0"
                      max="5"
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Reviews:
                    <textarea
                      name="reviews"
                      value={updatedDetails.reviews}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      name="quantity"
                      value={updatedDetails.quantity}
                      min="1"
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <button onClick={handleConfirmEdit}>Confirm Edit</button>
                  <button onClick={() => setEditingProduct(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetProductsWithEdit;
