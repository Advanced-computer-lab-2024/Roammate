import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import GovernorSideBar from "../components/Sidebars/GovernorSidebar";
import CreateMonumentComponent from "../components/touristGovernorComponents/createMusuemComponent";
import GetMonumentsWithEdit from "../components/touristGovernorComponents/editMusuemComponent";
import DeleteMonumentComponent from "../components/touristGovernorComponents/deleteMusuemComponent";
import MonumentTags from "../components/touristGovernorComponents/monumentTagsComponent";

const TouristGovernorPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  return (
    <div className="advertiser">
      <Navbar
        role="advertiser"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className="main-container">
        <div className="content">
          {activeContent === "createMusuem" && <CreateMonumentComponent />}
          {activeContent === "editMonument" && <GetMonumentsWithEdit />}
          {activeContent === "deleteMonument" && <DeleteMonumentComponent />}
          {activeContent === "monumentTags" && <MonumentTags />}

          {/* {activeContent === "createActivity" && <CreateActivityComponent />}
          {activeContent === "deleteActivity" && <DeleteActivityComponent />}
          {activeContent === "getActivities" && <GetActivitiesWithEdit />} */}
        </div>
        {isSidebarOpen && <GovernorSideBar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default TouristGovernorPage;
