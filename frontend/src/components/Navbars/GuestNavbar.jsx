import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const GuestNavbar = ({isSidebarOpen, setIsSidebarOpen}) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/guest">
          <h1>roammate</h1>
        </Link>
      </div>
      <div className="links">
        <Link to="/register">Register</Link>
        <button className="btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default GuestNavbar;
