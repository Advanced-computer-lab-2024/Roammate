const TouristSidebar = ({ setContent }) => {
    return (
      <div className="sidebar">
        <h2>Tourist Management</h2>
        {/* <button className="btn" onClick={() => setContent("content")}>Button Name</button> */}
          <button className="btn" onClick={() => setContent("productList")}>
            Product List
          </button>
          <button className="btn" onClick={() => setContent("filterActivities")}>
            Filter Activities
          </button>
          <button className="btn" onClick={() => setContent("getItineraries")}>
            Get Itineraries
          </button>
          <button className="btn" onClick={() => setContent("getMuseums")}>
            Get Museums
          </button>
      </div>
    );
  };
  
  export default TouristSidebar;