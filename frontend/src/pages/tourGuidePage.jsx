import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import TourGuideSidebar from "../components/Sidebars/TourGuideSideBar";
import TourGuideEditProfile from "../components/tourGuideComponents/TourGuideEditProfile";
import CreateItineraryComponent from "../components/tourGuideComponents/createItinerary";
import UpdateItineraryComponent from "../components/tourGuideComponents/updateItinerary";
import DeleteItineraryComponent from "../components/tourGuideComponents/deleteItinerary";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";
import GetAllItinerariesById from "../components/tourGuideComponents/getAllItinerariesbyid";

const TourGuidePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  return (
    <div className="tourguide">
      <Navbar
        role="tourguide"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className="main-container">
        <div className="content">
          {activeContent === "editProfile" && (
            <TourGuideEditProfile id={"67042b58c54b60b6fcac1c49"} />
          )}
          {activeContent === "createItinerary" && <CreateItineraryComponent />}
          {activeContent === "viewIntinerary" && <GetAllItineraries />}
          {activeContent === "updateIntinerary" && <UpdateItineraryComponent />}
          {activeContent === "deleteIntinerary" && <DeleteItineraryComponent />}
          {activeContent === "getAllItineraries" && <GetAllItineraries />}
          {activeContent === "getAllItinerariesById" && (
            <GetAllItinerariesById />
          )}
        </div>
        {isSidebarOpen && <TourGuideSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default TourGuidePage;
