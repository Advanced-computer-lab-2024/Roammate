import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import TouristPage from "./pages/touristPage";
import GuestPage from "./pages/guestPage";
import TourGuidePage from "./pages/tourGuidePage";
import TouristGovernerPage from "./pages/touristGovernerPage";
import AdvertiserPage from "./pages/advertiserPage";
import SellerPage from "./pages/sellerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page Placeholder</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tourist" element={<TouristPage />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/tour-guide" element={<TourGuidePage />} />
        <Route path="/tourist-governer" element={<TouristGovernerPage />} />
        <Route path="/advertiser" element={<AdvertiserPage />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
