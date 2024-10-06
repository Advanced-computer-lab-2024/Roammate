import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false); // State to manage visibility of the product list
  const [order, setOrder] = useState('asc'); // State for sorting order
  const [minPrice, setMinPrice] = useState(''); // State for minimum price filter
  const [maxPrice, setMaxPrice] = useState(''); // State for maximum price filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch products function
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/viewproducts'); // Adjust the endpoint as needed
      setProducts(response.data);
    } catch {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleProducts = () => {
    setShowProducts((prev) => !prev); // Toggle the visibility of the product list
    if (!showProducts) {
      fetchProducts(); // Refetch products when showing the list
    }
  };

  const handleSort = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sortbyrating`, {
        params: { order },
      });
      setProducts(response.data);
    } catch {
      setError('Failed to sort products');
    }
  };

  const handleFilterByPrice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/filterbyprice', {
        params: { minPrice, maxPrice },
      });
      setProducts(response.data);
    } catch {
      setError('Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      // If the search term is empty or just spaces, do nothing
      return;
    }

    fetchSearchedProducts(trimmedSearchTerm); // Fetch products based on the search term
  };

  const fetchSearchedProducts = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/searchproduct/${name}`);
      setProducts(response.data);
    } catch {
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleProducts}>
        {showProducts ? 'Hide Products' : 'Show Products'}
      </button>

      {showProducts && (
        <div style={{ marginTop: '10px' }}>
          <h2>Available Products</h2>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
            <label>
              Search by Name:
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Product Name" 
              />
            </label>
            <button type="submit" style={{ marginLeft: '10px' }}>Search</button>
          </form>

          {/* Filter by Price Form */}
          <form onSubmit={handleFilterByPrice} style={{ marginBottom: '20px' }}>
            <label>
              Min Price:
              <input 
                type="number" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
                placeholder="Min Price" 
              />
            </label>
            <label style={{ marginLeft: '10px' }}>
              Max Price:
              <input 
                type="number" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)} 
                placeholder="Max Price" 
              />
            </label>
            <button type="submit" style={{ marginLeft: '10px' }}>Filter</button>
          </form>

          {/* Sort By Rating */}
          <div>
            <label>
              Sort by Ratings:
              <select onChange={(e) => setOrder(e.target.value)} value={order}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
            <button onClick={handleSort}>Sort</button>
          </div>

          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {products.map((product) => (
              <li key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                <h3 style={{ margin: '0' }}>{product.name}</h3>
                <img src={product.image} alt={product.name} width="100" style={{ display: 'block', marginBottom: '10px' }} />
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Seller:</strong> {product.seller}</p>
                <p><strong>Ratings:</strong> {product.ratings}</p>
                <p><strong>Reviews:</strong> {product.reviews}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductList;
