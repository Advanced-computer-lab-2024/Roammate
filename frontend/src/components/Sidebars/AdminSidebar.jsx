const AdminSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Admin Management</h2>
      <button className="btn" onClick={() => setContent("admin")}>
        Add Admin
      </button>
      <button className="btn" onClick={() => setContent("governor")}>
        Add Governor
      </button>
      <button className="btn" onClick={() => setContent("createPreferenceTag")}>
        Create Preference Tag
      </button>
      <button className="btn" onClick={() => setContent("readPreferenceTags")}>
        Read Preference Tags
      </button>
      <button className="btn" onClick={() => setContent("deletePreferenceTag")}>
        Delete Preference Tag
      </button>
      <button className="btn" onClick={() => setContent("editPreferenceTag")}>
        Edit Preference Tag
      </button>
      <button className="btn" onClick={() => setContent("addProduct")}>
        Add Product
      </button>
      <button className="btn" onClick={() => setContent("productList")}>
        Product List
      </button>
      <button className="btn" onClick={() => setContent("activityCategories")}>
        Activity Categories
      </button>
      <button className="btn" onClick={() => setContent("filterActivities")}>
        Filter Activities
      </button>
      <button className="btn" onClick={() => setContent("filterItineraries")}>
        Filter Itineraries
      </button>
      <button className="btn" onClick={() => setContent("editProducts")}>
        Edit Products
      </button>
    </div>
  );
};

export default AdminSidebar;
