import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Navbar = ({
  role,
  isSidebarOpen,
  setIsSidebarOpen,
  setActiveContent,
}) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleShowContent = () => {
    setActiveContent("editProfile");
  };

  return (
    <nav className="navbar">
      <div className="title">
        <Link to={`/${role}`}>
          <h1>roammate ✈️</h1>
        </Link>
      </div>
      <div className="links">
        {/* <Link to={`/${role}/editprofile`}>
          <FontAwesomeIcon icon={faUser} /> Account
        </Link> */}

        <button className="btn" onClick={handleShowContent}>
          <FontAwesomeIcon icon={faUser} />
        </button>

        <button className="btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
