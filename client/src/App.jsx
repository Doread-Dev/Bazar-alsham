import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SellerProfile from "./pages/Profile/SellerProfile";
import CarDetails from "./pages/CarDetails/CarDetails";
import AddCar from "./pages/AddCar/AddCar";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
