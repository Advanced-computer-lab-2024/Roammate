const GovernorSidebar = ({ setContent }) => {
  return (
    <div className="sidebar">
      <h2>Tourism Governor Management</h2>
      <button className="btn" onClick={() => setContent("createMusuem")}>
        Create Museum
      </button>
      <button className="btn" onClick={() => setContent("editMuseum")}>
        Edit Museum
      </button>
      <button className="btn" onClick={() => setContent("deleteMuseum")}>
        Delete Museum
      </button>
      <button className="btn" onClick={() => setContent("museumTags")}>
        Museum Tags
      </button>
    </div>
  );
};

export default GovernorSidebar;
