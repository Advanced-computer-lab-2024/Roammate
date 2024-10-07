import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GuestNavbar from "../../components/Navbars/GuestNavbar";
import GuestSidebar from "../../components/Sidebars/GuestSidebar";

const Registration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  const [selectedRole, setSelectedRole] = useState(""); // State to track selected role
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update selected role
  };

  const handleRegister = () => {
    // Navigate based on selected role
    if (selectedRole === "tourist") {
      navigate("/tourist/register");
    } else if (selectedRole === "tourguide") {
      navigate("/tourGuide/register");
    } else if (selectedRole === "seller") {
      navigate("/seller/register");
    } else if (selectedRole === "advertiser") {
      navigate("/advertiser/register");
    }
  };

  return (
    <div className="registration-form">
      <GuestNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="main-container">
        <div className="content">
          <h2>Register</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <label htmlFor="role">I want to register as a...</label>
            <select id="role" value={selectedRole} onChange={handleRoleChange}>
              <option value="">-- Select a role --</option>
              <option value="tourist">Tourist</option>
              <option value="tourguide">Tour Guide</option>
              <option value="seller">Seller</option>
              <option value="advertiser">Advertiser</option>
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
        {isSidebarOpen && <GuestSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Registration;
