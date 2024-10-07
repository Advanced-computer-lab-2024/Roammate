import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import GovernorSideBar from "../components/Sidebars/GovernorSideBar";

const touristGovernerPage = () => {
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
        
          {/* {activeContent === "createActivity" && <CreateActivityComponent />}
          {activeContent === "deleteActivity" && <DeleteActivityComponent />}
          {activeContent === "getActivities" && <GetActivitiesWithEdit />} */}
        </div>
        {isSidebarOpen && <GovernorSideBar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default touristGovernerPage;
