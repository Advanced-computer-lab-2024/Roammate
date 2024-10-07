const TourGuideSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Tour Guide Management</h2>
      {/* <button className="btn" onClick={() => setContent("content")}>Button Name</button> */}
      <button className="btn" onClick={() => setContent("createItinerary")}>
        Create Itinerary
      </button>
      <button className="btn" onClick={() => setContent("viewIntinerary")}>
        View Intinerary
      </button>
      <button className="btn" onClick={() => setContent("updateIntinerary")}>
        Update Intinerary
      </button>
      <button className="btn" onClick={() => setContent("deleteIntinerary")}>
        Delete Intinerary
      </button>
      <button className="btn" onClick={() => setContent("getAllItineraries")}>
        Get All Itineraries
      </button>

      <button className="btn" onClick={() => setContent("getAllItinerariesById")}>
        Get All Itineraries By Id
      </button>
    </div>
  );
};

export default TourGuideSidebar;
