import { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    seller: '',
    ratings: 0,
    reviews: '', // Changed this to an empty string to accept text input for reviews
    quantity: 1,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const response = await axios.post('http://localhost:8000/api/addproduct', product);
        console.log(response); // Log the response to utilize the variable
        setSuccess('Product added successfully!');
        setProduct({
            name: '',
            image: '',
            price: '',
            description: '',
            seller: '',
            ratings: 0,
            reviews: '', // Reset reviews as an empty string
            quantity: 1,
        });
    } catch (err) {
        if (err.response && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError('Error adding product.');
        }
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Seller:</label>
          <input type="text" name="seller" value={product.seller} onChange={handleChange} required />
        </div>
        <div>
          <label>Ratings:</label>
          <input type="number" name="ratings" value={product.ratings} onChange={handleChange} />
        </div>
        <div>
          <label>Reviews:</label>
          <textarea name="reviews" value={product.reviews} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default AddProduct;
