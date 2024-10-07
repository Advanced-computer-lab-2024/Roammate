import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import GovernorSideBar from "../components/Sidebars/GovernorSidebar";
import CreateMuseumComponent from "../components/touristGovernerComponents/createMusuemComponent";
import GetMuseumsWithEdit from "../components/touristGovernerComponents/editMusuemComponent";
import DeleteMuseumComponent from "../components/touristGovernerComponents/deleteMusuemComponent";
import MuseumTags from "../components/touristGovernerComponents/museumTagsComponent";

const TouristGovernerPage = () => {
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
          {activeContent === "createMusuem" && <CreateMuseumComponent />}
          {activeContent === "editMuseum" && <GetMuseumsWithEdit />}
          {activeContent === "deleteMuseum" && <DeleteMuseumComponent />}
          {activeContent === "museumTags" && <MuseumTags />}

          {/* {activeContent === "createActivity" && <CreateActivityComponent />}
          {activeContent === "deleteActivity" && <DeleteActivityComponent />}
          {activeContent === "getActivities" && <GetActivitiesWithEdit />} */}
        </div>
        {isSidebarOpen && <GovernorSideBar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default TouristGovernerPage;
