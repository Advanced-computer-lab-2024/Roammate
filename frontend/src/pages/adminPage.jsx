import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import AdminSidebar from "../components/Sidebars/AdminSidebar";
import AddAdmin from "../components/adminComponents/AddAdmin";
import AddGovernor from "../components/adminComponents/AddGoverner";
import CreatePreferenceTagComponent from "../components/adminComponents/createPreferenceTagComponent";
import DeletePreferenceTag from "../components/adminComponents/deletePreferenceTag";
import EditPreferenceTag from "../components/adminComponents/editPreferenceTag";
import ReadPreferenceTags from "../components/adminComponents/readPreferenceTag";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import ActivityCategories from "../components/adminComponents/readCreateActivityCategories";
import FilterActivities from "../components/shared/filterActivitiesComponent";
import FilterItineraries from "../components/touristComponent/filterItinerary";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  return (
    <div className="admin">
      <Navbar
        role="admin"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className="main-container">
        <div className="content">
          {activeContent === "admin" && <AddAdmin />}
          {activeContent === "governor" && <AddGovernor />}
          {activeContent==="createPreferenceTag" && <CreatePreferenceTagComponent />}
          {activeContent==="readPreferenceTags" &&   <ReadPreferenceTags />}
          {activeContent==="deletePreferenceTag" &&  <DeletePreferenceTag />}
          {activeContent==="editPreferenceTag" && <EditPreferenceTag />}
          {activeContent==="addProduct" && <AddProduct />}
          {activeContent==="productList" && <ProductList />}
        </div>
        {isSidebarOpen && <AdminSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Admin;
