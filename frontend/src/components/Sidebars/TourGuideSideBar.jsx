const TourGuideSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Tour Guide Management</h2>
      {/* <button className="btn" onClick={() => setContent("content")}>Button Name</button> */}
      <button className="btn" onClick={() => setContent("createItinerary")}>
        createItinerary
      </button>
      <button className="btn" onClick={() => setContent("viewIntinerary")}>
        viewIntinerary
      </button>
      <button className="btn" onClick={() => setContent("updateIntinerary")}>
        updateIntinerary
      </button>
      <button className="btn" onClick={() => setContent("deleteIntinerary")}>
        deleteIntinerary
      </button>
      <button className="btn" onClick={() => setContent("getAllItineraries")}>
        getAllItineraries
      </button>
    </div>
  );
};

export default TourGuideSidebar;
