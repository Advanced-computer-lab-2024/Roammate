import { useState } from "react";

import GuestNavbar from "../components/Navbars/GuestNavbar";
import GuestSideBar from "../components/Sidebars/GuestSidebar";
import FilterActivities from "../components/shared/filterActivitiesComponent";
import FilterItineraries from "../components/touristComponent/filterItinerary";

const Guest = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  return (
    <div className="guest">
      <GuestNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="main-container">
        <div className="content">
          {activeContent === "filterActivities" && <FilterActivities />}
          {activeContent === "filterItineraries" && <FilterItineraries />}
        </div>
        {isSidebarOpen && <GuestSideBar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Guest;
