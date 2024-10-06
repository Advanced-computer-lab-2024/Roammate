import CreatePreferenceTagComponent from "../components/adminComponents/createPreferenceTagComponent";
import DeletePreferenceTag from "../components/adminComponents/deletePreferenceTag";
import EditPreferenceTag from "../components/adminComponents/editPreferenceTag";
import ReadPreferenceTags from "../components/adminComponents/readPreferenceTag";

const AdminPage = () => {
  const tableContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Four equal columns
    gridTemplateRows: "repeat(4, 1fr)", // Four equal rows
    gap: "20px", // Space between items
    padding: "20px", // Inner padding
  };

  const tableItemStyle = {
    backgroundColor: "#f0f0f0", // Background color
    border: "1px solid #ddd", // Border
    borderRadius: "8px", // Rounded corners
    padding: "20px", // Inner spacing
    display: "flex",
    justifyContent: "center", // Center contents horizontally
    alignItems: "center", // Center contents vertically
    height: "100%", // Full height for item
  };

  return (
    <div style={tableContainerStyle}>
      <div style={tableItemStyle}>
        <CreatePreferenceTagComponent />
      </div>
      <div style={tableItemStyle}>
        <ReadPreferenceTags />
      </div>
      <div style={tableItemStyle}>
        <DeletePreferenceTag />
      </div>
      <div style={tableItemStyle}>
        <EditPreferenceTag />
      </div>
    </div>
  );
};

export default AdminPage;
