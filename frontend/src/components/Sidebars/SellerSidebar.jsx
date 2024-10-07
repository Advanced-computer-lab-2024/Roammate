const SellerSidebar = ({ setContent }) => {
    return (
      <div className="sidebar">
        <h2>Seller Management</h2>
        {/* <button className="btn" onClick={() => setContent("content")}>Button Name</button> */}
        <button className="btn" onClick={() => setContent("addProduct")}>
          Add Product
        </button>
        <button className="btn" onClick={() => setContent("productList")}>
          Product List
        </button>
      </div>
    );
  };
  
  export default SellerSidebar;