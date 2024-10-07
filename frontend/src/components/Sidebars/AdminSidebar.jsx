const AdminSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Admin Management</h2>
      {/* Both buttons use the same function with different arguments */}
      <button className="btn" onClick={() => setContent("admin")}>Add Admin</button>
      <button className="btn" onClick={() => setContent("governor")}>Add Governor</button>
      <button className="btn" onClick={() => setContent("createPreferenceTag")}>Create Preference Tag</button>
      <button className="btn" onClick={() => setContent("readPreferenceTags")}>Read Preference Tags</button>
      <button className="btn" onClick={() => setContent("deletePreferenceTag")}>Delete Preference Tag</button>
      <button className="btn" onClick={() => setContent("editPreferenceTag")}>Edit Preference Tag</button>
      <button className="btn" onClick={() => setContent("addProduct")}>Add Product</button>
      <button className="btn" onClick={() => setContent("productList")}>Product List</button>
    </div>
  );
};

export default AdminSidebar;