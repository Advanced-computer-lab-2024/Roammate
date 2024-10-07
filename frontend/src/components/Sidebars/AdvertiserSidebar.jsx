const AdvertiserSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Advertiser Management</h2>
      {/* <button className="btn" onClick={() => setContent("content")}>Button Name</button> */}

      <button className="btn" onClick={() => setContent("createActivity")}>
        Create Activity
      </button>

      <button className="btn" onClick={() => setContent("deleteActivity")}>
        Delete Activity
      </button>

      <button className="btn" onClick={() => setContent("getActivities")}>
        Get Activities
      </button>
    </div>
  );
};

export default AdvertiserSidebar;
