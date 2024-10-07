const GuestSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Guest Management</h2>
      <button className="btn" onClick={() => setContent("filterActivities")}>
        Filter Activities
      </button>
      <button className="btn" onClick={() => setContent("filterItineraries")}>
        Filter Itineraries
      </button>
    </div>
  );
};

export default GuestSidebar;
