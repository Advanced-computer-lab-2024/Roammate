import { useState } from "react";

import Navbar from "../components/Navbars/Navbar";
import SellerSidebar from "../components/Sidebars/SellerSidebar";
import SellerEditProfile from "../components/sellerComponents/SellerEditProfile";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import GetProductsWithEdit from "../components/shared/getEditProductsComponent";

const Seller = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  return (
    <div className="seller">
      <Navbar
        role="seller"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className="main-container">
        <div className="content">
          {/* {activeContent === "content" && <AddContent />} */}
          {activeContent === "editProfile" && (
            <SellerEditProfile id={"670426c7c54b60b6fcac1b5e"} />
          )}
          {activeContent === "addProduct" && <AddProduct />}
          {activeContent === "productList" && <ProductList />}
          {activeContent === "editProducts" && <GetProductsWithEdit />}
        </div>
        {isSidebarOpen && <SellerSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};

export default Seller;
