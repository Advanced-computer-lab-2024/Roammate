import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TouristLayout from "./components/touristComponents/touristLayout";
import TouristActivitiesPage from "./pages/Tourist/TouristActivitiesPage";
import TouristItinerariesPage from "./pages/Tourist/TouristItinerariesPage";
import TouristProductsPage from "./pages/Tourist/TouristProductsPage";
import TouristEditProfile from "./pages/Tourist/TouristManageProfilePage";

import AdvertiserLayout from "./components/advertiserComponents/AdvertiserLayout";
import AdvertiserActivitiesPage from "./pages/Advertiser/AdvertiserActivitiesPage";
import AdvertiserEditProfile from "./pages/Advertiser/AdvertiserManageProfilePage";

import TourGuideLayout from "./components/tourGuideComponents/TourGuideLayout";
import TourGuideItinerariesPage from "./pages/TourGuide/TourGuideItinerariesPage";
import TourGuideEditProfile from "./pages/TourGuide/TourGuideManageProfilePage";
import SellerLayout from "./components/sellerComponents/SellerLayout";
import SellerProductsPage from "./pages/Seller/SellerProductsPage";
import SellerEditProfilePage from "./pages/Seller/SellerManageProfilePage";
import ManageProductPage from "./pages/Seller/ManageProductPage";
import ManageActivityPage from "./pages/Advertiser/ManageActivityPage";
import ManageItineraryPage from "./pages/TourGuide/ManageItineraryPage";
import AdminLayout from "./components/adminComponents/AdminLayout";
import TouristViewActivity from "./pages/Tourist/TouristViewActivityPage";
import TouristComplaintsPage from "./pages/Tourist/TouristComplaintsPage";
import AdminRegistrationsPage from "./pages/Admin/AdminRegistrationsPage";
import AdminComplaintsPage from "./pages/Admin/AdminComplaintsPage";
import AdminManageProfile from "./pages/Admin/AdminManageProfile";
import TourismGovernorLayout from "./components/touristGovernerComponents/TourismGovernorLayout";
import TourismGovernorMuseumsPage from "./pages/TourismGovernor/TourismGovernerMusuemsPage";
import TourismGovernorManageProfile from "./pages/TourismGovernor/TourismGovernorManageProfile";
import TouristMuseumsPage from "./pages/Tourist/TouristMusuemsPage";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#3f51b5",
  //     dark: "#000000",
  //   },
  //   secondary: {
  //     main: "#3f51b5",
  //   },
  // },
  typography: {
    fontFamily: "QuickSand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  // const touristId = '671d24b973e0e7cff8d41903';
  const adminId = "67280e50b680764bbd7428a4";
  const touristId = "671d24b973e0e7cff8d41903";
  const advertiserId = "671d255373e0e7cff8d41909";
  const tourguideId = "671d250873e0e7cff8d41907";
  const sellerId = "6724be8b35b1914550e721f9";
  const tourismGovernorId = "67281f3d5d85a6e12ab86379";

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/tourist" element={<TouristLayout />}>
            <Route
              path="/tourist/activities"
              element={<TouristActivitiesPage />}
            />
            <Route
              path="/tourist/itineraries"
              element={<TouristItinerariesPage />}
            />
            <Route path="/tourist/products" element={<TouristProductsPage />} />
            <Route path="/tourist/monuments" element={<TouristMuseumsPage />} />
            <Route
              path="/tourist/complaints"
              element={<TouristComplaintsPage touristId={touristId} />}
            />
            <Route
              path="/tourist/editProfile"
              element={<TouristEditProfile id={touristId} />}
            />
          </Route>

          <Route path="/advertiser" element={<AdvertiserLayout />}>
            <Route
              path="/advertiser/my-activities"
              element={<AdvertiserActivitiesPage id={advertiserId} />}
            />
            <Route
              path="/advertiser/editprofile"
              element={<AdvertiserEditProfile id={advertiserId} />}
            />
          </Route>

          <Route path="/tourguide" element={<TourGuideLayout />}>
            <Route
              path="/tourguide/my-itineraries"
              element={<TourGuideItinerariesPage id={tourguideId} />}
            />
            <Route
              path="/tourguide/editprofile"
              element={<TourGuideEditProfile id={tourguideId} />}
            />
          </Route>

          <Route path="/seller" element={<SellerLayout />}>
            <Route
              path="/seller/my-products"
              element={<SellerProductsPage id={sellerId} />}
            />
            <Route
              path="/seller/editprofile"
              element={<SellerEditProfilePage id={sellerId} />}
            />
          </Route>

          <Route path="/tourismGovernor" element={<TourismGovernorLayout />}>
            <Route
              path="/tourismGovernor/musuems"
              element={<TourismGovernorMuseumsPage id={tourismGovernorId} />}
            />
            <Route
              path="/tourismGovernor/editProfile"
              element={<TourismGovernorManageProfile id={tourismGovernorId} />}
            />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/registrations" element={<AdminRegistrationsPage/>} />
            <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
            <Route
              path="/admin/editProfile"
              element={<AdminManageProfile id={adminId} />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
