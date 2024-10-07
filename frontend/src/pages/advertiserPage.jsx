import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import AdvertiserSidebar from "../components/Sidebars/AdvertiserSidebar";
import AdvertiserEditProfile from "../components/advertiserComponents/AdvertiserEditProfile";
import CreateActivityComponent from "../components/advertiserComponents/createActivityComponent";
import DeleteActivityComponent from "../components/advertiserComponents/deleteActivityComponent";
import GetActivitiesWithEdit from "../components/shared/getActivityComponent";

const Advertiser = () => {
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
          {activeContent === "editProfile" && (
            <AdvertiserEditProfile id={"67042721c54b60b6fcac1b65"} />
          )}
          {activeContent === "createActivity" && (
            <CreateActivityComponent id={"67042721c54b60b6fcac1b65"} />
          )}
          {activeContent === "deleteActivity" && <DeleteActivityComponent />}
          {activeContent === "getActivities" && <GetActivitiesWithEdit />}
        </div>
        {isSidebarOpen && <AdvertiserSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Advertiser;
