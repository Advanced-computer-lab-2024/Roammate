import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import TouristSidebar from "../components/Sidebars/TouristSidebar";
import TouristEditProfile from "../components/touristComponent/TouristEditProfile";
import ProductList from "../components/ProductList";
import FilterActivities from "../components/shared/filterActivitiesComponent";
import GetMuseums from "../components/shared/getMuseumsComponent";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";


const Tourist = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  return (
    <div className="tourist">
      <Navbar
        role="tourist"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className="main-container">
        <div className="content">
          {activeContent === "editProfile" && (
            <TouristEditProfile id={"67011f78b35bd91925cf1e40"} />)}
            {activeContent === "productList" && <ProductList />}
            {activeContent === "filterActivities" && <FilterActivities />}
            {activeContent === "getItineraries" && <GetAllItineraries />}
            {activeContent === "getMuseums" && <GetMuseums />}
            {/* activeContent==='componentName' && <Component/> */}

        </div>
        {isSidebarOpen && <TouristSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Tourist;
