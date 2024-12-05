import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TouristLayout from "./components/touristComponents/TouristLayout";
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
import AdminLayout from "./components/adminComponents/AdminLayout";
import TouristBookedActivities from "./pages/Tourist/TouristBookedActivitiesPage";
import TouristBookedItineraries from "./pages/Tourist/TouristBookedItinerariesPage";
import TouristBookedVisits from "./pages/Tourist/TouristBookedVisitsPage";
import TouristPurchases from "./pages/Tourist/TouristPurchasesPage";
import TouristComplaintsPage from "./pages/Tourist/TouristComplaintsPage";
import AdminComplaintsPage from "./pages/Admin/AdminComplaintsPage";
import AdminManageProfile from "./pages/Admin/AdminManageProfile";
import TourismGovernorLayout from "./components/tourismGovernorComponents/TourismGovernorLayout";
import TourismGovernorMuseumsPage from "./pages/TourismGovernor/TourismGovernerMusuemsPage";
import TourismGovernorManageProfile from "./pages/TourismGovernor/TourismGovernorManageProfile";
import TouristMuseumsPage from "./pages/Tourist/TouristMusuemsPage";
import AdminDeletionRequestsPage from "./pages/Admin/AdminDeletionRequestsPage";
import AdminActivitiesPage from "./pages/Admin/AdminActivitiesPage";
import AdminRegistrationsPage from "./pages/Admin/AdminRegistrationsPage";
import AdminUsersPage from "./pages/Admin/AdminUsersPage";
import AdminItinerariesPage from "./pages/Admin/AdminItinerariesPage";
import SellerCreateProduct from "./pages/Seller/SellerCreateProductPage";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import TouristBookFlightsPage from "./pages/Tourist/TouristBookFlightsPage";
import CreateActivityPage from "./pages/Advertiser/CreateActivityPage";
import CreateItinerary from "./components/tourGuideComponents/CreateItinerary";
import Registeration from "./pages/Registration&Login/Registration";
import TouristRegister from "./pages/Tourist/TouristRegister";
import Login from "./pages/Registration&Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import OthersRegisteration from "./pages/Registration&Login/OthersRegisteration";
import TouristWishlistPage from "./pages/Tourist/TouristWishlistPage";
import TouristCartPage from "./pages/Tourist/TouristCartPage";
import AdminManagePromocodesPage from "./pages/Admin/AdminManagePromocodesPage";
import ForgotPasswordPage from "./pages/Registration&Login/ForgotPasswordPage";
import VerifyOtpPage from "./pages/Registration&Login/VerifyOtpPage";
import ResetPasswordPage from "./pages/Registration&Login/ResetPasswordPage";
import AdvertiserAnalyticsPage from "./pages/Advertiser/AdvertiserAnalyticsPage";
import TourGuideAnalyticsPage from "./pages/TourGuide/TourguideAnalyticsPage";

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
  // // const touristId = '671d24b973e0e7cff8d41903';
  // const adminId = "67280e50b680764bbd7428a4";
  // const touristId = "671d24b973e0e7cff8d41903";
  // const advertiserId = "671d255373e0e7cff8d41909";
  // const tourguideId = "671d250873e0e7cff8d41907";
  // // const sellerId = "6724be8b35b1914550e721f9";
  // //seller to test with delete account request
  // const sellerId = "673261d1728876603010e456"
  // const tourismGovernorId = "67281f3d5d85a6e12ab86379";

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Registeration />} />
          <Route path="/tourist/register" element={<TouristRegister />} />
          <Route path="/register" element={<OthersRegisteration />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />



          <Route
            path="/tourist"
            element={
              <ProtectedRoute allowedRoles={["tourist"]}>
                <TouristLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/tourist/activities"
              element={<TouristActivitiesPage />}
            />
            <Route
              path="/tourist/wishlist"
              element={<TouristWishlistPage />}
            />
            <Route
              path="/tourist/itineraries"
              element={<TouristItinerariesPage />}
            />
            <Route
              path="/tourist/products"
              element={<TouristProductsPage />}
            />
            <Route
              path="/tourist/cart"
              element={<TouristCartPage />}
            />
            <Route
              path="/tourist/editProfile"
              element={<TouristEditProfile />}
            />
            <Route
              path="/tourist/bookings/activities"
              element={<TouristBookedActivities />}
            />
            <Route
              path="/tourist/bookings/itineraries"
              element={<TouristBookedItineraries />}
            />
            <Route
              path="/tourist/bookings/visits"
              element={<TouristBookedVisits />}
            />
            <Route
              path="/tourist/purchases"
              element={<TouristPurchases />}
            />
            <Route path="/tourist/monuments" element={<TouristMuseumsPage />} />
            <Route
              path="/tourist/flights"
              element={<TouristBookFlightsPage />}
            />
            <Route
              path="/tourist/complaints"
              element={<TouristComplaintsPage />}
            />
          </Route>




          <Route
            path="/advertiser"
            element={
              <ProtectedRoute allowedRoles={["advertiser"]}>
                <AdvertiserLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/advertiser/my-activities"
              element={<AdvertiserActivitiesPage />}
            />
            <Route
              path="/advertiser/editprofile"
              element={<AdvertiserEditProfile />}
            />
            <Route
              path='/advertiser/create-activity'
              element={<CreateActivityPage />}
            />
            <Route
              path="/advertiser/analytics"
              element={<AdvertiserAnalyticsPage />}
            />
          </Route>




          <Route path="/tourguide" element={
            <ProtectedRoute allowedRoles={["tour guide"]}>
              <TourGuideLayout />
            </ProtectedRoute>
          }>
            <Route
              path="/tourguide/my-itineraries"
              element={<TourGuideItinerariesPage />}
            />
            <Route
              path="/tourguide/editprofile"
              element={<TourGuideEditProfile />}
            />
            <Route
              path="/tourguide/create-itinerary"
              element={<CreateItinerary />}
            />
            <Route
              path="/tourguide/analytics"
              element={<TourGuideAnalyticsPage />}
            />
          </Route>



          <Route path="/seller" element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerLayout />
            </ProtectedRoute>
          }>
            <Route
              path="/seller/my-products"
              element={<SellerProductsPage />}
            />
            <Route
              path="/seller/editprofile"
              element={<SellerEditProfilePage />}
            />

            <Route
              path="/seller/createProduct"
              element={<SellerCreateProduct />}
            />
          </Route>



          <Route path="/tourismGovernor" element={
            <ProtectedRoute allowedRoles={["tourism governor"]}>
              <TourismGovernorLayout />
            </ProtectedRoute>
          }>
            <Route
              path="/tourismGovernor/musuems"
              element={<TourismGovernorMuseumsPage />}
            />
            <Route
              path="/tourismGovernor/editProfile"
              element={<TourismGovernorManageProfile />}
            />
          </Route>



          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/admin/users"
              element={<AdminUsersPage />}
            />
            <Route
              path="/admin/registrations"
              element={<AdminRegistrationsPage />}
            />
            <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
            <Route
              path="/admin/editProfile"
              element={<AdminManageProfile />}
            />
            <Route
              path="/admin/add-promocode"
              element={<AdminManagePromocodesPage />}
            />
            <Route
              path="/admin/deletion-requests"
              element={<AdminDeletionRequestsPage />}
            />
            <Route
              path="/admin/activities"
              element={<AdminActivitiesPage />}
            />
            <Route
              path="/admin/itineraries"
              element={<AdminItinerariesPage />}
            />
            <Route
              path="/admin/products"
              element={<AdminProductsPage />}
            />
            <Route
              path="/admin/my-products"
              element={<SellerProductsPage />}
            />
            <Route
              path="/admin/create-product"
              element={<SellerCreateProduct />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
